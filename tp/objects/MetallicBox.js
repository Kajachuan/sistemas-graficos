function MetallicBox(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [r, g, b];
  this.ks = [0,0,0];
  this.gloss = 2;

  this.texture_coord_buffer = [0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0];

  this.initReflectMap();
  Box.call(this);
}

MetallicBox.prototype = Object.create(Box.prototype);
