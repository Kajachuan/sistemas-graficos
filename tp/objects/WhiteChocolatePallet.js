function WhiteChocolatePallet(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [0.976,0.89,0.745];
  this.ks = [0.25,0.25,0.25];
  this.gloss = 25;

  Pallet.call(this);
}

WhiteChocolatePallet.prototype = Object.create(Pallet.prototype);
