// Fragment shader program
const fsSource = `
precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void) {
    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)) * vColor;
}
`;
/*
const fsSource = `
precision mediump float;

varying highp vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
`;*/
