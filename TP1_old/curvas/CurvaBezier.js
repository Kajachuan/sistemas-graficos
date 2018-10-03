function CurvaBezier(){

  let bezier = {};

  this.base0=function(u) { return (1-u)*(1-u)*(1-u);}
  this.base1=function(u) { return 3*(1-u)*(1-u)*u; }
  this.base2=function(u) { return 3*(1-u)*u*u;}
  this.base3=function(u) { return u*u*u; }

  this.curvaCubica = function (u,puntosDeControl){

		var p0=puntosDeControl[0];
		var p1=puntosDeControl[1];
		var p2=puntosDeControl[2];
		var p3=puntosDeControl[3];

		var punto = new Object();

		punto.x=this.base0(u)*p0[0]+this.base1(u)*p1[0]+this.base2(u)*p2[0]+this.base3(u)*p3[0];
    	punto.y=p0[1];
		punto.z=this.base0(u)*p0[2]+this.base1(u)*p1[2]+this.base2(u)*p2[2]+this.base3(u)*p3[2];

		return punto;
	}
}
