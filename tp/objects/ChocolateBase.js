function ChocolateBase(rad, cycles, h, amp) {
  this.ka = [0,0,0];
  this.ks = [1,1,1];
  this.gloss = 1;

  this.initTexture("maps/chocolate.jpg");
  this.initSpecularMap("maps/chocolate-especular.jpg");
  Base.call(this, rad, cycles, h, amp);
}

ChocolateBase.prototype = Object.create(Base.prototype);
