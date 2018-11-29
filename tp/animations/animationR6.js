function station1(){
  mat4.translate(objects[18].localMatrix,objects[18].localMatrix,vec3.fromValues(-horizontalVelocity*ringSpeedFactor,0,0));
  mat4.translate(objects[19].localMatrix,objects[19].localMatrix,vec3.fromValues(-horizontalVelocity,0,0));
  mat4.translate(objects[20].localMatrix,objects[20].localMatrix,vec3.fromValues(-horizontalVelocity*plateSpeedFactor,0,0));
  objects[18].updateWorldMatrix();
  objects[19].updateWorldMatrix();
  objects[20].updateWorldMatrix();
  objects[11].move();
  distance += 1;
  if (distance > 299) {
    distance = 0;
    contador = 0;
    animationLoop(station2);
    return false;
  }
}

function station1HookMoveToDecorator(){
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
    animationLoop(station1HookGrabDecorator);
    return false;
  }
}

function station1HookGrabDecorator(){
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
    animationLoop(station1HookGrabDecorator2);
    return false;
  }
}

function station1HookGrabDecorator2(){
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
    animationLoop(station1HookMoveFromDecorator);
    return false;
  }
}

function station1HookMoveFromDecorator(){
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
    animationLoop(station1HookMoveToDecoratorCorrespondingPosition);
    return false;
  }
}

function station1HookMoveToDecoratorCorrespondingPosition(){
  if (contador === 0) {
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity/2.1,0,verticalVelocity));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*10,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*10,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(verticalVelocity*2.4,0,verticalVelocity*armTubeBoxesSpeedFactor*1.5));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 1){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity/1.15,0,verticalVelocity/1.9));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity*2.1,0,verticalVelocity*2.4));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*21,0,verticalVelocity*2.4));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*21,0,verticalVelocity*2.4));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(verticalVelocity*5.2,0,verticalVelocity*2.4*1.5));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 2){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity*1.05,0,0));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity*2.5,0,0));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*25,0,0));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*25,0,0));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(verticalVelocity*6.3,0,0));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 3){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity/1.15,0,-verticalVelocity/1.9));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity*2.1,0,-verticalVelocity*2.4));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*21,0,-verticalVelocity*2.4));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*21,0,-verticalVelocity*2.4));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(verticalVelocity*5.2,0,-verticalVelocity*2.4*1.5));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 4){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity/2.1,0,-verticalVelocity));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*10,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*10,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(verticalVelocity*2.4,0,-verticalVelocity*armTubeBoxesSpeedFactor*1.5));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 5){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity/2.1,0,-verticalVelocity));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*10,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*10,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(-verticalVelocity*2.4,0,-verticalVelocity*armTubeBoxesSpeedFactor*1.5));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 6){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity/1.15,0,-verticalVelocity/1.9));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity*2.1,0,-verticalVelocity*2.4));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*21,0,-verticalVelocity*2.4));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*21,0,-verticalVelocity*2.4));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(-verticalVelocity*5.2,0,-verticalVelocity*2.4*1.5));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 7){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity*1.05,0,0));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity*2.5,0,0));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*25,0,0));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*25,0,0));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(-verticalVelocity*6.3,0,0));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 8){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity/1.15,0,verticalVelocity/1.9));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity*2.1,0,verticalVelocity*2.4));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*21,0,verticalVelocity*2.4));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*21,0,verticalVelocity*2.4));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(-verticalVelocity*5.2,0,verticalVelocity*2.4*1.5));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  } else if(contador === 9){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity/2.1,0,verticalVelocity));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*10,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*10,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(-verticalVelocity*2.4,0,verticalVelocity*armTubeBoxesSpeedFactor*1.5));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
    objects[21 + contador].updateWorldMatrix();
  }
  distance += 1;
  if (distance > 18) {
    distance = 0;
    animationLoop(station1HookDeployDecorator);
    return false;
  }
}

function station1HookDeployDecorator(){
  mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,-verticalVelocity / 2.94,0));
  mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 1.0084, 1));
  mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,-verticalVelocity*4*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[21 + contador].localMatrix,objects[21 + contador].localMatrix,vec3.fromValues(0,-verticalVelocity*armTubeBoxesSpeedFactor,0));
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  objects[21 + contador].updateWorldMatrix();
  distance += 1;
  if (distance > 38) {
    distance = 0;
    animationLoop(station1HookDeployDecorator2);
    return false;
  }
}

function station1HookDeployDecorator2(){
  mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(0,verticalVelocity / 2.8,0));
  mat4.scale(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix, vec3.fromValues(1, 0.991, 1));
  mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(0,verticalVelocity*4*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor,0));
  mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(0,verticalVelocity*armTubeBoxesSpeedFactor,0));
  objects[offset + 1].updateWorldMatrix();
  objects[offset + 2].updateWorldMatrix();
  objects[offset + 3].updateWorldMatrix();
  objects[offset + 4].updateWorldMatrix();
  distance += 1;
  if (distance > 38) {
    distance = 0;
    animationLoop(station1HookMoveGoBackFromCorrespondingPosition);
    return false;
  }
}

function station1HookMoveGoBackFromCorrespondingPosition(){
  if (contador === 0) {
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity/2.1,0,-verticalVelocity));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*10,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*10,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 1){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity/1.15,0,-verticalVelocity/1.9));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity*2.1,0,-verticalVelocity*2.4));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*21,0,-verticalVelocity*2.4));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*21,0,-verticalVelocity*2.4));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 2){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity*1.05,0,0));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity*2.5,0,0));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*25,0,0));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*25,0,0));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 3){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity/1.15,0,verticalVelocity/1.9));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity*2.1,0,verticalVelocity*2.4));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*21,0,verticalVelocity*2.4));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*21,0,verticalVelocity*2.4));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 4){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(-verticalVelocity/2.1,0,verticalVelocity));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(-verticalVelocity,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(-verticalVelocity*10,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(-verticalVelocity*10,0,verticalVelocity*armTubeBoxesSpeedFactor));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 5){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity/2.1,0,verticalVelocity));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*10,0,verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*10,0,verticalVelocity*armTubeBoxesSpeedFactor));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 6){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity/1.15,0,verticalVelocity/1.9));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity*2.1,0,verticalVelocity*2.4));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*21,0,verticalVelocity*2.4));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*21,0,verticalVelocity*2.4));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 7){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity*1.05,0,0));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity*2.5,0,0));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*25,0,0));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*25,0,0));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 8){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity/1.15,0,-verticalVelocity/1.9));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity*2.1,0,-verticalVelocity*2.4));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*21,0,-verticalVelocity*2.4));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*21,0,-verticalVelocity*2.4));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  } else if(contador === 9){
    mat4.translate(objects[offset + 1].localMatrix,objects[offset + 1].localMatrix,vec3.fromValues(verticalVelocity/2.1,0,-verticalVelocity));
    mat4.translate(objects[offset + 2].localMatrix,objects[offset + 2].localMatrix,vec3.fromValues(verticalVelocity,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 3].localMatrix,objects[offset + 3].localMatrix,vec3.fromValues(verticalVelocity*10,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    mat4.translate(objects[offset + 4].localMatrix,objects[offset + 4].localMatrix,vec3.fromValues(verticalVelocity*10,0,-verticalVelocity*armTubeBoxesSpeedFactor));
    objects[offset + 1].updateWorldMatrix();
    objects[offset + 2].updateWorldMatrix();
    objects[offset + 3].updateWorldMatrix();
    objects[offset + 4].updateWorldMatrix();
  }
  distance += 1;
  if (distance > 18) {
    distance = 0;
    if(contador < (cantidadDecoradores-1)){
      contador += 1;
      animationLoop(station1HookMoveToDecorator);
    } else {
      animationLoop(station2);
    }
    return false;
  }
}

function station2(){
  mat4.translate(objects[18].localMatrix,objects[18].localMatrix,vec3.fromValues(-horizontalVelocity*ringSpeedFactor,0,0));
  mat4.translate(objects[19].localMatrix,objects[19].localMatrix,vec3.fromValues(-horizontalVelocity,0,0));
  mat4.translate(objects[20].localMatrix,objects[20].localMatrix,vec3.fromValues(-horizontalVelocity*plateSpeedFactor,0,0));
  objects[18].updateWorldMatrix();
  objects[19].updateWorldMatrix();
  objects[20].updateWorldMatrix();
  objects[11].move();
  for (var counter = 0; counter < cantidadDecoradores; counter++){
    mat4.translate(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,vec3.fromValues(-horizontalVelocity*10.075,0,0));
    objects[21 + counter].updateWorldMatrix();
  }
  distance += 1;
  if (distance > 277) {
    distance = 0;
    c = 0;
    animationLoop(station2DeployContorno);
    return false;
  }
}

function station2DeployContorno(){
  mat4.scale(objects[16].localMatrix,objects[16].localMatrix, vec3.fromValues(1, 1, 1.028));
  mat4.translate(objects[17].localMatrix,objects[17].localMatrix,vec3.fromValues(0,0,horizontalVelocity*11));
  mat4.translate(objects[21 + cantidadDecoradores + c].localMatrix,objects[21 + cantidadDecoradores + c].localMatrix,vec3.fromValues(0,0,horizontalVelocity*11.5));
  objects[16].updateWorldMatrix();
  objects[17].updateWorldMatrix();
  objects[21 + cantidadDecoradores + c].updateWorldMatrix();
  distance += 1;
  if (distance > 30) {
    distance = 0;
    animationLoop(station2DeployContorno2);
    return false;
  }
}

function station2DeployContorno2(){
  mat4.scale(objects[16].localMatrix,objects[16].localMatrix, vec3.fromValues(1, 1, 0.97274));
  mat4.translate(objects[17].localMatrix,objects[17].localMatrix,vec3.fromValues(0,0,-horizontalVelocity*11));
  objects[16].updateWorldMatrix();
  objects[17].updateWorldMatrix();
  distance += 1;
  if (distance > 30) {
    distance = 0;
    animationLoop(station2RotateCakeAndContornos);
    return false;
  }
}

function degToRad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function station2RotateCakeAndContornos(){
  if(c < cantidadContorno){
    var degreesToMove = degToRad(1);

    for (var j = 0; j < c ; j++){
      mat4.translate(objects[21 + cantidadDecoradores + c].localMatrix,objects[21 + cantidadDecoradores + c].localMatrix,vec3.fromValues(-0.19,0,0.01));
      mat4.rotate(objects[21 + cantidadDecoradores + c].localMatrix,objects[21 + cantidadDecoradores + c].localMatrix,degreesToMove,vec3.fromValues(0,1,0));
    }
    mat4.rotate(objects[18].localMatrix,objects[18].localMatrix,degreesToMove,vec3.fromValues(0,1,0));
    mat4.rotate(objects[19].localMatrix,objects[19].localMatrix,degreesToMove,vec3.fromValues(0,1,0));
    mat4.rotate(objects[20].localMatrix,objects[20].localMatrix,degreesToMove,vec3.fromValues(0,1,0));
    objects[18].updateWorldMatrix();
    objects[19].updateWorldMatrix();
    objects[20].updateWorldMatrix();
    objects[21 + cantidadDecoradores + c].updateWorldMatrix();
  }
  distance += 1;
  if (distance > ((360/cantidadContorno) - 1)) {
    distance = 0;
    if (c < (cantidadContorno - 1)){
      c += 1;
      animationLoop(station2DeployContorno);
    } else {
      animationLoop(bandFinal);
    }
    return false;
  }
}

function bandFinal(){
  mat4.translate(objects[18].localMatrix,objects[18].localMatrix,vec3.fromValues(-horizontalVelocity*ringSpeedFactor,0,0));
  mat4.translate(objects[19].localMatrix,objects[19].localMatrix,vec3.fromValues(-horizontalVelocity,0,0));
  mat4.translate(objects[20].localMatrix,objects[20].localMatrix,vec3.fromValues(-horizontalVelocity*plateSpeedFactor,0,0));
  objects[18].updateWorldMatrix();
  objects[19].updateWorldMatrix();
  objects[20].updateWorldMatrix();
  objects[11].move();
  for (var counter = 0; counter < cantidadDecoradores; counter++){
    mat4.translate(objects[21 + counter].localMatrix,objects[21 + counter].localMatrix,vec3.fromValues(-horizontalVelocity*10.075,0,0));
    objects[21 + counter].updateWorldMatrix();
  }
/*
  for (var counter = 0; counter < cantidadContorno; counter++){
    mat4.translate(objects[21 + cantidadDecoradores + counter].localMatrix,objects[21 + cantidadDecoradores + counter].localMatrix,vec3.fromValues(-horizontalVelocity*10.075,0,0));
    objects[21 + cantidadDecoradores + counter].updateWorldMatrix();
  }*/
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
