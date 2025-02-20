export default `
precision highp float;

uniform sampler2D uTex;
uniform float uTime;
varying vec2 vTexCoord;

const float speed = 2.0;
const float frequency = 10.0;
const float amplitude = 0.015;

// Simple noise function
float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vTexCoord;
    
    // Generate multiple ripples
    float ripple1 = sin(uv.x * frequency + uTime * speed) * amplitude;
    float ripple2 = sin(uv.y * frequency + uTime * speed * 1.2) * amplitude;
    
    // Add random raindrop-like distortions
    float dropTime = uTime * 0.5;
    vec2 dropPos = vec2(
        rand(vec2(floor(dropTime), 0.0)),
        rand(vec2(0.0, floor(dropTime)))
    );
    
    // Calculate ripple effect from drops
    vec2 toDrop = uv - dropPos;
    float dist = length(toDrop);
    float ripple = sin(dist * 50.0 - uTime * speed * 2.0) * amplitude * exp(-dist * 10.0);
    
    // Combine distortions
    vec2 distortedUV = uv + vec2(ripple1 + ripple, ripple2 + ripple);
    
    // Sample texture with distorted coordinates
    vec4 color = texture2D(uTex, distortedUV);
    
    // Add subtle raindrop highlight
    float highlight = smoothstep(0.02, 0.0, dist) * 0.2 * fract(dropTime);
    color.rgb += vec3(highlight);
    
    gl_FragColor = color;
}
`;
