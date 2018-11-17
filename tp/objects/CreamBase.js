function CreamBase(rad, cycles, h, amp) {
  this.ka = [0,0,0];
  this.ks = [0,0,0];
  this.gloss = 1;

  this.initTexture("maps/crema.jpg");
  Base.call(this, rad, cycles, h, amp);
}

CreamBase.prototype = Object.create(Base.prototype);
