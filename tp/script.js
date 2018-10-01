var gl = null,
canvas = null,
glProgram = null,
fragmentShader = null,
vertexShader = null,
t = 0.0;
cube = null;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

// ESTO ES LO MISMO DE SIEMPRE

function initWebGL() {
  canvas = document.getElementById("my-canvas");
  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  } catch(e) {
  }

  if(gl) {
    setupWebGL();
    initShaders();
    setupBuffers();
    setInterval(drawScene, 10);
  } else{
    alert("Error: Your browser does not appear to support WebGL.");
  }
}

function setupWebGL() {
  gl.clearColor(1, 1, 1, 1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  gl.viewport(0, 0, canvas.width, canvas.height);
}

function initShaders() {
  // Obtenemos los shaders ya compilados
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");

  // Creamos un programa de shaders de WebGL.
  glProgram = gl.createProgram();

  // Asociamos cada shader compilado al programa.
  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);

  // Linkeamos los shaders para generar el programa ejecutable.
  gl.linkProgram(glProgram);

  // Chequeamos y reportamos si hubo algún error.
  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(glProgram));
    return null;
  }

  // Le decimos a WebGL que de aquí en adelante use el programa generado.
  gl.useProgram(glProgram);
}

function getShader(gl, id) {
  var shaderScript, src, currentChild, shader;

  // Obtenemos el elemento <script> que contiene el código fuente del shader.
  shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  // Extraemos el contenido de texto del <script>.
  src = "";
  currentChild = shaderScript.firstChild;
  while(currentChild) {
    if (currentChild.nodeType == currentChild.TEXT_NODE) {
      src += currentChild.textContent;
    }
    currentChild = currentChild.nextSibling;
  }

  // Creamos un shader WebGL según el atributo type del <script>.
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  // Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
  gl.shaderSource(shader, src);

  // Compilamos el shader.
  gl.compileShader(shader);

  // Chequeamos y reportamos si hubo algún error.
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

function setupBuffers() {
  // MOVER A UNA FUNCION DESPUES
  cube = new Node();
  cube.position_buffer = [0.5,  0.5,  0.5,  -0.5, 0.5,  0.5,  -0.5, -0.5,  0.5,   0.5, -0.5,  0.5,
                          0.5, -0.5, -0.5,   0.5, 0.5, -0.5,  -0.5,  0.5, -0.5,  -0.5, -0.5, -0.5];
  cube.color_buffer = [];
  for(var i = 0; i < cube.position_buffer.length / 3; i++) {
    cube.color_buffer.push(0);
    cube.color_buffer.push(0);
    cube.color_buffer.push(1);
  }
  cube.index_buffer = [0, 1, 2,  0, 2, 3,
                       0, 3, 4,  0, 4, 5,
                       0, 5, 6,  0, 6, 1,
                       6, 1, 7,  7, 1, 2,
                       7, 2, 3,  7, 3, 4,
                       4, 7, 6,  4, 6, 5];

  cube.setupWebGLBuffers();
}

function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
  // Preparamos una matriz de perspectiva.
  mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
  gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);

  var u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");
  // Preparamos una matriz de modelo+vista.
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -5.0]);
  mat4.rotate(mvMatrix, mvMatrix, t, [0.0, 1.0, 0.0]);
  t = t + 0.01;

  gl.uniformMatrix4fv(u_model_view_matrix, false, mvMatrix);

  cube.draw();
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Esta "clase" es el nodo del arbol de la escena

function Node() {
  this.children = [];
  this.localMatrix = mat4.create();
  this.worldMatrix = mat4.create();
  this.index_buffer = null;
  this.position_buffer = null;
  this.color_buffer = null;

  // Método que setea el padre del nodo
  this.setParent = function(parent) {
    // Elimina el padre actual
    if (this.parent) {
      var ndx = this.parent.children.indexOf(this);
      if (ndx >= 0) {
        this.parent.children.splice(ndx, 1);
      }
    }

    // Agrega el nuevo padre
    if (parent) {
      parent.children.append(this);
    }
    this.parent = parent;
  }

  // Método que actualiza la matriz del mundo
  this.updateWorldMatrix = function(parentWorldMatrix) {
    if (parentWorldMatrix) {
      mat4.multiply(this.localMatrix, this.worldMatrix, parentWorldMatrix);
    } else {
      mat4.copy(this.worldMatrix, this.localMatrix);
    }

    // Actualiza la matriz de todos los hijos
    var worldMatrix = this.worldMatrix;
    this.children.forEach(function(child) {
      child.updateWorldMatrix(worldMatrix);
    });
  }

  this.setupWebGLBuffers = function() {
    // 1. Creamos un buffer para las posicioens dentro del pipeline.
    this.webgl_position_buffer = gl.createBuffer();
    // 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
    // hemos creado.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    // 3. Cargamos datos de las posiciones en el buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la información del color
    this.webgl_color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la información de los índices
    // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
    // Notar también que se usa un array de enteros en lugar de floats.
    this.webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
  }

  this.draw = function() {
    var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
    gl.enableVertexAttribArray(vertexColorAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
    gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

    // Dibujamos.
    gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
  }
}
