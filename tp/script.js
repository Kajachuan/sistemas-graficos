var gl = null,
canvas = null,
glProgram = null,
fragmentShader = null,
vertexShader = null,
objects = [],
animationObjects = [];
cameraHandler = null,
refMapPath = "maps/refmapGreyRoom1.jpg",
viewMatrix = mat4.create(),
pMatrix = mat4.create();

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
  setupBuffersStatic();
  requestAnimationFrame(drawSceneStatic);

  gui.removeFolder("Resetear escena");
  var f7 = gui.addFolder('Iniciar animación');
  f7.add(window, "startAnimation").name("Comenzar");
  f7.open();
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
  glProgram.diffuseMap = gl.getUniformLocation(glProgram, "DiffuseMap");
  glProgram.reflectMap = gl.getUniformLocation(glProgram, "ReflectMap");
  glProgram.specularMap = gl.getUniformLocation(glProgram, "SpecularMap");
  glProgram.useDiffuseMap = gl.getUniformLocation(glProgram, "UseDiffuseMap");
  glProgram.useReflectMap = gl.getUniformLocation(glProgram, "UseReflectMap");
  glProgram.useSpecularMap = gl.getUniformLocation(glProgram, "UseSpecularMap");
  glProgram.light1Position = gl.getUniformLocation(glProgram, "Lights[0].LightPosition");
  glProgram.light1Intensity = gl.getUniformLocation(glProgram, "Lights[0].Intensity");
  glProgram.light2Position = gl.getUniformLocation(glProgram, "Lights[1].LightPosition");
  glProgram.light2Intensity = gl.getUniformLocation(glProgram, "Lights[1].Intensity");
  glProgram.light3Position = gl.getUniformLocation(glProgram, "Lights[2].LightPosition");
  glProgram.light3Intensity = gl.getUniformLocation(glProgram, "Lights[2].Intensity");
  glProgram.light4Position = gl.getUniformLocation(glProgram, "Lights[3].LightPosition");
  glProgram.light4Intensity = gl.getUniformLocation(glProgram, "Lights[3].Intensity");
  glProgram.light5Position = gl.getUniformLocation(glProgram, "Lights[4].LightPosition");
  glProgram.light5Intensity = gl.getUniformLocation(glProgram, "Lights[4].Intensity");
  glProgram.light6Position = gl.getUniformLocation(glProgram, "Lights[5].LightPosition");
  glProgram.light6Intensity = gl.getUniformLocation(glProgram, "Lights[5].Intensity");
  glProgram.light7Position = gl.getUniformLocation(glProgram, "Lights[6].LightPosition");
  glProgram.light7Intensity = gl.getUniformLocation(glProgram, "Lights[6].Intensity");
  glProgram.light8Position = gl.getUniformLocation(glProgram, "Lights[7].LightPosition");
  glProgram.light8Intensity = gl.getUniformLocation(glProgram, "Lights[7].Intensity");
  glProgram.light9Position = gl.getUniformLocation(glProgram, "Lights[8].LightPosition");
  glProgram.light9Intensity = gl.getUniformLocation(glProgram, "Lights[8].Intensity");
  glProgram.ka = gl.getUniformLocation(glProgram, "Material.Ka");
  glProgram.kd = gl.getUniformLocation(glProgram, "Material.Kd");
  glProgram.ks = gl.getUniformLocation(glProgram, "Material.Ks");
  glProgram.glossiness = gl.getUniformLocation(glProgram, "Material.Glossiness");
}

function animationLoop(render) {
    var running, lastFrame = +new Date;
    function loop(now) {
        // stop the loop if render returned false
        if (running !== false) {
            requestAnimationFrame(loop);
            var deltaT = now - lastFrame;
            // do not render frame when deltaT is too high
            if (deltaT < 160) {
                running = render( deltaT );
            }
            lastFrame = now;
        }
    }
    loop(lastFrame);
}

function degToRad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
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
  floor = new Floor();
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
    box[i] = new MetallicBox(0.3, 0.3, 0.3);
    box[i].setupWebGLBuffers();
    box[i].initReflectMap();
    mBox = mat4.create();
    mat4.translate(mBox, mBox, vec3.fromValues(boxPadding, 0, 0));
    mat4.multiply(mBox,mBox,mSupportBoxes);
    box[i].localMatrix = mBox;
    box[i].setParent(floor);
    objects.push(box[i]);
    objects[i].updateWorldMatrix();
    boxPadding += 2;
  }

  bigBox = new Oven();
  bigBox.setupWebGLBuffers();
  mBb = mat4.create();
  mat4.translate(mBb, mBb, vec3.fromValues(10, 3.1, 0));
  mat4.scale(mBb, mBb, vec3.fromValues(2, 3, 2));
  bigBox.localMatrix = mBb;
  bigBox.setParent(floor);
  objects.push(bigBox);
  objects[10].updateWorldMatrix();

  line = new Band();
  line.setupWebGLBuffers();
  m3 = mat4.create();
  mat4.translate(m3, m3, vec3.fromValues(-2, 1.85, 0));
  mat4.rotate(m3, m3, Math.PI/2, [0, 1, 0]);
  mat4.scale(m3, m3, vec3.fromValues(1.5, 0.25, 10));
  line.localMatrix = m3;
  line.setParent(bigBox);
  objects.push(line);
  objects[11].updateWorldMatrix();

  box1Station1 = new MetallicBox(0.651, 0.584, 0);
  box1Station1.setupWebGLBuffers();
  mB1s1 = mat4.create();
  mat4.translate(mB1s1, mB1s1, vec3.fromValues(2, 3.1, -3.7));
  mat4.scale(mB1s1, mB1s1, vec3.fromValues(0.75, 3, 0.25));
  box1Station1.localMatrix = mB1s1;
  box1Station1.setParent(floor);
  objects.push(box1Station1);
  objects[12].updateWorldMatrix();

  box2Station1 = new MetallicBox(0.651, 0.584, 0);
  box2Station1.setupWebGLBuffers();
  mB2s1 = mat4.create();
  mat4.translate(mB2s1, mB2s1, vec3.fromValues(2, 1.3, -3));
  mat4.scale(mB2s1, mB2s1, vec3.fromValues(0.5, 1.2, 0.5));
  box2Station1.localMatrix = mB2s1;
  box2Station1.setParent(box1Station1);
  objects.push(box2Station1);
  objects[13].updateWorldMatrix();

  box3Station1 = new MetallicBox(0.2392, 0.2392, 0.2392);
  box3Station1.setupWebGLBuffers();
  mB3s1 = mat4.create();
  mat4.translate(mB3s1, mB3s1, vec3.fromValues(2, 5.5, -1.1));
  mat4.scale(mB3s1, mB3s1, vec3.fromValues(0.7, 0.125, 2.4));
  box3Station1.localMatrix = mB3s1;
  box3Station1.setParent(box1Station1);
  objects.push(box3Station1);
  objects[14].updateWorldMatrix();

  box1Station2 = new MetallicBox(0.651, 0.584, 0);
  box1Station2.setupWebGLBuffers();
  mB1s2 = mat4.create();
  mat4.translate(mB1s2, mB1s2, vec3.fromValues(-5, 1.85, -3.7));
  mat4.scale(mB1s2, mB1s2, vec3.fromValues(0.6, 1.75, 0.75));
  box1Station2.localMatrix = mB1s2;
  box1Station2.setParent(floor);
  objects.push(box1Station2);
  objects[15].updateWorldMatrix();

  box2Station2 = new MetallicBox(0.2392, 0.2392, 0.2392);
  box2Station2.setupWebGLBuffers();
  mB2s2 = mat4.create();
  mat4.translate(mB2s2, mB2s2, vec3.fromValues(-5, 2.4, -2.5));
  mat4.scale(mB2s2, mB2s2, vec3.fromValues(0.05, 0.25, 0.5));
  box2Station2.localMatrix = mB2s2;
  box2Station2.setParent(box1Station2);
  objects.push(box2Station2);
  objects[16].updateWorldMatrix();

  box3Station2 = new MetallicBox(0.2392, 0.2392, 0.2392);
  box3Station2.setupWebGLBuffers();
  mB2s2 = mat4.create();
  mat4.translate(mB2s2, mB2s2, vec3.fromValues(-5, 2.4, -2.1));
  mat4.scale(mB2s2, mB2s2, vec3.fromValues(0.1, 0.3, 0.1));
  box3Station2.localMatrix = mB2s2;
  box3Station2.setParent(box2Station2);
  objects.push(box3Station2);
  objects[17].updateWorldMatrix();

  ringType = tipoTorta == "Crema" ? "CreamRing" : "DulceDeLecheRing";
  ringCake = new window[ringType](vueltas);
  ringCake.setupWebGLBuffers();
  mRing = mat4.create();
  mat4.translate(mRing, mRing, vec3.fromValues(9.5, 2.21 + altura * (0.1 - 0.03 / ciclos), 0));
  mat4.scale(mRing, mRing, vec3.fromValues(0.063 * radioTotal, 0.063 * radioTotal, 0.063 * radioTotal));
  ringCake.localMatrix = mRing;
  objects.push(ringCake);
  objects[18].updateWorldMatrix();

  type = tipoTorta == "Crema" ? "CreamBase" : "ChocolateBase";
  baseCake = new window[type](0.2 * radioTotal, ciclos, 0.1 * altura, 0.1 * amplitud);
  baseCake.setupWebGLBuffers();
  mBase = mat4.create();
  mat4.translate(mBase, mBase, vec3.fromValues(9.5, 2.15, 0));
  baseCake.localMatrix = mBase;
  objects.push(baseCake);
  objects[19].updateWorldMatrix();

  plateCake = new Disk(0.851, 0.941, 0.776)
  plateCake.setupWebGLBuffers();
  mPlate = mat4.create();
  mat4.translate(mPlate, mPlate, vec3.fromValues(9.5, 2.15, 0));
  mat4.scale(mPlate, mPlate, vec3.fromValues(0.2 * radioTotal + 0.1, 0.2 * radioTotal + 0.1, 0.2 * radioTotal + 0.1));
  plateCake.localMatrix = mPlate;
  objects.push(plateCake);
  objects[20].updateWorldMatrix();

  paramDec = [];
  if (decorador == "Ciruelas")
    paramDec.push("Plum");
  else if (decorador == "Campanas") {
    if(tipoTorta == "Crema")
      paramDec.push("DarkChocolateBell");
    else
      paramDec.push("WhiteChocolateBell");
  }
  else {
    if(tipoTorta == "Crema")
      paramDec.push("DarkChocolatePallet");
    else
      paramDec.push("WhiteChocolatePallet");
  }

  if (cantidadDecoradores > 1) {
    mDecorators = mat4.create();
    mat4.translate(mDecorators, mDecorators, vec3.fromValues(2, 2.15 + 5 * (0.1 - 0.008 / ciclos), -3));
    mat4.scale(mDecorators, mDecorators, vec3.fromValues(0.1, 0.1, 0.1));

    var dec = [];

    for (i = 0; i < cantidadDecoradores; i++){
      dec[i] = new window[paramDec[0]]();
      dec[i].setupWebGLBuffers();
      mDec = mat4.create();
      mat4.multiply(mDec, mDec, mDecorators);
      dec[i].localMatrix = mDec;
      objects.push(dec[i]);
      objects[21 + i].updateWorldMatrix();
    }
  }

  else {
    dec = new window[paramDec[0]]();
    dec.setupWebGLBuffers();
    mDec = mat4.create();
    mat4.translate(mDec, mDec, vec3.fromValues(2, 2.15 + altura * (0.1 - 0.008 / ciclos), 0));
    mat4.scale(mDec, mDec, vec3.fromValues(0.1, 0.1, 0.1));
    dec.localMatrix = mDec;
    objects.push(dec);
    objects[21].updateWorldMatrix();
  }


  paramCont = [];
  if (contorno == "Caramelos")
    paramCont.push("Candy", 0.1, 0.1, 0.1);
  else
    paramCont.push("Wafer", 0.02, 0.2, 0.05);

  mContours = mat4.create();
  mat4.translate(mContours, mContours, vec3.fromValues(-5, 2.17 + 0.05 * altura, -1.96));

  if (contorno == "Caramelos")
    mat4.scale(mContours, mContours, vec3.fromValues(paramCont[1], paramCont[2] * (altura/5), paramCont[3]));
  else {
    mat4.rotateY(mContours, mContours, Math.PI/2);
    mat4.scale(mContours, mContours, vec3.fromValues(paramCont[1], paramCont[2] * (altura/5), paramCont[3]));
  }

  var cont = [];

  for (i = 0; i < cantidadContorno; i++){
    cont[i] = new window[paramCont[0]]();
    cont[i].setupWebGLBuffers();
    cont[i].localMatrix = mContours;
    objects.push(cont[i]);
    objects[21 + cantidadDecoradores + i].updateWorldMatrix();
  }

  offset = 20 + cantidadDecoradores + cantidadContorno;

  hookTube = new ArmTube();
  hookTube.setupWebGLBuffers();
  mhTube = mat4.create();
  mat4.translate(mhTube, mhTube, vec3.fromValues(2, 4.475, 0));
  mat4.scale(mhTube, mhTube, vec3.fromValues(0.6, 0.45, 0.6));
  hookTube.localMatrix = mhTube;
  objects.push(hookTube);
  objects[offset + 1].updateWorldMatrix();

  box1Tube = new MetallicBox(0.3, 0.3, 0.3);
  box1Tube.setupWebGLBuffers();
  mb1Tube = mat4.create();
  mat4.translate(mb1Tube, mb1Tube, vec3.fromValues(2, 3.55, 0));
  mat4.scale(mb1Tube, mb1Tube, vec3.fromValues(0.25, 0.025, 0.15));
  box1Tube.localMatrix = mb1Tube;
  objects.push(box1Tube);
  objects[offset + 2].updateWorldMatrix();

  box2Tube = new MetallicBox(0.3, 0.3, 0.3);
  box2Tube.setupWebGLBuffers();
  mb2Tube = mat4.create();
  mat4.translate(mb2Tube, mb2Tube, vec3.fromValues(1.875, 3.425, 0));
  mat4.scale(mb2Tube, mb2Tube, vec3.fromValues(0.025, 0.1, 0.15));
  box2Tube.localMatrix = mb2Tube;
  objects.push(box2Tube);
  objects[offset + 3].updateWorldMatrix();

  box3Tube = new MetallicBox(0.3, 0.3, 0.3);
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

  var light1_position = [0, 20, 0, 0];
  var light2_position = [50, 20, 0, 0];
  var light3_position = [-50, 20, 0, 0];
  var light4_position = [0, 20, 20, 0];
  var light5_position = [50, 20, 20, 0];
  var light6_position = [-50, 20, 20, 0];
  var light7_position = [0, 20, -20, 0];
  var light8_position = [50, 20, -20, 0];
  var light9_position = [-50, 20, -20, 0];
  var light = [0.25, 0.25, 0.25];

  gl.uniform4fv(glProgram.light1Position, light1_position);
  gl.uniform4fv(glProgram.light2Position, light2_position);
  gl.uniform4fv(glProgram.light3Position, light3_position);
  gl.uniform4fv(glProgram.light4Position, light4_position);
  gl.uniform4fv(glProgram.light5Position, light5_position);
  gl.uniform4fv(glProgram.light6Position, light6_position);
  gl.uniform4fv(glProgram.light7Position, light7_position);
  gl.uniform4fv(glProgram.light8Position, light8_position);
  gl.uniform4fv(glProgram.light9Position, light9_position);
  gl.uniform3fv(glProgram.light1Intensity, light);
  gl.uniform3fv(glProgram.light2Intensity, light);
  gl.uniform3fv(glProgram.light3Intensity, light);
  gl.uniform3fv(glProgram.light4Intensity, light);
  gl.uniform3fv(glProgram.light5Intensity, light);
  gl.uniform3fv(glProgram.light6Intensity, light);
  gl.uniform3fv(glProgram.light7Intensity, light);
  gl.uniform3fv(glProgram.light8Intensity, light);
  gl.uniform3fv(glProgram.light9Intensity, light);

  // Dibujamos cada objeto

  objects.forEach(function(object) {
    var useDiffuseMap = object.texture ? 1 : 0;
    gl.uniform1i(glProgram.useDiffuseMap, useDiffuseMap);

    var useReflectMap = object.reflectMap ? 1 : 0;
    gl.uniform1i(glProgram.useReflectMap, useReflectMap);

    var useSpecularMap = object.specularMap ? 1 : 0;
    gl.uniform1i(glProgram.useSpecularMap, useSpecularMap);

    gl.uniform3fv(glProgram.ka, object.ka);
    gl.uniform3fv(glProgram.kd, object.kd);
    gl.uniform3fv(glProgram.ks, object.ks);
    gl.uniform1f(glProgram.glossiness, object.gloss);

    nMatrix = mat3.create();
    mat3.normalFromMat4(nMatrix, object.worldMatrix);
    gl.uniformMatrix3fv(glProgram.normalMatrix, false, nMatrix);
    gl.uniformMatrix4fv(glProgram.modelMatrix, false, object.worldMatrix);
    object.draw();
  });
}

function setupBuffersStatic() {
  floor = new Floor();
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
    box[i] = new MetallicBox(0.3, 0.3, 0.3);
    box[i].setupWebGLBuffers();
    box[i].initReflectMap();
    mBox = mat4.create();
    mat4.translate(mBox, mBox, vec3.fromValues(boxPadding, 0, 0));
    mat4.multiply(mBox,mBox,mSupportBoxes);
    box[i].localMatrix = mBox;
    box[i].setParent(floor);
    objects.push(box[i]);
    objects[i].updateWorldMatrix();
    boxPadding += 2;
  }

  bigBox = new Oven();
  bigBox.setupWebGLBuffers();
  mBb = mat4.create();
  mat4.translate(mBb, mBb, vec3.fromValues(10, 3.1, 0));
  mat4.scale(mBb, mBb, vec3.fromValues(2, 3, 2));
  bigBox.localMatrix = mBb;
  bigBox.setParent(floor);
  objects.push(bigBox);
  objects[10].updateWorldMatrix();

  line = new Band();
  line.setupWebGLBuffers();
  m3 = mat4.create();
  mat4.translate(m3, m3, vec3.fromValues(-2, 1.85, 0));
  mat4.rotate(m3, m3, Math.PI/2, [0, 1, 0]);
  mat4.scale(m3, m3, vec3.fromValues(1.5, 0.25, 10));
  line.localMatrix = m3;
  line.setParent(bigBox);
  objects.push(line);
  objects[11].updateWorldMatrix();

  box1Station1 = new MetallicBox(0.651, 0.584, 0);
  box1Station1.setupWebGLBuffers();
  mB1s1 = mat4.create();
  mat4.translate(mB1s1, mB1s1, vec3.fromValues(2, 3.1, -3.7));
  mat4.scale(mB1s1, mB1s1, vec3.fromValues(0.75, 3, 0.25));
  box1Station1.localMatrix = mB1s1;
  box1Station1.setParent(floor);
  objects.push(box1Station1);
  objects[12].updateWorldMatrix();

  box2Station1 = new MetallicBox(0.651, 0.584, 0);
  box2Station1.setupWebGLBuffers();
  mB2s1 = mat4.create();
  mat4.translate(mB2s1, mB2s1, vec3.fromValues(2, 1.3, -3));
  mat4.scale(mB2s1, mB2s1, vec3.fromValues(0.5, 1.2, 0.5));
  box2Station1.localMatrix = mB2s1;
  box2Station1.setParent(box1Station1);
  objects.push(box2Station1);
  objects[13].updateWorldMatrix();

  box3Station1 = new MetallicBox(0.2392, 0.2392, 0.2392);
  box3Station1.setupWebGLBuffers();
  mB3s1 = mat4.create();
  mat4.translate(mB3s1, mB3s1, vec3.fromValues(2, 5.5, -1.1));
  mat4.scale(mB3s1, mB3s1, vec3.fromValues(0.7, 0.125, 2.4));
  box3Station1.localMatrix = mB3s1;
  box3Station1.setParent(box1Station1);
  objects.push(box3Station1);
  objects[14].updateWorldMatrix();

  box1Station2 = new MetallicBox(0.651, 0.584, 0);
  box1Station2.setupWebGLBuffers();
  mB1s2 = mat4.create();
  mat4.translate(mB1s2, mB1s2, vec3.fromValues(-5, 1.85, -3.7));
  mat4.scale(mB1s2, mB1s2, vec3.fromValues(0.6, 1.75, 0.75));
  box1Station2.localMatrix = mB1s2;
  box1Station2.setParent(floor);
  objects.push(box1Station2);
  objects[15].updateWorldMatrix();

  box2Station2 = new MetallicBox(0.2392, 0.2392, 0.2392);
  box2Station2.setupWebGLBuffers();
  mB2s2 = mat4.create();
  mat4.translate(mB2s2, mB2s2, vec3.fromValues(-5, 2.4, -2.5));
  mat4.scale(mB2s2, mB2s2, vec3.fromValues(0.05, 0.25, 0.5));
  box2Station2.localMatrix = mB2s2;
  box2Station2.setParent(box1Station2);
  objects.push(box2Station2);
  objects[16].updateWorldMatrix();

  box3Station2 = new MetallicBox(0.2392, 0.2392, 0.2392);
  box3Station2.setupWebGLBuffers();
  mB2s2 = mat4.create();
  mat4.translate(mB2s2, mB2s2, vec3.fromValues(-5, 2.4, -2.1));
  mat4.scale(mB2s2, mB2s2, vec3.fromValues(0.1, 0.3, 0.1));
  box3Station2.localMatrix = mB2s2;
  box3Station2.setParent(box2Station2);
  objects.push(box3Station2);
  objects[17].updateWorldMatrix();

  hookTube = new ArmTube();
  hookTube.setupWebGLBuffers();
  mhTube = mat4.create();
  mat4.translate(mhTube, mhTube, vec3.fromValues(2, 4.475, 0));
  mat4.scale(mhTube, mhTube, vec3.fromValues(0.6, 0.45, 0.6));
  hookTube.localMatrix = mhTube;
  objects.push(hookTube);
  objects[18].updateWorldMatrix();

  box1Tube = new MetallicBox(0.3, 0.3, 0.3);
  box1Tube.setupWebGLBuffers();
  mb1Tube = mat4.create();
  mat4.translate(mb1Tube, mb1Tube, vec3.fromValues(2, 3.55, 0));
  mat4.scale(mb1Tube, mb1Tube, vec3.fromValues(0.25, 0.025, 0.15));
  box1Tube.localMatrix = mb1Tube;
  objects.push(box1Tube);
  objects[19].updateWorldMatrix();

  box2Tube = new MetallicBox(0.3, 0.3, 0.3);
  box2Tube.setupWebGLBuffers();
  mb2Tube = mat4.create();
  mat4.translate(mb2Tube, mb2Tube, vec3.fromValues(1.875, 3.425, 0));
  mat4.scale(mb2Tube, mb2Tube, vec3.fromValues(0.025, 0.1, 0.15));
  box2Tube.localMatrix = mb2Tube;
  objects.push(box2Tube);
  objects[20].updateWorldMatrix();

  box3Tube = new MetallicBox(0.3, 0.3, 0.3);
  box3Tube.setupWebGLBuffers();
  mb3Tube = mat4.create();
  mat4.translate(mb3Tube, mb3Tube, vec3.fromValues(2.125, 3.425, 0));
  mat4.scale(mb3Tube, mb3Tube, vec3.fromValues(0.025, 0.1, 0.15));
  box3Tube.localMatrix = mb3Tube;
  objects.push(box3Tube);
  objects[21].updateWorldMatrix();
}
