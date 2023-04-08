import vertexShader from '@/assets/shaders/vertex';
import fragmentShader from '@/assets/shaders/fragment';

const s = p => {
    let img;
    let rippleShader;
    let uTime = 0;
    let gl;

    p.preload = () => {
        img = p.loadImage('/test.jpg');
    };

    p.setup = () => {
        const myCanvas = p.createCanvas(600, 600, p.WEBGL);
        myCanvas.parent('mainCanvas');
  
        gl = p._renderer.GL;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        p.noStroke();
        rippleShader = p.createShader(vertexShader, fragmentShader);
    };

    p.draw = () => {
        uTime += 0.01; // increase time for animation effect
        p.background(0);

        p.shader(rippleShader);
        rippleShader.setUniform('uTime', uTime); // pass time into the shader
        rippleShader.setUniform('uTex', img);

        p.beginShape(p.TRIANGLES);
        p.vertex(-1, -1, 0, 0, 0);
        p.vertex(1, -1, 0, 1, 0);
        p.vertex(1, 1, 0, 1, 1);
        p.vertex(-1, -1, 0, 0, 0);
        p.vertex(1, 1, 0, 1, 1);
        p.vertex(-1, 1, 0, 0, 1);
        p.endShape(p.CLOSE);
    };
};

export default s;
