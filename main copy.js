let squareVertShader = `
attribute vec2 a_position;
attribute vec2 a_texcoord;
uniform mat4 u_projection;

varying vec2 v_texcoord;

void main() {
    // Pass the texture coordinates to the fragment shader
    v_texcoord = a_texcoord;

    // Calculate the position of the vertex in clip space
    gl_Position = u_projection * vec4(a_position, 0.0, 1.0);
}
`;

let squareFragShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_image;
uniform float u_time;

varying vec2 v_texcoord;

void main() {
    // Calculate the ripple effect using sin function
    float ripple = sin(0.1 * u_time + 6.0 * length(v_texcoord - vec2(0.5))) * 0.1;

    // Apply the ripple effect to the texture coordinates
    vec2 uv = v_texcoord + vec2(ripple, ripple);

    // Sample the texture with the modified coordinates
    vec4 textureColor = texture2D(u_image, uv);

    // Set the final color as the output of the fragment shader
    gl_FragColor = textureColor;
}
`;

let squareShader;

function createSquareShaders() {
  squareShader = createShader(squareVertShader, squareFragShader);
}

let fft;
let img;
let time;

function preload() {
  img = loadImage('/test.jpg');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  createSquareShaders();
}

function draw() {
  time += deltaTime;
  shader(squareShader);
  squareShader.setUniform('u_time', time);
  squareShader.setUniform('u_image', img);
}