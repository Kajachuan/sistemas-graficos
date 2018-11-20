function Band() {
  this.ka = [0,0,0];
  this.kd = [0,0,0];
  this.ks = [0,0,0];
  this.gloss = 1;

  this.texture_coord_buffer = [0,1,       0.055,1,   0.055,0,   0,0,
                               0,0.012,       0,0,       2,0,   2,0.012,
                               0,0,           2,0,       2,1,   0,1,
                               2,0.012,       0,0.012,   0,0,   2,0,
                               0,1,           2,1,       2,0,   0,0,
                               0,1,       0.055,1,   0.055,0,   0,0];

  this.initTexture("maps/cinta.jpg");
  this.initReflectMap();
  AbstractBox.call(this);
}

Band.prototype = Object.create(AbstractBox.prototype);

Band.prototype.move = function() {
  this.texture_coord_buffer[16] -= horizontalVelocity * bandSpeedFactor;
  this.texture_coord_buffer[18] -= horizontalVelocity * bandSpeedFactor;
  this.texture_coord_buffer[20] -= horizontalVelocity * bandSpeedFactor;
  this.texture_coord_buffer[22] -= horizontalVelocity * bandSpeedFactor;

  this.texture_coord_buffer[40] += horizontalVelocity * bandSpeedFactor;
  this.texture_coord_buffer[42] += horizontalVelocity * bandSpeedFactor;
  this.texture_coord_buffer[44] += horizontalVelocity * bandSpeedFactor;
  this.texture_coord_buffer[46] += horizontalVelocity * bandSpeedFactor;
  this.setupWebGLBuffers();
}
