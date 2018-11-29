function DulceDeLecheRing(turns) {
  this.ka = [0.025,0.025,0.025];
  this.kd = [0.439,0.169,0.039];
  this.ks = [1,1,1];
  this.gloss = 50;

  Ring.call(this, turns);
}

DulceDeLecheRing.prototype = Object.create(Ring.prototype);
