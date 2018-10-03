function Pinzas(){

    let pinzas = {};

    pinzas.texture = null;
    pinzas.mMatrix = mat4.create();

    var contenedorGeo = new GeometriaContenedor();

    pinzas.objeto = new Objeto3D(contenedorGeo,darkGreyColor);

    var paddingX = 12;
    var paddingZ = 2.95;

    var h1 = new Caja(1,1,1,darkGreyColor);
    var h2 = new Caja(1,1,1,darkGreyColor);
    var v1 = new Caja(1,1,1,darkGreyColor);
    var v2 = new Caja(1,1,1,darkGreyColor);
    var v3 = new Caja(1,1,1,darkGreyColor);
    var v4 = new Caja(1,1,1,darkGreyColor);

    h1.trasladar(paddingX,5.7,paddingZ);
    h1.escalar(0.6,0.01,0.05);

    h2.trasladar(paddingX,5.7,paddingZ-1.38);
    h2.escalar(0.6,0.01,0.05);

    v1.trasladar(paddingX-0.59,5.65,paddingZ);
    v1.escalar(0.01,0.05,0.05);

    v2.trasladar(paddingX+0.59,5.65,paddingZ);
    v2.escalar(0.01,0.05,0.05);

    v3.trasladar(paddingX+0.59,5.65,paddingZ-1.38);
    v3.escalar(0.01,0.05,0.05);

    v4.trasladar(paddingX-0.59,5.65,paddingZ-1.38);
    v4.escalar(0.01,0.05,0.05);

    pinzas.posX = paddingX;
    pinzas.posY = 5.7;
    pinzas.posZ = paddingZ-0.69;

    pinzas.objeto.agregarHijo(h1);
    pinzas.objeto.agregarHijo(h2);
    pinzas.objeto.agregarHijo(v1);
    pinzas.objeto.agregarHijo(v2);
    pinzas.objeto.agregarHijo(v3);
    pinzas.objeto.agregarHijo(v4);

    this.initBuffers = function(){
        pinzas.objeto.initBuffers();
    };

    this.draw = function(){
        pinzas.objeto.draw(pinzas.mMatrix);
    };

    this.trasladar2 = function(mMatrix){

      var translation = vec3.create();
      mat4.getTranslation(translation,mMatrix);
      pinzas.posX += translation[0];
      pinzas.posY += translation[1];
      pinzas.posZ += translation[2];

      mat4.identity(pinzas.mMatrix);
      mat4.multiply(pinzas.mMatrix,mMatrix,pinzas.mMatrix);
      pinzas.objeto.trasladarHijos(pinzas.mMatrix);
    }

    this.trasladar = function(x,y,z){

      mat4.identity(pinzas.mMatrix);
      pinzas.objeto.trasladar(pinzas.mMatrix,x,y,z);
      this.trasladar2(mat4.clone(pinzas.mMatrix));
    }

    this.noTienenNadaAgarrado = function(){
      return (pinzas.objeto.getHijosSize() == 6);
    }

    this.tieneContenedorAlAlcance = function(caja){
      return ((Math.abs(pinzas.posX - caja.getPosX()) < 0.1)
      && (Math.abs(pinzas.posY - caja.getPosY()) < 0.55)
      && (Math.abs(pinzas.posZ - caja.getPosZ()) < 0.5));
    }

    this.agarrarContenedor = function(caja){
      pinzas.objeto.agregarHijo(caja);
    }

    this.dejarContenedor = function(){
      pinzas.objeto.retirarUltimoHijo();
    }

    this.getPosX = function(){
      return pinzas.posX;
    }
    this.getPosY = function(){
      return pinzas.posY;
    }
    this.getPosZ = function(){
      return pinzas.posZ;
    }
}
