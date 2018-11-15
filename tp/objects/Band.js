function Band(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [r,g,b];
  this.ks = [0,0,0];
  this.gloss = 1;
  this.texture = null;

  this.texture_coord_buffer = [0,1,       0.055,1,   0.055,0,   0,0,
                               0,0.012,       0,0,       2,0,   2,0.012,
                               0,0,           2,0,       2,1,   0,1,
                               2,0.012,       0,0.012,   0,0,   2,0,
                               0,1,           2,1,       2,0,   0,0,
                               0,1,       0.055,1,   0.055,0,   0,0];

  AbstractBox.call(this, r, g, b);
}

Band.prototype = Object.create(AbstractBox.prototype);

Band.prototype.move = function() {
  this.texture_coord_buffer[16] -= 0.001;
  this.texture_coord_buffer[18] -= 0.001;
  this.texture_coord_buffer[20] -= 0.001;
  this.texture_coord_buffer[22] -= 0.001;

  this.texture_coord_buffer[40] += 0.001;
  this.texture_coord_buffer[42] += 0.001;
  this.texture_coord_buffer[44] += 0.001;
  this.texture_coord_buffer[46] += 0.001;
  this.setupWebGLBuffers();
}
