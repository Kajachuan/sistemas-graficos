var gl = null,
canvas = null,
glProgram = null,
fragmentShader = null,
vertexShader = null;
objects = [];
currentAngle = [0.0, 0.0]; // [x-axis, y-axis] degrees
var cameraHandler;

var viewMatrix = mat4.create();
var pMatrix = mat4.create();

// ESTO ES LO MISMO DE SIEMPRE

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function initWebGL() {
  canvas = document.getElementById("my-canvas");
  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch(e) {
  }

  if(gl) {
    setupWebGL();
    initShaders();

    cameraHandler = new CameraHandler();
    cameraHandler.setupHandlers();

    setupBuffers();
    //initEventHandlers(canvas, currentAngle);
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
  o = new Bell(0,0,1);
  o.setupWebGLBuffers();
  m = mat4.create();
  o.localMatrix = m;
  objects.push(o);

  // Amarillo = 0.82, 0.753, 0.306
  // Rojo = 0.757, 0.227, 0.251
  // Gris del piso = 0.686, 0.686, 0.686
  // Azul = 0.282, 0.286, 0.749
  // Gris de la cinta = 0.463, 0.463, 0.463

  // floor = new Box(0.686, 0.686, 0.686);
  // floor.setupWebGLBuffers();
  // m1 = mat4.create();
  // mat4.scale(m1, m1, vec3.fromValues(10, 0.1, 10));
  // floor.localMatrix = m1;
  // objects.push(floor);

  // box = new Box(0.282, 0.286, 0.749);
  // box.setupWebGLBuffers();
  // m2 = mat4.create();
  // mat4.scale(m2, m2, vec3.fromValues(0.1, 10, 0.1));
  // mat4.translate(m2, m2, vec3.fromValues(0.1, 0.1, 0.1));
  // box.localMatrix = m2;
  // box.setParent(floor)
  // objects.push(box);

  // line = new Box(0.463, 0.463, 0.463);
  // line.setupWebGLBuffers();
  // m3 = mat4.create();
  // mat4.scale(m3, m3, vec3.fromValues(0.8, 0.1, 5));
  // mat4.translate(m3, m3, vec3.fromValues(0, -3, 0.78));
  // line.localMatrix = m3;
  // line.setParent(box);
  // objects.push(line);

  objects[0].updateWorldMatrix();
}

function initEventHandlers(c, currentAngle) {
  var dragging = false; // Dragging or not
  var lastX = -1, lastY = -1; // Last position of the mouse

  c.onmousedown = function(event) { // Mouse is pressed
    var x = event.clientX, y = event.clientY;
    // Start dragging if a mouse is in <canvas>
    var rect = event.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastX = x; lastY = y;
      dragging = true;
    }
  };

  // Mouse is released
  c.onmouseup = function(event) { dragging = false; };

  c.onmousemove = function(event) { // Mouse is moved
    var x = event.clientX, y = event.clientY;
    if (dragging) {
      var factor = 100/c.height; // The rotation ratio
      var dx = factor * (x - lastX);
      var dy = factor * (y - lastY);
      // Limit x-axis rotation angle to -90 to 90 degrees
      currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
      currentAngle[1] = currentAngle[1] + dx;
    }
    lastX = x, lastY = y;
  };
}

function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
  // Preparamos una matriz de perspectiva.
  mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
  gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);

  var u_view_matrix = gl.getUniformLocation(glProgram, "uVMatrix");
  // Preparamos una matriz de vista.
/*
  mat4.identity(vMatrix);
  mat4.translate(vMatrix, vMatrix, [0.0, 0.0, -5.0]);
  mat4.rotateX(vMatrix, vMatrix, currentAngle[0] + Math.PI/8);
  mat4.rotateY(vMatrix, vMatrix, currentAngle[1] - Math.PI/5);*/
  gl.uniformMatrix4fv(u_view_matrix, false, viewMatrix);

  mat4.identity(viewMatrix);
  cameraHandler.modifyvMatrix();

  var ambient_color = gl.getUniformLocation(glProgram, "uAmbientColor");

  var lighting_direction = gl.getUniformLocation(glProgram, "uLightPosition");
  var lightPosition = [0, 3, 4];
  gl.uniform3fv(lighting_direction, lightPosition);

  var directional_color = gl.getUniformLocation(glProgram, "uDirectionalColor");
  gl.uniform3f(directional_color, 1, 1, 1);

  var u_model_matrix = gl.getUniformLocation(glProgram, "uMMatrix");
  var u_normal_matrix = gl.getUniformLocation(glProgram, "uNMatrix");

  objects.forEach(function(object) {
    gl.uniform3f(ambient_color, object.r, object.g, object.b);
    nMatrix = mat3.create();
    mat3.normalFromMat4(nMatrix, object.worldMatrix);
    gl.uniformMatrix3fv(u_normal_matrix, false, nMatrix);
    gl.uniformMatrix4fv(u_model_matrix, false, object.worldMatrix);
    object.draw();
  });
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
  this.parent = null;
}

Node.prototype.setParent = function(parent) {
  parent.children.push(this);
  this.parent = parent;
}

Node.prototype.updateWorldMatrix = function(parentWorldMatrix) {
  if (parentWorldMatrix) {
    mat4.multiply(this.worldMatrix, this.localMatrix, parentWorldMatrix);
  } else {
    mat4.copy(this.worldMatrix, this.localMatrix);
  }

  // Actualiza la matriz de todos los hijos
  var worldMatrix = this.worldMatrix;
  this.children.forEach(function(child) {
    child.updateWorldMatrix(worldMatrix);
  });
}

Node.prototype.setupWebGLBuffers = function() {
  this.webgl_position_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

  this.webgl_normal_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);

  this.webgl_index_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
}

Node.prototype.draw = function() {
  var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  var vertexNormalAttribute= gl.getAttribLocation(glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexNormalAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

  // Dibujamos.
  gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
}
///////////////////////////////////////////////////////////////////////////////

// Clase Box
function Box(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;

  this.position_buffer = [1,1,1,  -1,1,1,  -1,-1,1,  1,-1,1,
                          1,1,1,  1,-1,1,  1,-1,-1,  1,1,-1,
                          1,1,1,  1,1,-1,  -1,1,-1,  -1,1,1,
                          -1,1,1,  -1,1,-1,  -1,-1,-1,  -1,-1,1,
                          -1,-1,1,  -1,-1,-1,  1,-1,-1,  1,-1,1,
                          -1,-1,-1,  -1,1,-1,  1,1,-1,  1,-1,-1];

  this.normal_buffer = [0,0,1,  0,0,1,  0,0,1,  0,0,1,
                        1,0,0,  1,0,0,  1,0,0,  1,0,0,
                        0,1,0,  0,1,0,  0,1,0,  0,1,0,
                        -1,0,0,  -1,0,0,  -1,0,0,  -1,0,0,
                        0,-1,0,  0,-1,0,  0,-1,0,  0,-1,0,
                        0,0,-1,  0,0,-1,  0,0,-1,  0,0,-1];

  this.index_buffer = [0,1,2,  0,2,3,  3,0,4,
                       7,4,5,  7,5,6,  6,7,9,
                       11,8,9,  11,9,10,  10,11,12,
                       15,12,13,  15,13,14, 14,15,16,
                       19,16,17,  19,17,18,  19,18,23,
                       23,20,21,  23,21,22];

  Node.call(this);
}

Box.prototype = Object.create(Node.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Ball
function Ball(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  nPoints = 20;
  angle = Math.PI / (nPoints - 1);
  this.position_buffer = []

  for(var i = 0; i < nPoints; i++) {
    this.position_buffer.push(Math.cos(i * angle));
    this.position_buffer.push(Math.sin(i * angle));
    this.position_buffer.push(0);
  }

  levels = 50;
  angle = 2 * Math.PI / levels;
  rot = vec3.create();
  origin = vec3.fromValues(0, 0, 0);

  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j += 3) {
      x = this.position_buffer[j];
      y = this.position_buffer[j + 1];
      z = this.position_buffer[j + 2];
      a = vec3.fromValues(x, y, z);
      vec3.rotateX(rot, a, origin, angle * (i + 1));
      this.position_buffer.push(rot[0], rot[1], rot[2]);
    }
  }

  this.normal_buffer = this.position_buffer;

  this.index_buffer = [];
  for (var i = 0; i < levels; i++) {
    column1Offset = i * nPoints;
    column2Offset = column1Offset + nPoints;
    for (var j = 0; j < nPoints - 1; j++) {
      this.index_buffer.push(column1Offset + j, column2Offset + j, column1Offset + j + 1);
      this.index_buffer.push(column1Offset + j + 1, column2Offset + j, column2Offset + j + 1);
    }
  }

  Node.call(this);
}

Ball.prototype = Object.create(Node.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Tube
function Tube(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;

  this.position_buffer = [];
  this.normal_buffer = [];

  this.position_buffer.push(0, 1.85, 0);
  this.normal_buffer.push(0, 1, 0);

  this.position_buffer.push(0.12, 1.85, 0);
  this.normal_buffer.push(0, 1, 0);
  this.position_buffer.push(0.12, 1.85, 0);
  this.normal_buffer.push(-1, 0, 0);

  this.position_buffer.push(0.12, 2, 0);
  this.normal_buffer.push(-1, 0, 0);
  this.position_buffer.push(0.12, 2, 0);
  this.normal_buffer.push(0, 1, 0);

  this.position_buffer.push(0.2, 2, 0);
  this.normal_buffer.push(0, 1, 0);
  this.position_buffer.push(0.2, 2, 0);
  this.normal_buffer.push(1, 0, 0);

  this.position_buffer.push(0.2, -2, 0);
  this.normal_buffer.push(1, 0, 0);
  this.position_buffer.push(0.2, -2, 0);
  this.normal_buffer.push(0, -1, 0);

  this.position_buffer.push(0.12, -2, 0);
  this.normal_buffer.push(0, -1, 0);
  this.position_buffer.push(0.12, -2, 0);
  this.normal_buffer.push(-1, 0, 0);

  this.position_buffer.push(0.12, -1.85, 0);
  this.normal_buffer.push(-1, 0, 0);
  this.position_buffer.push(0.12, -1.85, 0);
  this.normal_buffer.push(0, -1, 0);

  this.position_buffer.push(0, -1.85, 0);
  this.normal_buffer.push(0, -1, 0);

  nPoints = 14;
  levels = 50;
  angle = 2 * Math.PI / levels;
  rot = vec3.create();
  nrot = vec3.create();
  origin = vec3.fromValues(0, 0, 0);

  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j += 3) {
      x = this.position_buffer[j];
      y = this.position_buffer[j + 1];
      z = this.position_buffer[j + 2];
      a = vec3.fromValues(x, y, z);
      vec3.rotateY(rot, a, origin, angle * (i + 1));
      this.position_buffer.push(rot[0], rot[1], rot[2]);

      nx = this.normal_buffer[j];
      ny = this.normal_buffer[j + 1];
      nz = this.normal_buffer[j + 2];
      n = vec3.fromValues(nx, ny, nz);
      vec3.rotateY(nrot, n, origin, angle * (i + 1));
      this.normal_buffer.push(nrot[0], nrot[1], nrot[2]);
    }
  }

  this.index_buffer = [];
  for (var i = 0; i < levels; i++) {
    column1Offset = i * nPoints;
    column2Offset = column1Offset + nPoints;
    for (var j = 0; j < nPoints - 1; j++) {
      this.index_buffer.push(column1Offset + j, column2Offset + j, column1Offset + j + 1);
      this.index_buffer.push(column1Offset + j + 1, column2Offset + j, column2Offset + j + 1);
    }
  }

  Node.call(this);
}

Tube.prototype = Object.create(Node.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Disk
function Disk(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;

  this.position_buffer = [];
  this.normal_buffer = [];

  this.position_buffer.push(0, 0.025, 0);
  this.normal_buffer.push(0,1,0);

  this.position_buffer.push(1, 0.025, 0);
  this.normal_buffer.push(0,1,0);
  this.position_buffer.push(1, 0.025, 0);
  this.normal_buffer.push(1,0,0)

  this.position_buffer.push(1, -0.025, 0);
  this.normal_buffer.push(1,0,0);
  this.position_buffer.push(1, -0.025, 0);
  this.normal_buffer.push(0,-1,0);

  this.position_buffer.push(0, -0.025, 0);
  this.normal_buffer.push(0,-1,0);

  nPoints = 6;
  levels = 50;
  angle = 2 * Math.PI / levels;
  rot = vec3.create();
  nrot = vec3.create();
  origin = vec3.fromValues(0, 0, 0);

  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j += 3) {
      x = this.position_buffer[j];
      y = this.position_buffer[j + 1];
      z = this.position_buffer[j + 2];
      a = vec3.fromValues(x, y, z);
      vec3.rotateY(rot, a, origin, angle * (i + 1));
      this.position_buffer.push(rot[0], rot[1], rot[2]);

      nx = this.normal_buffer[j];
      ny = this.normal_buffer[j + 1];
      nz = this.normal_buffer[j + 2];
      n = vec3.fromValues(nx, ny, nz);
      vec3.rotateY(nrot, n, origin, angle * (i + 1));
      this.normal_buffer.push(nrot[0], nrot[1], nrot[2]);
    }
  }

  this.index_buffer = [];
  for (var i = 0; i < levels; i++) {
    column1Offset = i * nPoints;
    column2Offset = column1Offset + nPoints;
    for (var j = 0; j < nPoints - 1; j++) {
      this.index_buffer.push(column1Offset + j, column2Offset + j, column1Offset + j + 1);
      this.index_buffer.push(column1Offset + j + 1, column2Offset + j, column2Offset + j + 1);
    }
  }

  Node.call(this);
}

Disk.prototype = Object.create(Node.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Base
function Base(r, g, b, rad, cycles, h, amp) {
  this.r = r;
  this.g = g;
  this.b = b;

  this.position_buffer = [];
  this.normal_buffer = [];
  d = h / (4 * cycles - 1);
  cp = [0,0,  0,0,  rad - 0.5,0,  rad,d,  rad,2 * d];
  for(i = 1; i < cycles; i++) {
    ly = cp[cp.length - 1];
    cp.push(rad - amp,ly + d,  rad - amp,ly + 2 * d);
    cp.push(rad,ly + 3 * d,  rad,ly + 4 * d);
  }
  ly = cp[cp.length - 1];
  cp.push(rad - 0.5,ly + d,  0,ly + d,  0,ly + d);

  nPoints = 0;
  for(var i = 0; i < cp.length - 4; i += 2) {
    for(var u = 0; u <= 1; u += 0.1) {
      b0 = 0.5 * Math.pow(1 - u, 2);
      b1 = -Math.pow(u, 2) + u + 0.5;
      b2 = 0.5 * Math.pow(u, 2);
      x = b0 * cp[i] + b1 * cp[i + 2] + b2 * cp[i + 4];
      y = b0 * cp[i + 1] + b1 * cp[i + 3] + b2 * cp[i + 5];
      this.position_buffer.push(x, y, 0);
      nPoints++;

      db0 = u - 1;
      db1 = 1 - 2 * u;
      db2 = u;
      tx = db0 * cp[i] + db1 * cp[i + 2] + db2 * cp[i + 4];
      ty = db0 * cp[i + 1] + db1 * cp[i + 3] + db2 * cp[i + 5];
      this.normal_buffer.push(ty, -tx, 0);
    }
  }

  levels = 50;
  angle = 2 * Math.PI / levels;
  rot = vec3.create();
  nrot = vec3.create();
  origin = vec3.fromValues(0, 0, 0);

  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j += 3) {
      x = this.position_buffer[j];
      y = this.position_buffer[j + 1];
      z = this.position_buffer[j + 2];
      a = vec3.fromValues(x, y, z);
      vec3.rotateY(rot, a, origin, angle * (i + 1));
      this.position_buffer.push(rot[0], rot[1], rot[2]);

      nx = this.normal_buffer[j];
      ny = this.normal_buffer[j + 1];
      nz = this.normal_buffer[j + 2];
      n = vec3.fromValues(nx, ny, nz);
      vec3.rotateY(nrot, n, origin, angle * (i + 1));
      this.normal_buffer.push(nrot[0], nrot[1], nrot[2]);
    }
  }

  this.index_buffer = [];
  for (var i = 0; i < levels; i++) {
    column1Offset = i * nPoints;
    column2Offset = column1Offset + nPoints;
    for (var j = 0; j < nPoints - 1; j++) {
      this.index_buffer.push(column1Offset + j, column2Offset + j, column1Offset + j + 1);
      this.index_buffer.push(column1Offset + j + 1, column2Offset + j, column2Offset + j + 1);
    }
  }

  Node.call(this);
}

Base.prototype = Object.create(Node.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Ring
function Ring(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;

  angle = Math.PI / 6;
  nPoints = 26;
  this.position_buffer = [];
  this.normal_buffer = [];
  origin = vec3.fromValues(0,0,0);

  for(var i = 0; i < nPoints / 2; i++) {
    x = Math.cos(i * angle);
    y = Math.sin(i * angle);
    this.position_buffer.push(3 + 0.2 * x, 0.2 * y, 0);
    this.position_buffer.push(3 + 0.2 * x, 0.2 * y, 0);

    x1 = Math.cos((i - 1) * angle) - x;
    y1 = Math.sin((i - 1) * angle) - y;
    n1 = vec3.fromValues(x1, y1, 0);
    vec3.rotateZ(n1, n1, origin, Math.PI / 2);
    this.normal_buffer.push(n1[0], n1[1], n1[2]);
    x2 = Math.cos((i + 1) * angle) - x;
    y2 = Math.sin((i + 1) * angle) - y;
    n2 = vec3.fromValues(x2, y2, 0);
    vec3.rotateZ(n2, n2, origin, -Math.PI / 2);
    this.normal_buffer.push(n2[0], n2[1], n2[2]);

    i++;
    if(i == 13) break;
    x = Math.cos(i * angle);
    y = Math.sin(i * angle);
    this.position_buffer.push(3 + 0.1 * x, 0.1 * y, 0);
    this.position_buffer.push(3 + 0.1 * x, 0.1 * y, 0);

    x1 = Math.cos((i - 1) * angle) - x;
    y1 = Math.sin((i - 1) * angle) - y;
    n1 = vec3.fromValues(x1, y1, 0);
    vec3.rotateZ(n1, n1, origin, Math.PI / 2);
    this.normal_buffer.push(n1[0], n1[1], n1[2]);
    x2 = Math.cos((i + 1) * angle) - x;
    y2 = Math.sin((i + 1) * angle) - y;
    n2 = vec3.fromValues(x2, y2, 0);
    vec3.rotateZ(n2, n2, origin, -Math.PI / 2);
    this.normal_buffer.push(n2[0], n2[1], n2[2]);
  }

  levels = 64;
  ang = 2 * Math.PI / levels;
  torsion = -8 * Math.PI / levels;
  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j+=3) {
      x = this.position_buffer[j];
      y = this.position_buffer[j + 1];
      z = this.position_buffer[j + 2];
      new_pos = vec3.fromValues(x - 3, y, z);
      vec3.rotateZ(new_pos, new_pos, origin, torsion * (i + 1));
      new_pos[0] += 3;
      vec3.rotateY(new_pos, new_pos, origin, ang * (i + 1));
      this.position_buffer.push(new_pos[0], new_pos[1], new_pos[2]);

      nx = this.normal_buffer[j];
      ny = this.normal_buffer[j + 1];
      nz = this.normal_buffer[j + 2];
      nrot = vec3.fromValues(nx, ny, nz);
      vec3.rotateZ(nrot, nrot, origin, torsion * (i + 1));
      vec3.rotateY(nrot, nrot, origin, ang * (i + 1));
      this.normal_buffer.push(nrot[0], nrot[1], nrot[2]);
    }
  }

  this.index_buffer = [];
  for (var i = 0; i < levels; i++) {
    column1Offset = i * nPoints;
    column2Offset = column1Offset + nPoints;
    for (let j = 0; j < nPoints - 1; j++) {
      this.index_buffer.push(column1Offset + j, column2Offset + j, column1Offset + j + 1);
      this.index_buffer.push(column1Offset + j + 1, column2Offset + j, column2Offset + j + 1);
    }
  }

  Node.call(this);
}

Ring.prototype = Object.create(Node.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Pallet
function Pallet(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;

  this.position_buffer = [];
  this.normal_buffer = [];

  nPoints = 2;
  for(var u = 0; u <= 1; u += 0.001) {
    b0 = Math.pow(1 - u, 2);
    b1 = 2 * (1 - u) * u;
    b2 = Math.pow(u, 2);
    x = -2.5 * b0 + b2 * 1.5;
    y = 2 * b1;
    this.position_buffer.push(x, y, 0);
    this.normal_buffer.push(0, 0, 1);

    db0 = -2 * (1 - u);
    db1 = 2 - 4 * u;
    db2 = 2 * u;
    tx = -2.5 * db0 + db2 * 1.5;
    ty = 2 * db1;
    this.position_buffer.push(x, y, 0);
    this.normal_buffer.push(-ty, tx, 0);
    nPoints += 2;
  }
  this.position_buffer.push(-2.5, 0, 0);
  this.normal_buffer.push(0, -1, 0);
  this.position_buffer.push(1.5, 0, 0);
  this.normal_buffer.push(0, -1, 0);

  for(var i = 0; i < nPoints * 3; i+=3) {
    x = this.position_buffer[i];
    y = this.position_buffer[i + 1];
    z = this.position_buffer[i + 2];
    this.position_buffer.push(x, y, z - 0.2);

    nx = this.normal_buffer[i];
    ny = this.normal_buffer[i + 1];
    nz = this.normal_buffer[i + 2];
    this.normal_buffer.push(nx, ny, -nz);
  }

  this.index_buffer = [];
  for (i = 2; i < nPoints - 2; i+=2) {
    this.index_buffer.push(0, i);
  }
  for (i = nPoints; i < 2 * nPoints - 2; i+=2) {
    this.index_buffer.push(nPoints, i);
  }
  this.index_buffer.push(2 * nPoints - 2, nPoints - 1, nPoints - 2);
  for (i = 1; i < nPoints - 2; i+=2) {
    this.index_buffer.push(i, i + 2, nPoints + i + 2);
    this.index_buffer.push(i, nPoints + i + 2, nPoints + i);
  }

  Node.call(this);
}

Pallet.prototype = Object.create(Node.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Bell
function Bell(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;

  this.position_buffer = [];
  this.normal_buffer = [];
  cp = [0,0,  0.5,0,  0.9,0,  1,0,  1,0.05,  1,0.1,  0.9,0.1,
        0.7,0.1,  0.6,0.6,  0.5,1.1,  0.3,1.2,  0.1,1.3,  0,1.5];

  nPoints = 0;
  for(i = 0; i < cp.length - 4; i+=4) {
    for(u = 0; u <= 1; u+=0.1) {
      b0 = Math.pow(1 - u, 2);
      b1 = 2 * (1 - u) * u;
      b2 = Math.pow(u, 2);
      x = b0 * cp[i] + b1 * cp[i + 2] + b2 * cp[i + 4];
      y = b0 * cp[i + 1] + b1 * cp[i + 3] + b2 * cp[i + 5];
      this.position_buffer.push(x, y, 0);

      db0 = -2 * (1 - u);
      db1 = 2 - 4 * u;
      db2 = 2 * u;
      tx = db0 * cp[i] + db1 * cp[i + 2] + db2 * cp[i + 4];
      ty = db0 * cp[i + 1] + db1 * cp[i + 3] + db2 * cp[i + 5];
      this.normal_buffer.push(ty, -tx, 0);
      nPoints++;
    }
  }

  levels = 50;
  angle = 2 * Math.PI / levels;
  rot = vec3.create();
  nrot = vec3.create();
  origin = vec3.fromValues(0, 0, 0);

  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j += 3) {
      x = this.position_buffer[j];
      y = this.position_buffer[j + 1];
      z = this.position_buffer[j + 2];
      a = vec3.fromValues(x, y, z);
      vec3.rotateY(rot, a, origin, angle * (i + 1));
      this.position_buffer.push(rot[0], rot[1], rot[2]);

      nx = this.normal_buffer[j];
      ny = this.normal_buffer[j + 1];
      nz = this.normal_buffer[j + 2];
      n = vec3.fromValues(nx, ny, nz);
      vec3.rotateY(nrot, n, origin, angle * (i + 1));
      this.normal_buffer.push(nrot[0], nrot[1], nrot[2]);
    }
  }

  this.index_buffer = [];
  for (var i = 0; i < levels; i++) {
    column1Offset = i * nPoints;
    column2Offset = column1Offset + nPoints;
    for (var j = 0; j < nPoints - 1; j++) {
      this.index_buffer.push(column1Offset + j, column2Offset + j, column1Offset + j + 1);
      this.index_buffer.push(column1Offset + j + 1, column2Offset + j, column2Offset + j + 1);
    }
  }

  Node.call(this);
}

Bell.prototype = Object.create(Node.prototype);
