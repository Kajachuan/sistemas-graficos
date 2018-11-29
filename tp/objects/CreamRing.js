function CreamRing(turns) {
  this.ka = [0.2,0.2,0.2];
  this.kd = [0.871,0.863,0.812];
  this.ks = [0,0,0];
  this.gloss = 1;

  Ring.call(this, turns);
}

CreamRing.prototype = Object.create(Ring.prototype);
