var gl = null,
canvas = null,
glProgram = null,
fragmentShader = null,
vertexShader = null;
objects = [];
var cameraHandler;

var viewMatrix = mat4.create();
var pMatrix = mat4.create();

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

    GUI();
    reset();
  } else{
    alert("Error: Your browser does not appear to support WebGL.");
  }
}

function reset() {
  objects = [];
  setupBuffers();
  requestAnimationFrame(drawSceneStatic);
}

function setupWebGL() {
  gl.clearColor(1, 1, 1, 1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  gl.viewport(0, 0, canvas.width, canvas.height);
}

function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");

  glProgram = gl.createProgram();

  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);

  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(glProgram));
    return null;
  }

  gl.useProgram(glProgram);

  glProgram.vertexPosition = gl.getAttribLocation(glProgram, "VertexPosition");
  gl.enableVertexAttribArray(glProgram.vertexPosition);

  glProgram.vertexNormal = gl.getAttribLocation(glProgram, "VertexNormal");
  gl.enableVertexAttribArray(glProgram.vertexNormal);

  glProgram.vertexTexCoord = gl.getAttribLocation(glProgram, "VertexTexCoord");
  gl.enableVertexAttribArray(glProgram.vertexTexCoord);

  glProgram.projectionMatrix = gl.getUniformLocation(glProgram, "ProjectionMatrix");
  glProgram.viewMatrix = gl.getUniformLocation(glProgram, "ViewMatrix");
  glProgram.modelMatrix = gl.getUniformLocation(glProgram, "ModelMatrix");
  glProgram.normalMatrix = gl.getUniformLocation(glProgram, "NormalMatrix");
  glProgram.sampler = gl.getUniformLocation(glProgram, "Sampler");
  glProgram.useTexture = gl.getUniformLocation(glProgram, "UseTexture");
  glProgram.light1Position = gl.getUniformLocation(glProgram, "Lights[0].LightPosition");
  glProgram.light1Intensity = gl.getUniformLocation(glProgram, "Lights[0].Intensity");
  glProgram.light2Position = gl.getUniformLocation(glProgram, "Lights[1].LightPosition");
  glProgram.light2Intensity = gl.getUniformLocation(glProgram, "Lights[1].Intensity");
  glProgram.light3Position = gl.getUniformLocation(glProgram, "Lights[2].LightPosition");
  glProgram.light3Intensity = gl.getUniformLocation(glProgram, "Lights[2].Intensity");
  glProgram.ka = gl.getUniformLocation(glProgram, "Material.Ka");
  glProgram.kd = gl.getUniformLocation(glProgram, "Material.Kd");
  glProgram.ks = gl.getUniformLocation(glProgram, "Material.Ks");
  glProgram.glossiness = gl.getUniformLocation(glProgram, "Material.Glossiness");
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

  // Amarillo = 0.82, 0.753, 0.306
  // Rojo = 0.757, 0.227, 0.251
  // Gris del piso = 0.686, 0.686, 0.686
  // Azul = 0.282, 0.286, 0.749
  // Gris de la cinta = 0.463, 0.463, 0.463
  // Rosa = 0.6196, 0.235, 0.663
  // Violeta = 0.5804, 0.325, 0.8196
  // Verde = 0.176, 0.627, 0.169
  // Marron = 0.882, 0.667, 0.416
  // Plato = 0.851, 0.941, 0.776
  // Celeste anillo = 0.871, 1.0, 0.984
  // Paleta = 0.659, 0.816, 0.541
  // Campana = 0.322, 0.322, 0.706

  floor = new Box(0.686, 0.686, 0.686);
  floor.setupWebGLBuffers();
  m1 = mat4.create();
  mat4.scale(m1, m1, vec3.fromValues(25, 0.1, 25));
  floor.localMatrix = m1;
  objects.push(floor);
  objects[0].updateWorldMatrix();

  mSupportBoxes = mat4.create();
  mat4.translate(mSupportBoxes, mSupportBoxes, vec3.fromValues(-12, 0.85, 0));
  mat4.scale(mSupportBoxes, mSupportBoxes, vec3.fromValues(0.1, 0.75, 0.1));
  var box = [];
  var boxPadding = 2;
  var suppBoxesQuant = 10;
  for (i = 1; i < suppBoxesQuant; i++){
    box[i] = new Box(0.176, 0.627, 0.169);
    box[i].setupWebGLBuffers();
    mBox = mat4.create();
    mat4.translate(mBox, mBox, vec3.fromValues(boxPadding, 0, 0));
    mat4.multiply(mBox,mBox,mSupportBoxes);
    box[i].localMatrix = mBox;
    box[i].setParent(floor);
    objects.push(box[i]);
    objects[i].updateWorldMatrix();
    boxPadding += 2;
  }

  bigBox = new Oven(0.282, 0.286, 0.749);
  bigBox.setupWebGLBuffers();
  bigBox.initTexture("maps/horno.jpg");
  mBb = mat4.create();
  mat4.translate(mBb, mBb, vec3.fromValues(10, 3.1, 0));
  mat4.scale(mBb, mBb, vec3.fromValues(2, 3, 2));
  bigBox.localMatrix = mBb;
  bigBox.setParent(floor);
  objects.push(bigBox);
  objects[10].updateWorldMatrix();

  line = new Box(0.463, 0.463, 0.463);
  line.setupWebGLBuffers();
  m3 = mat4.create();
  mat4.translate(m3, m3, vec3.fromValues(-2, 1.85, 0));
  mat4.rotate(m3, m3, Math.PI/2, [0, 1, 0]);
  mat4.scale(m3, m3, vec3.fromValues(1.5, 0.25, 10));
  line.localMatrix = m3;
  line.setParent(bigBox);
  objects.push(line);
  objects[11].updateWorldMatrix();

  box1Station1 = new Box(0.6196, 0.235, 0.663);
  box1Station1.setupWebGLBuffers();
  mB1s1 = mat4.create();
  mat4.translate(mB1s1, mB1s1, vec3.fromValues(2, 3.1, -3.7));
  mat4.scale(mB1s1, mB1s1, vec3.fromValues(0.75, 3, 0.25));
  box1Station1.localMatrix = mB1s1;
  box1Station1.setParent(floor);
  objects.push(box1Station1);
  objects[12].updateWorldMatrix();

  box2Station1 = new Box(0.5804, 0.325, 0.8196);
  box2Station1.setupWebGLBuffers();
  mB2s1 = mat4.create();
  mat4.translate(mB2s1, mB2s1, vec3.fromValues(2, 1.3, -3));
  mat4.scale(mB2s1, mB2s1, vec3.fromValues(0.5, 1.2, 0.5));
  box2Station1.localMatrix = mB2s1;
  box2Station1.setParent(box1Station1);
  objects.push(box2Station1);
  objects[13].updateWorldMatrix();

  box3Station1 = new Box(0.882, 0.667, 0.416);
  box3Station1.setupWebGLBuffers();
  mB3s1 = mat4.create();
  mat4.translate(mB3s1, mB3s1, vec3.fromValues(2, 5.5, -1.1));
  mat4.scale(mB3s1, mB3s1, vec3.fromValues(0.3, 0.125, 2.4));
  box3Station1.localMatrix = mB3s1;
  box3Station1.setParent(box1Station1);
  objects.push(box3Station1);
  objects[14].updateWorldMatrix();

  box1Station2 = new Box(0.6196, 0.235, 0.663);
  box1Station2.setupWebGLBuffers();
  mB1s2 = mat4.create();
  mat4.translate(mB1s2, mB1s2, vec3.fromValues(-5, 1.85, -3.7));
  mat4.scale(mB1s2, mB1s2, vec3.fromValues(0.6, 1.75, 0.75));
  box1Station2.localMatrix = mB1s2;
  box1Station2.setParent(floor);
  objects.push(box1Station2);
  objects[15].updateWorldMatrix();

  box2Station2 = new Box(0.882, 0.667, 0.416);
  box2Station2.setupWebGLBuffers();
  mB2s2 = mat4.create();
  mat4.translate(mB2s2, mB2s2, vec3.fromValues(-5, 2.85, -2.5));
  mat4.scale(mB2s2, mB2s2, vec3.fromValues(0.05, 0.25, 0.5));
  box2Station2.localMatrix = mB2s2;
  box2Station2.setParent(box1Station2);
  objects.push(box2Station2);
  objects[16].updateWorldMatrix();

  box3Station2 = new Box(0.882, 0.667, 0.416);
  box3Station2.setupWebGLBuffers();
  mB2s2 = mat4.create();
  mat4.translate(mB2s2, mB2s2, vec3.fromValues(-5, 2.85, -2.1));
  mat4.scale(mB2s2, mB2s2, vec3.fromValues(0.1, 0.3, 0.1));
  box3Station2.localMatrix = mB2s2;
  box3Station2.setParent(box2Station2);
  objects.push(box3Station2);
  objects[17].updateWorldMatrix();

  ringCake = new Ring(0.871, 1.0, 0.984, vueltas);
  ringCake.setupWebGLBuffers();
  mRing = mat4.create();
  mat4.translate(mRing, mRing, vec3.fromValues(2, 2.18 + altura * (0.1 - 0.03 / ciclos), 0));
  mat4.scale(mRing, mRing, vec3.fromValues(0.063 * radioTotal, 0.063 * radioTotal, 0.063 * radioTotal));
  ringCake.localMatrix = mRing;
  objects.push(ringCake);
  objects[18].updateWorldMatrix();

  baseCake = new Base(0.82, 0.753, 0.306, 0.2 * radioTotal, ciclos, 0.1 * altura, 0.1 * amplitud)
  baseCake.setupWebGLBuffers();
  mBase = mat4.create();
  mat4.translate(mBase, mBase, vec3.fromValues(2, 2.12, 0));
  baseCake.localMatrix = mBase;
  objects.push(baseCake);
  objects[19].updateWorldMatrix();

  plateCake = new Disk(0.851, 0.941, 0.776)
  plateCake.setupWebGLBuffers();
  mPlate = mat4.create();
  mat4.translate(mPlate, mPlate, vec3.fromValues(2, 2.12, 0));
  mat4.scale(mPlate, mPlate, vec3.fromValues(0.2 * radioTotal + 0.1, 0.2 * radioTotal + 0.1, 0.2 * radioTotal + 0.1));
  plateCake.localMatrix = mPlate;
  objects.push(plateCake);
  objects[20].updateWorldMatrix();

  paramDec = [];
  if (decorador == "Bola")
    paramDec.push("Ball", 0.757, 0.227, 0.251);
  else if (decorador == "Campana")
    paramDec.push("Bell", 0.322, 0.322, 0.706);
  else
    paramDec.push("Pallet", 0.659, 0.816, 0.541);

  if (cantidadDecoradores > 1) {
    mDecorators = mat4.create();
    mat4.translate(mDecorators, mDecorators, vec3.fromValues(radioTotal / 8, 2.12 + altura * (0.1 - 0.008 / ciclos), 0));
    mat4.scale(mDecorators, mDecorators, vec3.fromValues(0.1, 0.1, 0.1));

    var dec = [];
    var angle = 2 * Math.PI / cantidadDecoradores;

    for (i = 0; i < cantidadDecoradores; i++){
      dec[i] = new window[paramDec[0]](paramDec[1], paramDec[2], paramDec[3]);
      dec[i].setupWebGLBuffers();
      mDec = mat4.create();
      mat4.translate(mDec, mDec, vec3.fromValues(2,0,0));
      mat4.rotateY(mDec, mDec, i * angle, vec3.fromValues(0, 0, 0));
      mat4.multiply(mDec, mDec, mDecorators);
      dec[i].localMatrix = mDec;
      objects.push(dec[i]);
      objects[21 + i].updateWorldMatrix();
    }
  }

  else {
    dec = new window[paramDec[0]](paramDec[1], paramDec[2], paramDec[3]);
    dec.setupWebGLBuffers();
    mDec = mat4.create();
    mat4.translate(mDec, mDec, vec3.fromValues(2, 2.12 + altura * (0.1 - 0.008 / ciclos), 0));
    mat4.scale(mDec, mDec, vec3.fromValues(0.1, 0.1, 0.1));
    dec.localMatrix = mDec;
    objects.push(dec);
    objects[21].updateWorldMatrix();
  }


  paramCont = [];
  if (contorno == "Tubo")
    paramCont.push("Tube", 0.996, 0.502, 0.996, 0.1, 0.1, 0.1);
  else
    paramCont.push("Box", 0.996, 0.502, 0.996, 0.02, 0.2, 0.05);

  mContours = mat4.create();
  mat4.translate(mContours, mContours, vec3.fromValues(0.204 * radioTotal, 2.35, 0));
  mat4.scale(mContours, mContours, vec3.fromValues(paramCont[4], paramCont[5], paramCont[6]));

  var cont = [];
  var angle = 2 * Math.PI / cantidadContorno;

  for (i = 0; i < cantidadContorno; i++){
    cont[i] = new window[paramCont[0]](paramCont[1], paramCont[2], paramCont[3]);
    cont[i].setupWebGLBuffers();
    mCont = mat4.create();
    mat4.translate(mCont, mCont, vec3.fromValues(2,0,0));
    mat4.rotateY(mCont, mCont, i * angle, vec3.fromValues(0, 0, 0));
    mat4.multiply(mCont, mCont, mContours);
    cont[i].localMatrix = mCont;
    objects.push(cont[i]);
    objects[21 + cantidadDecoradores + i].updateWorldMatrix();
  }

  var offset = 20 + cantidadDecoradores + cantidadContorno;

  hookTube = new Tube(0.635, 0.976, 0.905);
  hookTube.setupWebGLBuffers();
  mhTube = mat4.create();
  mat4.translate(mhTube, mhTube, vec3.fromValues(2, 4.475, 0));
  mat4.scale(mhTube, mhTube, vec3.fromValues(0.6, 0.45, 0.6));
  hookTube.localMatrix = mhTube;
  objects.push(hookTube);
  objects[offset + 1].updateWorldMatrix();

  box1Tube = new Box(0.325, 0.564, 0.976);
  box1Tube.setupWebGLBuffers();
  mb1Tube = mat4.create();
  mat4.translate(mb1Tube, mb1Tube, vec3.fromValues(2, 3.55, 0));
  mat4.scale(mb1Tube, mb1Tube, vec3.fromValues(0.25, 0.025, 0.15));
  box1Tube.localMatrix = mb1Tube;
  objects.push(box1Tube);
  objects[offset + 2].updateWorldMatrix();

  box2Tube = new Box(0.635, 0.976, 0.905);
  box2Tube.setupWebGLBuffers();
  mb2Tube = mat4.create();
  mat4.translate(mb2Tube, mb2Tube, vec3.fromValues(1.875, 3.425, 0));
  mat4.scale(mb2Tube, mb2Tube, vec3.fromValues(0.025, 0.1, 0.15));
  box2Tube.localMatrix = mb2Tube;
  objects.push(box2Tube);
  objects[offset + 3].updateWorldMatrix();

  box3Tube = new Box(0.635, 0.976, 0.905);
  box3Tube.setupWebGLBuffers();
  mb3Tube = mat4.create();
  mat4.translate(mb3Tube, mb3Tube, vec3.fromValues(2.125, 3.425, 0));
  mat4.scale(mb3Tube, mb3Tube, vec3.fromValues(0.025, 0.1, 0.15));
  box3Tube.localMatrix = mb3Tube;
  objects.push(box3Tube);
  objects[offset + 4].updateWorldMatrix();
}

function handleLoadedTexture(texture, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindTexture(gl.TEXTURE_2D, null);
}

/*
Logica de animación:
Desde menú se invoca esta función cuando se da comenzar, antes de eso la escena se puede mover con un "drawSceneStatic"
que en teoria solo dibuja la escena "predeterminada" sin la torta.

Cuando se clickea comenzar empieza un lapso que se lo ponemos nosotros y un desplazamiento que también se lo ponemos nosotros.
Esta función verifica que desde el tiempo de comienzo y el tiempo que se quiere hacer el desplazamiento corra tanto segundos
lo que uno quiere hacer.

La idea sería cada tanto segundos hacer una cosa, cada tantos segundos hacer otra y asi hasta que se terminé la animación.
*/
function animate(timestamp, duration){
   //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
   var timestamp = new Date().getTime();
   var runtime = timestamp - starttime;
   var progress = runtime / duration;
   progress = Math.min(progress, 1);
   mat4.translate(objects[19].localMatrix,objects[19].localMatrix,vec3.fromValues(-0.01,0,0));
   objects[19].updateWorldMatrix();
   if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            drawScene();
            animate(timestamp, duration);
        })
    }
}

function drawSceneStatic() {
  drawScene();
  requestAnimationFrame(drawSceneStatic);
}

function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  if(cameraHandler.getvMode() == 1){
    mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
  } else
  if(cameraHandler.getvMode() == 2){
    mat4.ortho(pMatrix, -13.0, 13.0, -10.0, 10.0, 0.1, 100);
    mat4.lookAt(viewMatrix, [0, 1.85, 1], [0, 1.85, 0], [0, 1, 0]);
  } else
  if(cameraHandler.getvMode() == 3){
    mat4.ortho(pMatrix, -13.0, 13.0, -7.0, 7.0, 0.1, 100);
    mat4.lookAt(viewMatrix, [0, 12, 0.000000001], [0, 0, 0], [0, 1, 0]);
  }

  // Preparamos una matriz de perspectiva.
  gl.uniformMatrix4fv(glProgram.projectionMatrix, false, pMatrix);

  // Preparamos una matriz de vista.
  gl.uniformMatrix4fv(glProgram.viewMatrix, false, viewMatrix);

  mat4.identity(viewMatrix);
  cameraHandler.modifyvMatrix();

  // Preparamos la iluminación

  var light1_position = [0, 20, 20, 0];
  var light2_position = [0, 20, -20, 0];
  var light3_position = [20, 20, 0, 0];
  var light = [1, 1, 1];

  gl.uniform4fv(glProgram.light1Position, light1_position);
  gl.uniform4fv(glProgram.light2Position, light2_position);
  gl.uniform4fv(glProgram.light3Position, light3_position);
  gl.uniform3fv(glProgram.light1Intensity, light);
  gl.uniform3fv(glProgram.light2Intensity, light);
  gl.uniform3fv(glProgram.light3Intensity, light);

  var specular_color = [0, 0, 0];
  var glos = 1;
  gl.uniform3fv(glProgram.ks, specular_color);
  gl.uniform1f(glProgram.glossiness, glos);

  // Preparamos las matrices propias de cada objeto

  objects.forEach(function(object) {
    if(object.texture)
      gl.uniform1i(glProgram.useTexture, 1);
    else
      gl.uniform1i(glProgram.useTexture, 0);
    gl.uniform3fv(glProgram.ka, [0,0,0]);
    gl.uniform3fv(glProgram.kd, [object.r, object.g, object.b]);

    nMatrix = mat3.create();
    mat3.normalFromMat4(nMatrix, object.worldMatrix);
    gl.uniformMatrix3fv(glProgram.normalMatrix, false, nMatrix);
    gl.uniformMatrix4fv(glProgram.modelMatrix, false, object.worldMatrix);
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

  this.webgl_texture_coord_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);

  this.webgl_index_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
}

Node.prototype.draw = function() {

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
  gl.vertexAttribPointer(glProgram.vertexPosition, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
  gl.vertexAttribPointer(glProgram.vertexNormal, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
  gl.vertexAttribPointer(glProgram.vertexTexCoord, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.uniform1i(glProgram.sampler, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

  // Dibujamos.
  gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
}

Node.prototype.initTexture = function(path) {
  this.texture = gl.createTexture();
  this.texture.image = new Image();
  var self = this
  this.texture.image.onload = function() {
    handleLoadedTexture(self.texture, self.texture.image);
  }
  this.texture.image.src = path;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Abstract Box (Ver si después le cambiamos el nombre)
function AbstractBox(r, g, b) {
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

AbstractBox.prototype = Object.create(Node.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Box
function Box(r, g, b) {
  this.texture = null;

  this.texture_coord_buffer = [0,0];

  AbstractBox.call(this, r, g, b);
}

Box.prototype = Object.create(AbstractBox.prototype);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Ball
function Ball(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.texture_coord_buffer = [0,0];

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
  this.texture_coord_buffer = [0,0];

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
  this.texture_coord_buffer = [0,0];

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
  this.texture_coord_buffer = [0,0];

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
function Ring(r, g, b, turns) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.texture_coord_buffer = [0,0];

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

  levels = 50 * (turns + 1);
  ang = 2 * Math.PI / levels;
  torsion = -turns * ang;
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
  this.texture_coord_buffer = [0,0];

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
  this.texture_coord_buffer = [0,0];

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

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Clase Oven
function Oven(r, g, b) {
  this.texture = null;

  this.texture_coord_buffer = [0.697,1,  0.394,1,  0.394,0.49,  0.697,0.49,
                               0.697,1,  0.697,0.49,  1,0.49,  1,1,
                               0.394,0.49,  0,0.49,  0,0,  0.394,0,
                               0.394,1,  0,1,  0,0.49,  0.394,0.49,
                               1,0.49,  0.697,0.49,  0.697,0,  1,0,
                               0.697,0,  0.697,0.49,  0.394,0.49,  0.394,0];
  AbstractBox.call(this, r, g, b);
}

Oven.prototype = Object.create(AbstractBox.prototype);
