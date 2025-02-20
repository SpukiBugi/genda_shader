export default `#version 100
precision mediump float;

uniform float uTime;
uniform sampler2D uTex;
varying vec2 vTexCoord;

// Noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i + vec2(0.0, 0.0)), 
                   random(i + vec2(1.0, 0.0)), u.x),
               mix(random(i + vec2(0.0, 1.0)), 
                   random(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
    vec2 uv = vTexCoord;
    
    float n = noise(uv * 3.0 + uTime * 2.0);
    float scanlines = sin(uv.y * 800.0) * 0.04;
    vec2 offset = vec2(0.005 * sin(uTime + uv.y * 10.0), 0.0);
    
    vec4 colorR = texture2D(uTex, uv + offset);
    vec4 colorG = texture2D(uTex, uv);
    vec4 colorB = texture2D(uTex, uv - offset);
    
    vec3 color = vec3(colorR.r, colorG.g, colorB.b);
    
    color = mix(color, vec3(n), 0.1);
    color -= scanlines;
    
    float vignette = smoothstep(0.8, 0.2, length(uv - 0.5));
    color *= vignette;
    color += sin(uTime * 10.0) * 0.02;
    
    gl_FragColor = vec4(color, 1.0);
}
`;
