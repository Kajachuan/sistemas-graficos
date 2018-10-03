// Vertex shader program
const vsSource = `
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

uniform mat4 uVMatrix;
uniform mat4 uMMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void) {
    vec4 MM = uMMatrix * vec4(aVertexPosition, 1.0);
    vec4 uMVMatrixV = uVMatrix * MM;

    gl_Position = uPMatrix * uMVMatrixV;
    vColor = aColor;
    vTextureCoord = aTextureCoord;
}
`;
