export default `
precision mediump float;

uniform sampler2D uTex;
uniform float uTime;
uniform vec2 uDrops[10]; // Positions of raindrops
uniform float uDropTimes[10]; // Times when raindrops appeared

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    float rippleEffect = 0.0;

    // Iterate through each raindrop
    for (int i = 0; i < 10; i++) {
        vec2 dropPos = uDrops[i];
        float elapsedTime = uTime - uDropTimes[i];

        if (elapsedTime > 0.0) { // Only active drops
            float dist = distance(uv, dropPos);
            float wave = sin(15.0 * dist - elapsedTime * 5.0) * 0.01 / (1.0 + dist * 10.0);
            rippleEffect += wave;
        }
    }

    // Apply ripple effect to texture coordinates
    vec2 distortedTexCoord = uv + rippleEffect * vec2(1.0, 1.0);

    // Sample the texture with the distorted coordinates
    vec4 color = texture2D(uTex, distortedTexCoord);

    // Output the final color
    gl_FragColor = color;
}
`;
