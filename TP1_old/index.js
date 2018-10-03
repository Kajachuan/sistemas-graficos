var shaderProgram;
var gl;

var viewMatrix = mat4.create();
var modMatrix = mat4.create();
var pMatrix = mat4.create();
var mvMatrixStack = [];

var trasladarGrua = 0;
var trasladarCabina = 0;
var trasladoCables = 0;
var escaladoCables = 0;
var trasladoPinzas = 0;

var waterTexture = null;
var cajasMuelle = [];
var cajasBarco = [];
var cantidadCajasMuelle = 23;
var cantidadCajasBarco = 13;
var sea;
var cameraHandler;
var muelle;
var grua;
var barco;
var isla;

var blueColor = new Uint8Array([0, 0, 255, 255]);
var darkGreyColor = new Uint8Array([135, 135, 135, 255]);
var greyColor = new Uint8Array([179, 179, 179, 255]);
var blackColor = new Uint8Array([0, 0, 0, 255]);
var redColor = new Uint8Array([255, 0, 0, 255]);
var yellowColor = new Uint8Array([255, 230, 0, 255]);
var greenColor = new Uint8Array([102, 153, 51, 255]);
var darkRedColor = new Uint8Array([153, 0, 0, 255]);
var brownColor = new Uint8Array([128, 77, 26, 255]);
var cremeColor = new Uint8Array([230, 230, 204, 255]);

function start() {
    var canvas = document.getElementById("glcanvas");
    initGL(canvas);
    initShaders();

    cameraHandler = new CameraHandler();
    cameraHandler.setupHandlers();

    initCajasMuelle();
    initCajasBarco();

    grua = new Grua();
    grua.initBuffers();
    grua.trasladar(4,0,4);

    barco = new Barco(darkRedColor);
    barco.initBuffers();
    barco.trasladar(18,0,20);

    isla = new Isla(brownColor);
    isla.initBuffers();

    muelle = new Caja(12.0,0.5,35.0,greyColor);
    muelle.initValues();
    muelle.initBuffers();
    muelle.trasladar(0,0,-0.25);

    sea = new Sea();
    sea.loadSea();
    initWorldTextures();

    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    initScene();
}


function onKeyDown(e) {
  switch (e.keyCode) {
    case 37:	//'flecha izq'
      trasladarGrua = 0.1;
      grua.trasladar(0,0,trasladarGrua);
      cameraHandler.actualizarPosicionCabina(0,0,trasladarGrua);
      break;
    case 38: //'flecha up'
      if(cameraHandler.getvMode() != 'fp'){
        trasladarCabina = 0.075;
        grua.trasladarCabina(trasladarCabina);
        cameraHandler.actualizarPosicionCabina(trasladarCabina,0,0);
      }
      break;
    case 39://'flecha derecha'
      trasladarGrua = -0.1;
      grua.trasladar(0,0,trasladarGrua);
      cameraHandler.actualizarPosicionCabina(0,0,trasladarGrua);
      break;
    case 40: //'flecha down'
      if(cameraHandler.getvMode() != 'fp'){
        trasladarCabina = -0.075;
        grua.trasladarCabina(trasladarCabina);
        cameraHandler.actualizarPosicionCabina(trasladarCabina,0,0);
      }
      break;
    case 65: //'A'
      trasladoCables = -0.0738;
      escaladoCables = 1.01;
      trasladoPinzas = -0.035;
      grua.moverPinzasYCables(trasladoCables,escaladoCables,trasladoPinzas);
      break;
    case 81: //'Q'
      trasladoCables = 0.075;
      escaladoCables = 0.99;
      trasladoPinzas = 0.012;
      grua.moverPinzasYCables(trasladoCables,escaladoCables,trasladoPinzas);
      break;
    case 69: //'E'
      if(grua.noTieneAlgunContenedorActualmente()){
        grua.siTieneAlgunContenedorAlAlcanceAgarrar(cajasMuelle);
        grua.siTieneAlgunContenedorAlAlcanceAgarrar(cajasBarco);
      } else {
        grua.dejarContenedor();
      }
      break;
    }
}

function onKeyUp(e) {
  trasladarGrua = 0;
}

/*inicializar cajas del muelle como en las imagenes del tp*/
function initCajasMuelle(){
  var separadorZ = 0;
  var separadorX = 0;
  var currentColor = blueColor;

  var cantidadPorPrimeraFilaMenosUno = 4;
  var cantidadPorSegundaFilaMenosUno = 2;
  var cantidadPorTerceraFilaMenosUno = 0;
  var cantidadTotalPrimeraFila = 15;

  var muelleFloorPaddingY = 1;
  var muelleFloorPaddingX = 8;
  var muelleFloorPaddingZ = 4;

  var paddingSegundaFilaY = 0.85;
  var segundaFila1 = 0;
  var segundaFila2 = 0;
  var segundaFila3 = 0;

  var i = 0;
  var cantCajas = 0;
  var randomColor = 0;

  while (cantCajas < cantidadCajasMuelle){

    randomColor = Math.random();

    if(randomColor < 0.2) {
      currentColor = greenColor;
    } else if(randomColor > 0.2 && randomColor < 0.4 ) {
      currentColor = redColor;
    } else if(randomColor > 0.4 && randomColor < 0.6 ) {
      currentColor = blueColor;
    } else if(randomColor > 0.6 && randomColor < 0.8 ) {
      currentColor = darkGreyColor;
    } else if(randomColor > 0.8) {
      currentColor = yellowColor;
    }

    cajasMuelle[i] = new Caja(0.5,0.4,1.25,currentColor);

    if(cantCajas <= cantidadPorPrimeraFilaMenosUno){
      cajasMuelle[i].trasladar(separadorX+muelleFloorPaddingX,muelleFloorPaddingY,separadorZ+muelleFloorPaddingZ);
      cajasMuelle[i].initValues();
      separadorZ += 3;
      if(cantCajas == cantidadPorPrimeraFilaMenosUno){
        separadorZ = 0;
        separadorX -= 1.25;
      }
    } else if(cantCajas > cantidadPorPrimeraFilaMenosUno && i <= ((cantidadPorPrimeraFilaMenosUno * 2) + 1)){
      cajasMuelle[i].trasladar(separadorX+muelleFloorPaddingX,muelleFloorPaddingY,separadorZ+muelleFloorPaddingZ);
      cajasMuelle[i].initValues();
      separadorZ += 3;
      if(i == ((cantidadPorPrimeraFilaMenosUno * 2) + 1)){
        separadorZ = 0;
        separadorX -= 1.25;
      }
    } else if(cantCajas > ((cantidadPorPrimeraFilaMenosUno * 2) + 1) && cantCajas < cantidadTotalPrimeraFila) {
      cajasMuelle[i].trasladar(separadorX+muelleFloorPaddingX,muelleFloorPaddingY,separadorZ+muelleFloorPaddingZ);
      cajasMuelle[i].initValues();
      separadorZ += 3;
    } else if(cantCajas >= cantidadTotalPrimeraFila && segundaFila1 <= cantidadPorSegundaFilaMenosUno){
      if(cantCajas == cantidadTotalPrimeraFila){
        separadorX = 0;
        separadorZ -= 3;
      }
      cajasMuelle[i].trasladar(separadorX+muelleFloorPaddingX,muelleFloorPaddingY+paddingSegundaFilaY,separadorZ+muelleFloorPaddingZ);
      cajasMuelle[i].initValues();

      separadorZ -= 3;
      segundaFila1++;
      if(segundaFila1 == (cantidadPorSegundaFilaMenosUno+1)){
        separadorX -= 1.25;
        separadorZ += 6.0;
      }
    } else if(cantCajas >= (cantidadTotalPrimeraFila+(cantidadPorSegundaFilaMenosUno+1)) && segundaFila2 <= cantidadPorSegundaFilaMenosUno){
      cajasMuelle[i].trasladar(separadorX+muelleFloorPaddingX,muelleFloorPaddingY+paddingSegundaFilaY,separadorZ+muelleFloorPaddingZ);
      cajasMuelle[i].initValues();
      separadorZ -= 3;
      segundaFila2++;
      if(segundaFila2 == (cantidadPorSegundaFilaMenosUno+1)){
        separadorX -= 1.25;
        separadorZ += 6.0;
      }
    } else if(cantCajas >= (cantidadTotalPrimeraFila+((cantidadPorSegundaFilaMenosUno+1)*2)) && segundaFila3 <= cantidadPorTerceraFilaMenosUno){
      cajasMuelle[i].trasladar(separadorX+muelleFloorPaddingX,muelleFloorPaddingY+paddingSegundaFilaY,separadorZ+muelleFloorPaddingZ);
      cajasMuelle[i].initValues();
      segundaFila3++;
      if(segundaFila3 == (cantidadPorTerceraFilaMenosUno+1)){
        separadorX += 1.25;
      }
    } else if(cantCajas >= (cantidadTotalPrimeraFila+((cantidadPorSegundaFilaMenosUno+1)*2)+cantidadPorTerceraFilaMenosUno)) {
        cajasMuelle[i].trasladar(separadorX+muelleFloorPaddingX,muelleFloorPaddingY+(paddingSegundaFilaY*2),separadorZ+muelleFloorPaddingZ);
        cajasMuelle[i].initValues();
    }

    cajasMuelle[i].initBuffers();

    i++;
    cantCajas++;
  }
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function initWorldTextures(){
    waterTexture = gl.createTexture();
    waterTexture.image = new Image();
    waterTexture.image.onload = function () {
        sea.initTexture(gl,waterTexture,waterTexture.image);
    }
    waterTexture.image.src = "textures/watertexture.jpg";
}

function mvPushMatrix() {
    mvMatrixStack.push(mat4.clone(modMatrix));
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    modMatrix = mvMatrixStack.pop();
}

/*inicializar cajas del barco como en las imagenes del tp*/
function initCajasBarco(){
  var separadorX = 0;
  var separadorY = 0;
  var currentColor = blueColor;

  var cantidadPorPrimeraFilaMenosUno = 4;
  var cantidadPorSegundaFilaMenosUno = 4;
  var cantidadPorTerceraFilaMenosUno = 2;
  var cantidadTotalPrimeraFila = 5;

  var paddingY = 1.51;
  var paddingX = 18.5;
  var paddingZ = 1;

  var i = 0;
  var cantCajas = 0;
  var randomColor = 0;

  while (cantCajas < cantidadCajasBarco){

    randomColor = Math.random();

    if(randomColor < 0.2) {
      currentColor = greenColor;
    } else if(randomColor > 0.2 && randomColor < 0.4 ) {
      currentColor = redColor;
    } else if(randomColor > 0.4 && randomColor < 0.6 ) {
      currentColor = blueColor;
    } else if(randomColor > 0.6 && randomColor < 0.8 ) {
      currentColor = darkGreyColor;
    } else if(randomColor > 0.8) {
      currentColor = yellowColor;
    }

    cajasBarco[i] = new Caja(0.5,0.4,1.25,currentColor);

    if(cantCajas <= cantidadPorPrimeraFilaMenosUno){
      cajasBarco[i].trasladar(separadorX+paddingX,paddingY+separadorY,paddingZ);
      cajasBarco[i].initValues();
      separadorX -= 1.1;
      if(cantCajas == cantidadPorPrimeraFilaMenosUno){
        separadorY += 0.85;
        separadorX = 0;
      }
    } else if(cantCajas > cantidadPorPrimeraFilaMenosUno && i <= ((cantidadPorPrimeraFilaMenosUno * 2) + 1)) {
      cajasBarco[i].trasladar(separadorX+paddingX,paddingY+separadorY,paddingZ);
      cajasBarco[i].initValues();
      separadorX -= 1.1;
      if(i == ((cantidadPorPrimeraFilaMenosUno * 2) + 1)){
        separadorY += 0.85;
        separadorX = -2.2;
      }
    } else if(cantCajas > ((cantidadPorPrimeraFilaMenosUno * 2) + 1) && cantCajas <= cantidadCajasBarco) {
      cajasBarco[i].trasladar(separadorX+paddingX,paddingY+separadorY,paddingZ);
      cajasBarco[i].initValues();
      separadorX -= 1.1;
    }

    cajasBarco[i].initBuffers();

    i++;
    cantCajas++;
  }
}


function initGL(canvas) {
    try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

  var defaults = {
    p: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    lDir: [.57, .57, 0.57]
  }

function initShaders() {
    //var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    //var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);

    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, txfsSource);
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, txvsSource);

    // Create the shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
    gl.enableVertexAttribArray(shaderProgram.colorAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    shaderProgram.vertexUVAttribute = gl.getAttribLocation(shaderProgram, "aVertexUV");
    gl.enableVertexAttribArray(shaderProgram.vertexUVAttribute);

    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
    shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

    shaderProgram.p = gl.getUniformLocation(shaderProgram, "p");
    shaderProgram.lDir = gl.getUniformLocation(shaderProgram, "lDir");
}

function initScene(){
      gl.clearColor(0.5, 0.7, 0.8, 1.0);  // Clear to lightblue, fully opaque
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

      tick();
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, viewMatrix);
  gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, modMatrix);
}

function tick(){
    requestAnimFrame(tick);
    drawScene();
}

function drawScene() {
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Create a perspective matrix, a special matrix that is
      // used to simulate the distortion of perspective in a camera.
      // Our field of view is 45 degrees, with a width/height
      // ratio that matches the display size of the canvas
      // and we only want to see objects between 0.1 units
      // and 100 units away from the camera.
      const fieldOfView = 60 * Math.PI / 180;   // in radians
      const aspect = gl.viewportWidth / gl.viewportHeight;
      const zNear = 0.1;
      const zFar = 2000.0;

      mat4.perspective(pMatrix,fieldOfView, aspect, zNear, zFar);

      mat4.identity(viewMatrix);
      cameraHandler.modifyvMatrix();
/*
      mat4.identity(modMatrix);
      muelle.draw();

      for(var i = 0; i < cantidadCajasMuelle; i++){
        mat4.identity(modMatrix);
        cajasMuelle[i].draw();
      }

      for(var i = 0; i < cantidadCajasBarco; i++){
        mat4.identity(modMatrix);
        cajasBarco[i].draw();
      }

      mat4.identity(modMatrix);
      grua.draw();

      mat4.identity(modMatrix);
      barco.draw();

      mat4.identity(modMatrix);
      isla.draw();
*/
      mat4.identity(modMatrix);
      sea.draw();
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
}
