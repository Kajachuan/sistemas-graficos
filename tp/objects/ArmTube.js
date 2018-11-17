function ArmTube() {
  this.ka = [0,0,0];
  this.kd = [0.3,0.3,0.3];
  this.ks = [0,0,0];
  this.gloss = 3;
  this.texture = null;

  this.texture_coord_buffer = [];

  for(var i = 0; i < 14; i++) {
    this.texture_coord_buffer.push(0, 0);
  }

  this.initReflectMap();
  Tube.call(this);
}

ArmTube.prototype = Object.create(Tube.prototype);
