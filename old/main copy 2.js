let vertexShader = `
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

let fragmentShader = `
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

let img;
let rippleShader;

function preload() {
  img = loadImage('/test.jpg');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  rippleShader = createShader(vertexShader, fragmentShader);
  
  // Apply the shader to the image
  shader(rippleShader);
  rippleShader.setUniform('u_image', img);
}

function draw() {
  background(0);
  
  // Update the time uniform for the ripple effect
  let time = millis() / 1000.0;
  rippleShader.setUniform('u_time', time);
}