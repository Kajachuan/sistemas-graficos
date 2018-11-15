function Box(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [r,g,b];
  this.ks = [0,0,0];
  this.gloss = 1;
  this.texture = null;

  this.texture_coord_buffer = [0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0];

  AbstractBox.call(this, r, g, b);
}

Box.prototype = Object.create(AbstractBox.prototype);
