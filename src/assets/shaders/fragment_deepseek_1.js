export default `
precision mediump float;

uniform sampler2D uTex;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
    // Define the ripple parameters
    float rippleFrequency = 10.0; // Frequency of the ripples
    float rippleAmplitude = 0.01; // Amplitude of the ripples
    float rippleSpeed = 2.0; // Speed of the ripples

    // Calculate the distance from the center of the texture
    vec2 center = vec2(0.5, 0.5);
    float distance = length(vTexCoord - center);

    // Create the ripple effect using a sine wave
    float ripple = sin(distance * rippleFrequency - uTime * rippleSpeed) * rippleAmplitude;

    // Apply the ripple effect to the texture coordinates
    vec2 distortedTexCoord = vTexCoord + ripple * normalize(vTexCoord - center);

    // Sample the texture with the distorted coordinates
    vec4 color = texture2D(uTex, distortedTexCoord);

    gl_FragColor = color;
}
`;
