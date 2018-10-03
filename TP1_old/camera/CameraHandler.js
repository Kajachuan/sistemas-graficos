function CameraHandler(){

  var vMatrix = null;
  var mouseDown = null;
  var mode = null;

  this.mouseCoordinates = {
    cur_x: 0.0,
    cur_y: 0.0,
    previousX: 0.0,
    previousY: 0.0,
    speedFactor: 0.003
  };

  this.oCam = {
		centerX: 0.0,
    centerY: 0.0,
    centerZ: 0.0,
		radius: 35.0,
		phi: degToRad(15.0),
		theta: 0.0,
    speed: 0.01
	};

  this.fpCam = {
    posX: 0.0,
    posY: -2.5,
    posZ: -24.0,
    theta: 0.0,		//xz
    phi: 0.0,			//xy
    speed: 0.2
  };

  this.cCam = {
    posX: -15.75,
    posY: -8.1,
    posZ: -6.25,
    theta: degToRad(-90),		//xz
    phi: degToRad(70),			//xy
    speed: 0.2
  };

  this.setupHandlers = function(e) {
    var body = document.getElementById("glbody");
		var canvas = document.getElementById("glcanvas");

		body.handler = this;
		canvas.handler = this;

		this.vMatrix = mat4.create();
		mat4.identity(this.vMatrix);
		this.setO();
  };

  this.setFp = function() {
    var body = document.getElementById("glbody");
    var canvas = document.getElementById("glcanvas");

    body.onkeydown = this.onKeyDownFp;
    canvas.onmousemove = this.onMouseMoveFp;
    canvas.onmousedown = this.onMouseDownFp;
    canvas.onmouseup = this.onMouseUpFp;

    this.mode = "fp";
    this.modifyvMatrix();
  };

  this.setO = function() {
    var body = document.getElementById("glbody");
    var canvas = document.getElementById("glcanvas");

    body.onkeydown = this.onKeyDownO;
    canvas.onmousemove = this.onMouseMoveO;
    canvas.onmousedown = this.onMouseDownO;
    canvas.onmouseup = this.onMouseUpO;
    canvas.onwheel = this.onMouseWheelO;

    this.mode = "o";
    this.modifyvMatrix();
  };

  this.setC = function() {
    var body = document.getElementById("glbody");
    var canvas = document.getElementById("glcanvas");

    body.onkeydown = this.onKeyDownC;
    canvas.onmousemove = this.onMouseMoveC;
    canvas.onmousedown = this.onMouseDownC;
    canvas.onmouseup = this.onMouseUpC;

    this.mode = "c";
    this.modifyvMatrix();
  };

  this.onKeyDownFp = function(e) {

  	switch (e.keyCode) {
  		case 38:	//'flecha arriba'
        this.handler.fpCam.posZ += Math.cos(this.handler.fpCam.theta) * this.handler.fpCam.speed;
        this.handler.fpCam.posX += Math.sin(this.handler.fpCam.theta) * this.handler.fpCam.speed;
  			break;
  		case 40:			//'flecha abajo'
        this.handler.fpCam.posZ -= Math.cos(this.handler.fpCam.theta) * this.handler.fpCam.speed;
        this.handler.fpCam.posX -= Math.sin(this.handler.fpCam.theta) * this.handler.fpCam.speed;
    		break;
      case 17:			//'cntrl'
        this.handler.setC();
        break;
      }
  		this.handler.modifyvMatrix();
  }

	this.onMouseMoveFp = function(e) {
		if (this.handler.mouseDown) {
			var deltaX = this.handler.previousX - e.clientX;
			var deltaY = this.handler.previousY - e.clientY;

			this.handler.previousX = e.clientX;
			this.handler.previousY = e.clientY;

			this.handler.fpCam.theta += deltaX * this.handler.mouseCoordinates.speedFactor;
			this.handler.fpCam.phi -= deltaY * this.handler.mouseCoordinates.speedFactor;

			if (this.handler.fpCam.phi < -Math.PI/2)
				this.handler.fpCam.phi = -Math.PI/2;

			if (this.handler.fpCam.phi > Math.PI/2)
				this.handler.fpCam.phi = Math.PI/2;

			this.handler.modifyvMatrix();
		}
	};

	this.onMouseUpFp = function(e) {
		this.handler.mouseDown = false;
	};

	this.onMouseDownFp = function(e) {
		this.handler.previousX = e.clientX;
		this.handler.previousY = e.clientY;
		this.handler.mouseDown = true;
	};

  this.onKeyDownC = function(e) {

  	switch (e.keyCode) {
      case 17:			//'cntrl'
        this.handler.setO();
        break;
      }
  		this.handler.modifyvMatrix();
  }

  this.onMouseMoveC = function(e) {
    if (this.handler.mouseDown) {
      var deltaX = this.handler.previousX - e.clientX;
      var deltaY = this.handler.previousY - e.clientY;

      this.handler.previousX = e.clientX;
      this.handler.previousY = e.clientY;

      this.handler.cCam.theta += deltaX * this.handler.mouseCoordinates.speedFactor;
      this.handler.cCam.phi -= deltaY * this.handler.mouseCoordinates.speedFactor;

      if (this.handler.cCam.phi < -Math.PI/2)
        this.handler.cCam.phi = -Math.PI/2;

      if (this.handler.cCam.phi > Math.PI/2)
        this.handler.cCam.phi = Math.PI/2;

      this.handler.modifyvMatrix();
    }
  };

  this.onMouseUpC = function(e) {
    this.handler.mouseDown = false;
  };

  this.onMouseDownC = function(e) {
    this.handler.previousX = e.clientX;
    this.handler.previousY = e.clientY;
    this.handler.mouseDown = true;
  };

  this.onKeyDownO = function(e) {
    switch (e.keyCode) {
    case 107:		// '+'
      this.handler.oCam.radius -= this.handler.oCam.speed * 50;
      if (this.handler.oCam.radius < 0)
        this.handler.oCam.radius = 0;
      this.handler.modifyvMatrix();
      break;
    case 109:		// '-'
      this.handler.oCam.radius += this.handler.oCam.speed * 50;
      if (this.handler.oCam.radius < 0)
        this.handler.oCam.radius = 0;
      this.handler.modifyvMatrix();
      break;
    case 17:		//'cntrl'
      this.handler.setFp();
      break;
    }
  }
  this.onMouseMoveO = function(e) {
    if (this.handler.mouseDown) {
      var deltaX = this.handler.previousX - e.clientX;
      var deltaY = this.handler.previousY - e.clientY;

      this.handler.previousX = e.clientX;
      this.handler.previousY = e.clientY;

      this.handler.oCam.theta += deltaX * this.handler.mouseCoordinates.speedFactor;
      this.handler.oCam.phi -= deltaY * this.handler.mouseCoordinates.speedFactor;

      if (this.handler.oCam.phi < -Math.PI/2)
        this.handler.oCam.phi = -Math.PI/2;

      if (this.handler.oCam.phi > Math.PI/2)
        this.handler.oCam.phi = Math.PI/2;

      this.handler.modifyvMatrix();
    }
  };
  this.onMouseUpO = function(e) {
    this.handler.mouseDown = false;
  };
  this.onMouseDownO = function(e) {
    this.handler.previousX = e.clientX;
    this.handler.previousY = e.clientY;
    this.handler.mouseDown = true;
  };
  this.onMouseWheelO = function(e) {
    this.handler.oCam.radius += e.deltaY * Math.sign(this.handler.oCam.speed);

    if (this.handler.oCam.radius < 0)
      this.handler.oCam.radius = 0;

    this.handler.modifyvMatrix();
  };


  this.actualizarPosicionCabina = function(x,y,z) {
      this.cCam.posX -= x;
      this.cCam.posY -= y;
      this.cCam.posZ -= z;
      this.modifyvMatrix();
    };

  this.modifyvMatrix = function() {
    mat4.identity(this.vMatrix);
    if (this.mode == "fp") {
      mat4.rotate(this.vMatrix, this.vMatrix, this.fpCam.phi, [1.0, 0.0, 0.0]);
      mat4.rotate(this.vMatrix, this.vMatrix, this.fpCam.theta, [0.0, -1.0, 0.0]);
      mat4.translate(this.vMatrix, this.vMatrix, [this.fpCam.posX,this.fpCam.posY,this.fpCam.posZ]);
      mat4.multiply(viewMatrix,this.vMatrix,viewMatrix);
    } else if (this.mode == "o") {
      mat4.translate(this.vMatrix, this.vMatrix, [0.0, 0.0, -this.oCam.radius]);
      mat4.rotate(this.vMatrix, this.vMatrix, this.oCam.phi, [1.0, 0.0, 0.0]);
      mat4.rotate(this.vMatrix, this.vMatrix, this.oCam.theta, [0.0, -1.0, 0.0]);
      mat4.multiply(viewMatrix,this.vMatrix,viewMatrix);
    } else if (this.mode == "c") {
      mat4.rotate(this.vMatrix, this.vMatrix, this.cCam.phi, [1.0, 0.0, 0.0]);
      mat4.rotate(this.vMatrix, this.vMatrix, this.cCam.theta, [0.0, -1.0, 0.0]);
      mat4.translate(this.vMatrix, this.vMatrix, [this.cCam.posX,this.cCam.posY,this.cCam.posZ]);
      mat4.multiply(viewMatrix,this.vMatrix,viewMatrix);
    }
  };

  this.getvMode = function() {
    return this.mode;
  }
}
