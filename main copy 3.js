let vertexShader = `
attribute vec3 aPosition;
attribute vec2 uv;
attribute vec3 offset;

varying vec2 v_position;
varying vec2 v_uv;
varying vec2 v_puv;

uniform vec2 u_resolution;

void main() {
  v_uv = uv;
  v_puv = offset.xy / u_resolution;

  v_position = aPosition.xy;

  gl_Position = vec4(aPosition, 1.0);
}
`;

let fragmentShader = `
precision mediump float;

varying vec2 v_position;
varying vec2 v_uv;
varying vec2 v_puv;

uniform sampler2D u_image;

void main() {
  vec3 col = texture2D(u_image, v_puv).rgb;
  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
`;

let img;
let rippleShader;

function preload() {
  img = loadImage('/test.jpg');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  rippleShader = createShader(vertexShader, fragmentShader);
  rippleShader.setUniform("u_resolution", [width, height]);
  rippleShader.setUniform("u_image", img);
  console.log('m', img, width, height, img.width)
}

function draw() {
  background(200);
  // texture(img, -width/2, -height/2, width, height);
  // image(shaderGraphics, -width/2, -height/2, width, height);
  shader(rippleShader);
  rect(-width / 2, -height/ 2, width, height);
}