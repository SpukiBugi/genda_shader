let vertexShader = `
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

let fragmentShader = `
precision highp float;

uniform sampler2D tex;
uniform float time;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;

  // compute the ripple effect
  float offset = 0.15;
  float intensity = 0.2;
  float speed = 1.0;
  float freq = 50.0;
  float t = time * speed;
  float distortion = intensity * (sin(freq * uv.x + t) + sin(freq * uv.y + t));
  vec4 ripple = texture2D(tex, vec2(uv.x, uv.y + distortion * offset));

  // output the color
  gl_FragColor = ripple;
}
`;

let img;
let rippleShader;
let time = 0;

function preload() {
  img = loadImage('/test.jpg');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  gl = this._renderer.GL;
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  noStroke();
  rippleShader = createShader(vertexShader, fragmentShader);
}

function draw() {
  time += 0.01; // increase time for animation effect
  background(0);

  shader(rippleShader);
  rippleShader.setUniform("time", time); // pass time into the shader
  rippleShader.setUniform("tex", img);

  beginShape(TRIANGLES);
  vertex(-1, -1, 0, 0, 0);
  vertex(1, -1, 0, 1, 0);
  vertex(1, 1, 0, 1, 1);
  vertex(-1, -1, 0, 0, 0);
  vertex(1, 1, 0, 1, 1);
  vertex(-1, 1, 0, 0, 1);
  endShape(CLOSE);
}