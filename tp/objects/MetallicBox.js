function MetallicBox() {
  this.ka = [0,0,0];
  this.kd = [0.3,0.3,0.3];
  this.ks = [0,0,0];
  this.gloss = 2;

  this.texture_coord_buffer = [0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0,
                               0,0, 0,0, 0,0, 0,0];

  this.initReflectMap();
  AbstractBox.call(this);
}

MetallicBox.prototype = Object.create(AbstractBox.prototype);
