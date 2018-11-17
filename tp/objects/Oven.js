function Oven() {
  this.ka = [0,0,0];
  this.kd = [0,0,0];
  this.ks = [0,0,0];
  this.gloss = 1;

  this.texture_coord_buffer = [0.697,1,      0.394,1,      0.394,0.49,   0.697,0.49,
                               0.697,1,      0.697,0.49,       1,0.49,       1,1,
                               0.394,0.49,       0,0.49,       0,0,      0.394,0,
                               0.394,1,          0,1,          0,0.49,   0.394,0.49,
                                   1,0.49,   0.697,0.49,   0.697,0,          1,0,
                               0.697,0,      0.697,0.49,   0.394,0.49,   0.394,0];
  this.initTexture("maps/horno.jpg");
  this.initReflectMap();
  this.initSpecularMap("maps/horno-especular.jpg");
  AbstractBox.call(this);
}

Oven.prototype = Object.create(AbstractBox.prototype);
