
var horizontalVelocity = 0.025;
var verticalVelocity = 0.05;
var ringSpeedFactor = 3.175;
var plateSpeedFactor = 0.91;
var bandSpeedFactor = 0.1;
var armTubeBoxesSpeedFactor = 4;
distance= 0;
angleDecorator = 0;

function station1R7(){
  mat4.translate(objects[18].localMatrix,objects[18].localMatrix,vec3.fromValues(-horizontalVelocity*ringSpeedFactor*0.716,0,0));
  mat4.translate(objects[19].localMatrix,objects[19].localMatrix,vec3.fromValues(-horizontalVelocity,0,0));
  mat4.translate(objects[20].localMatrix,objects[20].localMatrix,vec3.fromValues(-horizontalVelocity*plateSpeedFactor*0.735,0,0));
  objects[18].updateWorldMatrix();
  objects[19].updateWorldMatrix();
  objects[20].updateWorldMatrix();
  objects[11].move();
  distance += 1;
  if (distance > 299) {
    distance = 0;
    contador = 0;
    animationLoop(station1HookMoveToDecoratorR7);
    return false;
  }
}

function station1HookMoveToDecoratorR7(){
  mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,0,-verticalVelocity));
  mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,0,-verticalVelocity*armTubeBoxesSpeedFactor));
  mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,0,-verticalVelocity*armTubeBoxesSpeedFactor));
  mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,0,-verticalVelocity*armTubeBoxesSpeedFactor));
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  distance += 1;
  if (distance > 99) {
    distance = 0;
    animationLoop(station1HookGrabDecoratorR7);
    return false;
  }
}

function station1HookGrabDecoratorR7(){
  mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.65,0));
  mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.01, 1));
  mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor,0));
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  distance += 1;
  if (distance > 38) {
    distance = 0;
    animationLoop(station1HookGrabDecorator2R7);
    return false;
  }
}

function station1HookGrabDecorator2R7(){
  mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
  mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.991, 1));
  mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor,0));
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  objects[21 + contador].updateWorldMatrix();
  distance += 1;
  if (distance > 38) {
    distance = 0;
    animationLoop(station1HookMoveFromDecoratorR7);
    return false;
  }
}

function station1HookMoveFromDecoratorR7(){
  mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,0,verticalVelocity));
  mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,0,verticalVelocity*armTubeBoxesSpeedFactor));
  mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,0,verticalVelocity*armTubeBoxesSpeedFactor));
  mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,0,verticalVelocity*armTubeBoxesSpeedFactor));
  mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,0,verticalVelocity*armTubeBoxesSpeedFactor*1.5));
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  objects[21 + contador].updateWorldMatrix();
  distance += 1;
  if (distance > 99) {
    distance = 0;
    animationLoop(station1HookMoveToDecoratorCorrespondingPositionR7);
    return false;
  }
}

function station1HookMoveToDecoratorCorrespondingPositionR7(){
  angle = 2 * Math.PI / cantidadDecoradores;
  cos_angle = Math.cos(contador * angle);
  sin_angle = Math.sin(contador * angle);
  mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity*cos_angle,0,verticalVelocity*sin_angle));
  mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity*cos_angle*2.4,0,verticalVelocity*sin_angle*4));
  mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*cos_angle*24,0,verticalVelocity*sin_angle*4));
  mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*cos_angle*24,0,verticalVelocity*sin_angle*4));
  mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(verticalVelocity*cos_angle*6,0,verticalVelocity*sin_angle*6));
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  objects[21 + contador].updateWorldMatrix();
  distance += 1;
  if (distance > 18) {
    distance = 0;
    if(decorador == "Paletas")
      animationLoop(station1RotateDecoratorR7);
    else
      animationLoop(station1HookDeployDecoratorR7);
    return false;
  }
}

function station1RotateDecoratorR7(){
  targetAngle = contador * 360 / cantidadDecoradores;
  if(targetAngle > 0) {
    mat4.rotateY(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,-degToRad(1));

    mat4.scale(objects[offset + 3].localMatrix, objects[offset + 3].localMatrix,vec3.fromValues(6,1,1));
    mat4.translate(objects[offset + 3].localMatrix, objects[offset + 3].localMatrix,vec3.fromValues(0,0,-0.011))
    mat4.rotateY(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,-degToRad(1));
    mat4.scale(objects[offset + 3].localMatrix, objects[offset + 3].localMatrix,vec3.fromValues(1/6,1,1));

    mat4.scale(objects[offset + 4].localMatrix, objects[offset + 4].localMatrix,vec3.fromValues(6,1,1));
    mat4.translate(objects[offset + 4].localMatrix, objects[offset + 4].localMatrix,vec3.fromValues(0,0,0.011))
    mat4.rotateY(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,-degToRad(1));
    mat4.scale(objects[offset + 4].localMatrix, objects[offset + 4].localMatrix,vec3.fromValues(1/6,1,1));

    mat4.rotateY(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,-degToRad(1));
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  }

  angleDecorator += 1;
  if(angleDecorator >= targetAngle) {
    animationLoop(station1HookDeployDecoratorR7);
    return false;
  }
}

function station1HookDeployDecoratorR7(){
  if (altura == 3){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.0118, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor*1.27,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*1.27,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*1.27,0));
      mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*1.27,0));
  } else if (altura == 4){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.011, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor*1.16,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*1.16,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*1.16,0));
      mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*1.16,0));
  } else if (altura == 5){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.0084, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor,0));
      mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor,0));
  } else if (altura == 6){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.008, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor*0.9,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.9,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.9,0));
      mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.9,0));
  } else if (altura == 7){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.007, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor*0.78,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.78,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.78,0));
      mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.78,0));
  } else if (altura == 8){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.004, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor*0.64,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.64,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.64,0));
      mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.64,0));
  } else if (altura == 9){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.002, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor*0.5,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.5,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.5,0));
      mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.5,0));
  } else if (altura == 10){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.00005, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor*0.38,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.38,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.38,0));
      mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor*0.38,0));
  }
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  objects[21 + contador].updateWorldMatrix();
  distance += 1;
  if (distance > 38) {
    distance = 0;
    animationLoop(station1HookDeployDecorator2R7);
    return false;
  }
}

function station1HookDeployDecorator2R7(){
  if (altura === 3){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.9879, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor*1.27,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*1.27,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*1.27,0));
  } else if (altura === 4){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.9884, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor*1.16,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*1.16,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*1.16,0));
  } else if (altura === 5){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.991, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor,0));
  } else if (altura === 6){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.9913, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor*0.9,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.9,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.9,0));
  } else if (altura == 7){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.9923, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor*0.78,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.78,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.78,0));
  } else if (altura == 8){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.9952, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor*0.64,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.64,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.64,0));
  } else if (altura == 9){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.9972, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor*0.5,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.5,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.5,0));
  } else if (altura == 10){
      mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
      mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.999, 1));
      mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor*0.38,0));
      mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.38,0));
      mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor*0.38,0));
  }
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  distance += 1;
  if (distance > 38) {
    distance = 0;
    if(decorador == "Paletas")
      animationLoop(station1RotateDecorator2R7);
    else
      animationLoop(station1HookMoveGoBackFromCorrespondingPositionR7);
    return false;
  }
}

function station1RotateDecorator2R7(){
  if(targetAngle > 0) {
    mat4.rotateY(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,degToRad(1));

    mat4.scale(objects[offset + 3].localMatrix, objects[offset + 3].localMatrix,vec3.fromValues(6,1,1));
    mat4.translate(objects[offset + 3].localMatrix, objects[offset + 3].localMatrix,vec3.fromValues(0,0,0.011))
    mat4.rotateY(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,degToRad(1));
    mat4.scale(objects[offset + 3].localMatrix, objects[offset + 3].localMatrix,vec3.fromValues(1/6,1,1));

    mat4.scale(objects[offset + 4].localMatrix, objects[offset + 4].localMatrix,vec3.fromValues(6,1,1));
    mat4.translate(objects[offset + 4].localMatrix, objects[offset + 4].localMatrix,vec3.fromValues(0,0,-0.011))
    mat4.rotateY(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,degToRad(1));
    mat4.scale(objects[offset + 4].localMatrix, objects[offset + 4].localMatrix,vec3.fromValues(1/6,1,1));
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  }

  angleDecorator -= 1;
  if(angleDecorator == 0) {
    animationLoop(station1HookMoveGoBackFromCorrespondingPositionR7);
    return false;
  }
}

function station1HookMoveGoBackFromCorrespondingPositionR7(){
  angle = 2 * Math.PI / cantidadDecoradores;
  cos_angle = Math.cos(contador * angle);
  sin_angle = Math.sin(contador * angle);
  mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity*cos_angle,0,-verticalVelocity*sin_angle));
  mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity*cos_angle*2.4,0,-verticalVelocity*sin_angle*4));
  mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*cos_angle*24,0,-verticalVelocity*sin_angle*4));
  mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*cos_angle*24,0,-verticalVelocity*sin_angle*4));
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  distance += 1;
  if (distance > 18) {
    distance = 0;
    if(contador < (cantidadDecoradores-1)){
      contador += 1;
      animationLoop(station1HookMoveToDecoratorR7);
    } else {
      animationLoop(station2R7);
    }
    return false;
  }
}

function station2R7(){
  mat4.translate(objects[18].localMatrix,objects[18].localMatrix,vec3.fromValues(-horizontalVelocity*ringSpeedFactor*0.71,0,0));
  mat4.translate(objects[19].localMatrix,objects[19].localMatrix,vec3.fromValues(-horizontalVelocity,0,0));
  mat4.translate(objects[20].localMatrix,objects[20].localMatrix,vec3.fromValues(-horizontalVelocity*plateSpeedFactor*0.729,0,0));
  objects[18].updateWorldMatrix();
  objects[19].updateWorldMatrix();
  objects[20].updateWorldMatrix();
  objects[11].move();
  if(decorador == "Paletas")
    for (var counter = 0; counter < cantidadDecoradores; counter++){
      mat4.rotateY(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,degToRad(counter * 360/cantidadDecoradores));
      mat4.translate(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,vec3.fromValues(-horizontalVelocity*10.075,0,0));
      mat4.rotateY(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,degToRad(-counter * 360/cantidadDecoradores));
      objects[21 + counter].updateWorldMatrix();
    }
  else {
    for (var counter = 0; counter < cantidadDecoradores; counter++){
      mat4.translate(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,vec3.fromValues(-horizontalVelocity*10.075,0,0));
      objects[21 + counter].updateWorldMatrix();
    }
  }
  distance += 1;
  if (distance > 277) {
    distance = 0;
    c = 0;
    vueltasReales = 360/cantidadContorno;
    vueltasAproximadas = Math.round(360/cantidadContorno);
    vueltasFaltantes = Math.abs(Math.floor(360/cantidadContorno) - (360/cantidadContorno));
    animationLoop(station2DeployContornoR7);
    return false;
  }
}

function station2DeployContornoR7(){
  mat4.scale(objects[16].localMatrix,objects[16].localMatrix, vec3.fromValues(1, 1, 1.023));
  mat4.translate(objects[17].localMatrix,objects[17].localMatrix,vec3.fromValues(0,0,horizontalVelocity*7));
  if (contorno == "Caramelos"){
    mat4.translate(objects[21 + cantidadDecoradores + c].localMatrix,objects[21 + cantidadDecoradores + c].localMatrix,vec3.fromValues(0,0,horizontalVelocity*6.5));
  } else {
    mat4.translate(objects[21 + cantidadDecoradores + c].localMatrix,objects[21 + cantidadDecoradores + c].localMatrix,vec3.fromValues(-horizontalVelocity*33.5,0,0));
  }

  objects[16].updateWorldMatrix();
  objects[17].updateWorldMatrix();
  objects[21 + cantidadDecoradores + c].updateWorldMatrix();
  distance += 1;
  if (distance > 30) {
    distance = 0;
    animationLoop(station2DeployContorno2R7);
    return false;
  }
}

function station2DeployContorno2R7(){
  mat4.scale(objects[16].localMatrix,objects[16].localMatrix, vec3.fromValues(1, 1, 0.97752));
  mat4.translate(objects[17].localMatrix,objects[17].localMatrix,vec3.fromValues(0,0,-horizontalVelocity*7));
  objects[16].updateWorldMatrix();
  objects[17].updateWorldMatrix();
  distance += 1;
  if (distance > 30) {
    distance = 0;
    animationLoop(station2RotateCakeAndContornosR7);
    return false;
  }
}

function station2RotateCakeAndContornosR7(){
  if(c < cantidadContorno){
    var degreesToMove = degToRad(1);
    for (var j = 0; j < c + 1 ; j++){
      if (contorno == "Caramelos"){
        mat4.translate(objects[21 + cantidadDecoradores + j].localMatrix,objects[21 + cantidadDecoradores + j].localMatrix,vec3.fromValues(-0.25,0,0.01));
        mat4.rotateY(objects[21 + cantidadDecoradores + j].localMatrix,objects[21 + cantidadDecoradores + j].localMatrix,degToRad(vueltasFaltantes/((360/cantidadContorno)-1)));
        mat4.rotateY(objects[21 + cantidadDecoradores + j].localMatrix,objects[21 + cantidadDecoradores + j].localMatrix,degreesToMove);
      } else {
        mat4.scale(objects[21 + cantidadDecoradores + j].localMatrix,objects[21 + cantidadDecoradores + j].localMatrix,vec3.fromValues(1,1,0.4));
        mat4.translate(objects[21 + cantidadDecoradores + j].localMatrix,objects[21 + cantidadDecoradores + j].localMatrix,vec3.fromValues(-0.09,0,-1.27));
        mat4.rotateY(objects[21 + cantidadDecoradores + j].localMatrix,objects[21 + cantidadDecoradores + j].localMatrix,degToRad(vueltasFaltantes/((360/cantidadContorno)-1)));
        mat4.rotateY(objects[21 + cantidadDecoradores + j].localMatrix,objects[21 + cantidadDecoradores + j].localMatrix,degreesToMove);
        mat4.scale(objects[21 + cantidadDecoradores + j].localMatrix,objects[21 + cantidadDecoradores + j].localMatrix,vec3.fromValues(1,1,2.5));
      }
      objects[21 + cantidadDecoradores + j].updateWorldMatrix();
    }
    mat4.rotateY(objects[18].localMatrix,objects[18].localMatrix,degToRad(vueltasFaltantes/((360/cantidadContorno)-1)));
    mat4.rotateY(objects[19].localMatrix,objects[19].localMatrix,degToRad(vueltasFaltantes/((360/cantidadContorno)-1)));
    mat4.rotateY(objects[20].localMatrix,objects[20].localMatrix,degToRad(vueltasFaltantes/((360/cantidadContorno)-1)));
    mat4.rotateY(objects[18].localMatrix,objects[18].localMatrix,degreesToMove);
    mat4.rotateY(objects[19].localMatrix,objects[19].localMatrix,degreesToMove);
    mat4.rotateY(objects[20].localMatrix,objects[20].localMatrix,degreesToMove);
    objects[18].updateWorldMatrix();
    objects[19].updateWorldMatrix();
    objects[20].updateWorldMatrix();
    if(decorador == "Paletas") {
      for (var j = 0; j < cantidadDecoradores; j++) {
        mat4.rotateY(objects[21 + j].localMatrix,objects[21 + j].localMatrix,degToRad(j * 360/cantidadDecoradores));
        mat4.translate(objects[21 + j].localMatrix,objects[21 + j].localMatrix,vec3.fromValues(0.1 * Math.sin(2 * j * Math.PI / cantidadDecoradores),0,-0.1 * Math.cos(2 * j * Math.PI / cantidadDecoradores)));
        mat4.rotateY(objects[21 + j].localMatrix,objects[21 + j].localMatrix,degToRad(vueltasFaltantes/((360/cantidadContorno)-1)));
        mat4.rotateY(objects[21 + j].localMatrix,objects[21 + j].localMatrix,degreesToMove);
        mat4.rotateY(objects[21 + j].localMatrix,objects[21 + j].localMatrix,degToRad(-j * 360/cantidadDecoradores));
        objects[21 + j].updateWorldMatrix();
      }
    }

    else {
      for (var j = 0; j < cantidadDecoradores; j++) {
        mat4.translate(objects[21 + j].localMatrix,objects[21 + j].localMatrix,vec3.fromValues(0.1 * Math.sin(2 * j * Math.PI / cantidadDecoradores),0,-0.1 * Math.cos(2 * j * Math.PI / cantidadDecoradores)));
        mat4.rotateY(objects[21 + j].localMatrix,objects[21 + j].localMatrix,degToRad(vueltasFaltantes/((360/cantidadContorno)-1)));
        mat4.rotateY(objects[21 + j].localMatrix,objects[21 + j].localMatrix,degreesToMove);
        objects[21 + j].updateWorldMatrix();
      }
    }
  }
  distance += 1;
  if (distance > ((360/cantidadContorno)-1)) {
    distance = 0;
    if (c < (cantidadContorno-1)){
      c += 1;
      animationLoop(station2DeployContornoR7);
    }
    else {
      animationLoop(bandFinalR7);
    }
    return false;
  }
}

function bandFinalR7(){
  mat4.translate(objects[18].localMatrix,objects[18].localMatrix,vec3.fromValues(-horizontalVelocity*ringSpeedFactor*0.71,0,0));
  mat4.translate(objects[19].localMatrix,objects[19].localMatrix,vec3.fromValues(-horizontalVelocity,0,0));
  mat4.translate(objects[20].localMatrix,objects[20].localMatrix,vec3.fromValues(-horizontalVelocity*plateSpeedFactor*0.729,0,0));
  objects[18].updateWorldMatrix();
  objects[19].updateWorldMatrix();
  objects[20].updateWorldMatrix();
  objects[11].move();
  if(decorador == "Paletas") {
    for (var counter = 0; counter < cantidadDecoradores; counter++){
      mat4.rotateY(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,degToRad(counter * 360/cantidadDecoradores));
      mat4.translate(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,vec3.fromValues(-horizontalVelocity*9.975,0,0));
      mat4.rotateY(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,degToRad(-counter * 360/cantidadDecoradores));
      objects[21 + counter].updateWorldMatrix();
    }
  }

  else {
    for (var counter = 0; counter < cantidadDecoradores; counter++){
      mat4.translate(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,vec3.fromValues(-horizontalVelocity*9.975,0,0));
      objects[21 + counter].updateWorldMatrix();
    }
  }

  if (contorno == "Caramelos") {
    for (var counter = 0; counter < cantidadContorno; counter++){
      mat4.rotateY(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,degToRad(counter * 360/cantidadContorno));
      mat4.translate(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,vec3.fromValues(-horizontalVelocity*9.975,0,0));
      mat4.rotateY(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,degToRad(-counter * 360/cantidadContorno));
      objects[21 + cantidadDecoradores + counter].updateWorldMatrix();
    }
  }

  else {
    for (var counter = 0; counter < cantidadContorno; counter++){
      mat4.scale(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,vec3.fromValues(1,1,0.4));
      mat4.rotateY(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,degToRad(counter * 360/cantidadContorno - 90));
      mat4.translate(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,vec3.fromValues(-horizontalVelocity*50.1,0,0));
      mat4.rotateY(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,degToRad(-counter * 360/cantidadContorno + 90));
      mat4.scale(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,vec3.fromValues(1,1,2.5));
      objects[21 + cantidadDecoradores + counter].updateWorldMatrix();
    }
  }

  distance += 1;
  if (distance > 220) {
    var f6 = gui.addFolder('Resetear escena');
    f6.add(window, "reset").name("Resetear");
    f6.open();
    dat.GUI.toggleHide();
    distance = 0;
    return false;
  }
}
