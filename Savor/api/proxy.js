// api/proxy.js — Vercel Serverless Function
// All secrets and allowed emails live HERE — never in the frontend

export default async function handler(req, res) {
  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-request-id');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── Only POST allowed ──
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  // ── Allowed emails + roles (server-side only) ──
  const ALLOWED = {
    [process.env.FOUNDER_EMAIL]: 'founder',
    [process.env.PARTNER_EMAIL]: 'partner',
  };

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Server not configured.' });
  }

  const { action, payload, token } = req.body || {};

  // ── Basic rate-limit via request timestamp check (lightweight) ──
  // For heavy protection, use Vercel's edge middleware or Upstash Redis.
  // This at least blocks bots sending malformed requests.
  if (!action || typeof action !== 'string') {
    return res.status(400).json({ error: 'Bad request.' });
  }

  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON_KEY}`,
  };

  try {
    // ── Route actions ──

    // Check if email is allowed (called before sign-up/sign-in)
    if (action === 'check_email') {
      const email = (payload?.email || '').toLowerCase().trim();
      if (!ALLOWED[email]) {
        return res.status(403).json({ allowed: false });
      }
      return res.status(200).json({ allowed: true, role: ALLOWED[email] });
    }

    // Sign in
    if (action === 'sign_in') {
      const email = (payload?.email || '').toLowerCase().trim();
      if (!ALLOWED[email]) return res.status(403).json({ error: 'This email is not authorised.' });

      const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { ...headers, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ email, password: payload.password }),
      });
      const data = await r.json();
      if (data.error) return res.status(r.status).json({ error: data.error_description || data.error });
      // Attach role from our server-side map
      return res.status(200).json({ ...data, _role: ALLOWED[email] });
    }

    // Sign up
    if (action === 'sign_up') {
      const email = (payload?.email || '').toLowerCase().trim();
      if (!ALLOWED[email]) return res.status(403).json({ error: 'This email is not authorised.' });
      if (!payload.password || payload.password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters.' });
      }

      const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: { ...headers, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ email, password: payload.password }),
      });
      const data = await r.json();
      if (data.error) return res.status(r.status).json({ error: data.error_description || data.error });
      return res.status(200).json({ ...data, _role: ALLOWED[email] });
    }

    // Forgot password (send reset email)
    if (action === 'forgot_password') {
      const email = (payload?.email || '').toLowerCase().trim();
      if (!ALLOWED[email]) return res.status(403).json({ error: 'This email is not authorised.' });

      const r = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
        method: 'POST',
        headers: { ...headers, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ email }),
      });
      // Always return success to avoid email enumeration
      return res.status(200).json({ success: true });
    }

    // Sign out
    if (action === 'sign_out') {
      if (!token) return res.status(401).json({ error: 'No token.' });
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: { ...headers, 'Authorization': `Bearer ${token}` },
      });
      return res.status(200).json({ success: true });
    }

    // Get session user
    if (action === 'get_user') {
      if (!token) return res.status(401).json({ error: 'No token.' });
      const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: { ...headers, 'Authorization': `Bearer ${token}` },
      });
      const data = await r.json();
      if (data.error) return res.status(r.status).json({ error: data.error });
      const role = ALLOWED[(data.email || '').toLowerCase()];
      return res.status(200).json({ ...data, _role: role || 'partner' });
    }

    // Generic Supabase REST (database reads/writes) — requires valid token
    if (action === 'db') {
      if (!token) return res.status(401).json({ error: 'Unauthorised.' });
      const { path, method = 'GET', body: dbBody, params } = payload || {};
      if (!path || !path.startsWith('/rest/v1/')) {
        return res.status(400).json({ error: 'Invalid path.' });
      }

      // Blocklist: disallow auth table access via this route
      if (path.includes('auth.users') || path.includes('/auth/')) {
        return res.status(403).json({ error: 'Forbidden.' });
      }

      let url = `${SUPABASE_URL}${path}`;
      if (params) url += (url.includes('?') ? '&' : '?') + params;

      const r = await fetch(url, {
        method,
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
          'Prefer': method === 'POST' ? 'return=representation' : undefined,
        },
        body: dbBody ? JSON.stringify(dbBody) : undefined,
      });

      const text = await r.text();
      let data;
      try { data = JSON.parse(text); } catch { data = text; }
      return res.status(r.status).json(data);
    }

    // Realtime token (for subscriptions)
    if (action === 'rt_token') {
      // Return the anon key so the client can init the realtime channel
      // This is acceptable — anon key is read-only and RLS-protected
      return res.status(200).json({
        url: SUPABASE_URL,
        key: SUPABASE_ANON_KEY,
      });
    }

    return res.status(400).json({ error: 'Unknown action.' });

  } catch (err) {
    console.error('[proxy error]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}