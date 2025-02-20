export default `
precision highp float;
    uniform float uTime;
    uniform sampler2D uTex;
    varying vec2 vTexCoord;

    float grainSize = 1.5; // adjust the grain size

    float rand(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
    }
    
    void main() {
        vec2 uv = vTexCoord;
        vec3 texColor = texture2D(uTex, uv).rgb;
        
        float grainValue = rand(uv + uTime);
        grainValue = (grainValue - 0.5) * grainSize;
        
        vec3 finalColor = texColor + grainValue;
        gl_FragColor = vec4(finalColor, 1);
    }
`;
