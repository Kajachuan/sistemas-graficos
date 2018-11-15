function Oven(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [r,g,b];
  this.ks = [0,0,0];
  this.gloss = 1;
  this.texture = null;

  this.texture_coord_buffer = [0.697,1,      0.394,1,      0.394,0.49,   0.697,0.49,
                               0.697,1,      0.697,0.49,       1,0.49,       1,1,
                               0.394,0.49,       0,0.49,       0,0,      0.394,0,
                               0.394,1,          0,1,          0,0.49,   0.394,0.49,
                                   1,0.49,   0.697,0.49,   0.697,0,          1,0,
                               0.697,0,      0.697,0.49,   0.394,0.49,   0.394,0];
  AbstractBox.call(this, r, g, b);
}

Oven.prototype = Object.create(AbstractBox.prototype);
