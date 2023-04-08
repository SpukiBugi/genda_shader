export default `
attribute vec3 aPosition;

varying vec2 vTexCoord;
varying vec3 vNorm;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = positionVec4;

  // pass the vertex position to the fragment shader
  vTexCoord = aPosition.xy * 0.5 + 0.5;
}
`;
