function WhiteChocolateBell(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [0.976,0.89,0.745];
  this.ks = [0.25,0.25,0.25];
  this.gloss = 25;

  Bell.call(this);
}

WhiteChocolateBell.prototype = Object.create(Bell.prototype);
