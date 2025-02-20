export default `
precision mediump float;

uniform float uTime;
uniform sampler2D uTex;
varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    float distance = length(uv - vec2(0.5)); // distance from center
    float ripple = sin(10.0 * distance - uTime * 2.0) * 0.05; // ripple effect
    uv += normalize(uv - vec2(0.5)) * ripple; // apply ripple displacement

    gl_FragColor = texture2D(uTex, uv);
}
`;
