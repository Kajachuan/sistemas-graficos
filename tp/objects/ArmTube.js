function ArmTube(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [r,g,b];
  this.ks = [0,0,0];
  this.gloss = 3;
  this.texture = null;

  this.texture_coord_buffer = [];

  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);
  this.texture_coord_buffer.push(0, 0);

  Tube.call(this, r, g, b);
}

ArmTube.prototype = Object.create(Tube.prototype);
