export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user_name, restaurant_name, user_email, user_phone, selected_plan, message } = req.body;

    if (!user_name || !user_email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const payload = {
            service_id:      process.env.EMAILJS_SERVICE_ID,
            template_id:     process.env.EMAILJS_TEMPLATE_ID,
            user_id:         process.env.EMAILJS_PUBLIC_KEY,
            accessToken:     process.env.EMAILJS_PRIVATE_KEY,
            template_params: {
                user_name,
                restaurant_name,
                user_email,
                user_phone,
                selected_plan,
                message,
            },
        };

        // Log what we're actually sending (will show in Vercel logs)
        console.log('Sending to EmailJS with:', JSON.stringify({
            service_id:  payload.service_id  || 'MISSING',
            template_id: payload.template_id || 'MISSING',
            user_id:     payload.user_id     || 'MISSING',
            accessToken: payload.accessToken  || 'MISSING',
        }));

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const responseText = await response.text();

        // Log EmailJS's exact response
        console.log('EmailJS status:', response.status);
        console.log('EmailJS response:', responseText);

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: responseText });
        }

    } catch (err) {
        console.error('Function crashed:', err.message);
        return res.status(500).json({ error: err.message });
    }
}
