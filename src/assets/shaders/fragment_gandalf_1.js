export default `
precision highp float;

uniform sampler2D uTex;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;

  // compute the ripple effect
  float offset = 0.15;
  float intensity = 0.2;
  float speed = 1.0;
  float freq = 50.0;
  float t = uTime * speed;
  float distortion = intensity * (sin(freq * uv.x + t) + sin(freq * uv.y + t));
  vec4 ripple = texture2D(uTex, vec2(uv.x, uv.y + distortion * offset));

  // output the color
  gl_FragColor = ripple;
}`;
