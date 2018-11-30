function Wafer() {
  this.ka = [0,0,0];
  this.kd = [0,0,0];
  this.ks = [0,0,0];
  this.gloss = 1;

  this.texture_coord_buffer = [    1,1,   0.813,1,      0.813,0,          1,0,
                               0.813,1,       0,1,          0,0,      0.813,0,
                                   1,0,       1,0.25,   0.813,0.25,   0.813,0,
                               0.813,1,       0,1,          0,0,      0.813,0,
                                   1,0,       1,0.25,   0.813,0.25,   0.813,0,
                               0.813,1,   0.813,0,          1,0,          1,1];

  this.initTexture("maps/oblea.jpg");
  Box.call(this);
}

Wafer.prototype = Object.create(Box.prototype);
