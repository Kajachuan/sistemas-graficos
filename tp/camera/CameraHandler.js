function CameraHandler(){

  var vMatrix = null;
  var mouseDown = null;
  var body = document.getElementById("my-body");
  var canvas = document.getElementById("my-canvas");

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
		radius: 5.0,
		phi: degToRad(60.0),
		theta: 0.0,
    speed: 0.01
	};

  this.setupHandlers = function(e) {
		body.handler = this;
		canvas.handler = this;

		this.vMatrix = mat4.create();
		mat4.identity(this.vMatrix);

		this.setO();
  };

  this.setO = function() {
    body.onkeydown = this.onKeyDownO;
    canvas.onmousemove = this.onMouseMoveO;
    canvas.onmousedown = this.onMouseDownO;
    canvas.onmouseup = this.onMouseUpO;
    canvas.onwheel = this.onMouseWheelO;

    this.modifyvMatrix();
  };

  this.setOrt = function () {
    body.onkeydown = this.onKeyDownOrt;
    canvas.onmousemove = null;
    canvas.onmousedown = null;
    canvas.onmouseup = null;
    canvas.onwheel = null;

    this.modifyvMatrix();
  };

  this.onKeyDownOrt = function(e) {
    switch (e.keyCode) {
    case 49:		//'1'
    case 97:		//'1' numpad
      this.handler.oCam.centerX = 0.0;
      this.handler.oCam.centerY = 0.0;
      this.handler.oCam.centerZ = 0.0;
      this.handler.setO();
      break;
    case 50:		//'2'
    case 98:		//'2' numpad
      this.handler.oCam.centerX = 2.0; //getCakeStation1PositionX()
      this.handler.oCam.centerY = 2.0; //getCakeStation1PositionY()
      this.handler.oCam.centerZ = 2.0; //getCakeStation1PositionZ()
      this.handler.setO();
      break;
    case 51:		//'3'
    case 99:		//'3' numpad
      this.handler.oCam.centerX = -2.0; //getCakeStation2PositionX()
      this.handler.oCam.centerY = -2.0; //getCakeStation2PositionY()
      this.handler.oCam.centerZ = -2.0; //getCakeStation2PositionZ()
      this.handler.setO();
      break;
    case 52:		//'4'
    case 100:		//'4' numpad
      this.handler.oCam.centerX = 0.0;
      this.handler.oCam.centerY = 0.0;
      this.handler.oCam.centerZ = 0.0;
      this.handler.oCam.theta = 0.0;
      this.handler.oCam.phi = degToRad(0.0);
      break;
    case 53:		//'5'
    case 101:		//'5' numpad
      this.handler.oCam.centerX = 0.0;
      this.handler.oCam.centerY = 0.0;
      this.handler.oCam.centerZ = 0.0;
      this.handler.oCam.theta = 0.0;
      this.handler.oCam.phi = degToRad(90.0);
      break;

    }
  };

  this.onKeyDownO = function(e) {
    switch (e.keyCode) {
      case 107:		// '+'
        this.handler.oCam.radius -= this.handler.oCam.speed * 50;
        if (this.handler.oCam.radius < 0)
          this.handler.oCam.radius = 0;
          break;
      case 109:		// '-'
      this.handler.oCam.radius += this.handler.oCam.speed * 50;
      if (this.handler.oCam.radius < 0)
        this.handler.oCam.radius = 0;
      break;

      case 49:		//'1'
      case 97:		//'1' numpad
      this.handler.oCam.centerX = 0.0;
      this.handler.oCam.centerY = 0.0;
      this.handler.oCam.centerZ = 0.0;
      break;

      case 50:		//'2'
      case 98:		//'2' numpad
      this.handler.oCam.centerX = 2.0; //getCakeStation1PositionX()
      this.handler.oCam.centerY = 2.0; //getCakeStation1PositionY()
      this.handler.oCam.centerZ = 2.0; //getCakeStation1PositionZ()
      break;

      case 51:		//'3'
      case 99:		//'3' numpad
      this.handler.oCam.centerX = -2.0; //getCakeStation2PositionX()
      this.handler.oCam.centerY = -2.0; //getCakeStation2PositionY()
      this.handler.oCam.centerZ = -2.0; //getCakeStation2PositionZ()
      break;

      case 52:		//'4'
      case 100:		//'4' numpad
        this.handler.oCam.centerX = 0.0;
        this.handler.oCam.centerY = 0.0;
        this.handler.oCam.centerZ = 0.0;
        this.handler.oCam.theta = 0.0;
        this.handler.oCam.phi = degToRad(0.0);
        this.handler.setOrt();
        break;

      case 53:		//'5'
      case 101:		//'5' numpad
        this.handler.oCam.centerX = 0.0;
        this.handler.oCam.centerY = 0.0;
        this.handler.oCam.centerZ = 0.0;
        this.handler.oCam.theta = 0.0;
        this.handler.oCam.phi = degToRad(90.0);
        this.handler.setOrt();
        break;
    };
  };

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
  };

  this.modifyvMatrix = function() {
    mat4.identity(this.vMatrix);
    mat4.translate(this.vMatrix, this.vMatrix, [this.oCam.centerX, this.oCam.centerY, this.oCam.centerZ]);
    mat4.translate(this.vMatrix, this.vMatrix, [0.0, 0.0, -this.oCam.radius]);
    mat4.rotate(this.vMatrix, this.vMatrix, this.oCam.phi, [1.0, 0.0, 0.0]);
    mat4.rotate(this.vMatrix, this.vMatrix, this.oCam.theta, [0.0, -1.0, 0.0]);
    mat4.multiply(viewMatrix,this.vMatrix,viewMatrix);
  };

  this.getvMode = function() {
    return this.mode;
  }
}
