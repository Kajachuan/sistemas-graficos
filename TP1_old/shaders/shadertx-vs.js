var txvsSource = "\
	precision mediump float;\
	attribute vec3 aVertexPosition;\
	attribute vec3 aVertexNormal;\
	attribute vec2 aVertexUV;\
	uniform mat4 uMMatrix; /* object matrix */\
	uniform mat4 uVMatrix;\
	uniform mat4 uPMatrix; /* perspective matrix */\
	uniform mat4 uNMatrix; /* normal matrix */\
	varying vec4 vXYZW;\
	varying vec3 vNormal;\
	varying vec3 vXYZ;\
	varying vec2 vUV;\
	void main(void) {\
		gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);\
		vNormal = normalize((uNMatrix * vec4(aVertexNormal, 0.0)).xyz);\
		vXYZW = gl_Position;\
		vXYZ = aVertexPosition;\
		vUV = aVertexUV;\
	}";
