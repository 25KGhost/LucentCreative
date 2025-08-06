export class CustomShader {
  constructor(uniforms) {
    this.uniforms = uniforms;
    this.vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    
    this.fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 mouse;
      varying vec2 vUv;
      
      // Noise functions by Patricio Gonzalez Vivo
      float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 2.0 - 1.0;
      }
      
      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        
        float res = mix(
          mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
          mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), 
          u.y);
        return res;
      }
      
      void main() {
        vec2 uv = vUv;
        vec2 p = uv * 8.0 + vec2(time * 0.5);
        
        float f = 0.0;
        p *= 2.0;
        f += noise(p) * 0.5;
        p *= 2.0;
        f += noise(p) * 0.25;
        p *= 2.0;
        f += noise(p) * 0.125;
        
        // Mouse interaction
        float mouseDist = distance(uv, mouse);
        f += smoothstep(0.3, 0.0, mouseDist) * 0.5;
        
        // Gold tint
        vec3 color = mix(
          vec3(0.8, 0.6, 0.2),
          vec3(0.9, 0.8, 0.6),
          f * 0.5 + 0.5
        );
        
        gl_FragColor = vec4(color, 0.15);
      }
    `;
  }
}