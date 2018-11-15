function Candy(r, g, b) {
  this.ka = [0.1,0,0];
  this.kd = [r,g,b];
  this.ks = [1,1,1];
  this.gloss = 20;
  this.texture = null;

  this.texture_coord_buffer = [];

  this.texture_coord_buffer.push(0, 1);
  this.texture_coord_buffer.push(0, 0.975);
  this.texture_coord_buffer.push(0, 0.975);
  this.texture_coord_buffer.push(0, 0.95);
  this.texture_coord_buffer.push(0, 0.95);
  this.texture_coord_buffer.push(0, 0.925);
  this.texture_coord_buffer.push(0, 0.925);
  this.texture_coord_buffer.push(0, 0.075);
  this.texture_coord_buffer.push(0, 0.075);
  this.texture_coord_buffer.push(0, 0.05);
  this.texture_coord_buffer.push(0, 0.05);
  this.texture_coord_buffer.push(0, 0.025);
  this.texture_coord_buffer.push(0, 0.025);
  this.texture_coord_buffer.push(0, 0);

  Tube.call(this, r, g, b);
}

Candy.prototype = Object.create(Tube.prototype);
