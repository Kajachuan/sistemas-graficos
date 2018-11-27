function Plum() {
  this.ka = [0,0,0];
  this.kd = [0.435,0.024,0.012];
  this.ks = [0.75,0.75,0.75];
  this.gloss = 20;

  Ball.call(this);
}

Plum.prototype = Object.create(Ball.prototype);
