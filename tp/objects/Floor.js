function Floor() {
  this.ka = [0.05,0.05,0.05];
  this.kd = [0,0,0];
  this.ks = [0,0,0];
  this.gloss = 1;

  this.texture_coord_buffer = [1,1,   0,1,   0,0,   1,0,
                               1,1,   0,1,   0,0,   1,0,
                               8,8,   0,8,   0,0,   8,0,
                               1,1,   0,1,   0,0,   1,0,
                               1,1,   0,1,   0,0,   1,0,
                               1,1,   0,1,   0,0,   1,0];

  this.initTexture("maps/piso.jpg");
  AbstractBox.call(this);
}

Floor.prototype = Object.create(AbstractBox.prototype);
