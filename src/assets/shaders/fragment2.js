export default `
  precision mediump float;

  varying vec2 vTexCoord;
  uniform sampler2D uTex;
  uniform float uTime;

  // Apply a rotation matrix to a 2D vector
  vec2 rotateVec2(vec2 p, float angle) {
    return vec2(
      p.x * cos(angle) - p.y * sin(angle),
      p.x * sin(angle) + p.y * cos(angle)
    );
  }

  void main() {
    // Map vTexCoord from [0, 1] to [-1, 1] range
    vec2 coords = vTexCoord * 2.0 - 1.0;

    // Calculate the spiral effect based on time
    float spiralRadius = length(coords) * 0.5 + sin(uTime * 2.0) * 0.05;
    float spiralAngle = atan(coords.y, coords.x) + uTime;
    
    // Rotate the coordinates back and remap to [0, 1] range
    vec2 spiralCoords = rotateVec2(vec2(spiralRadius, 0.0), spiralAngle) * 0.5 + 0.5;

    // Sample the image texture using the spiral coordinates
    vec4 col = texture2D(uTex, spiralCoords);

    gl_FragColor = col;
  }
`;
