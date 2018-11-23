function ChocolateBell(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [0.259,0.141,0.098];
  this.ks = [0.25,0.25,0.25];
  this.gloss = 25;

  Bell.call(this);
}

ChocolateBell.prototype = Object.create(Bell.prototype);
