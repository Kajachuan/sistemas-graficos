function Caja(ancho, alto, largo, color){
    let caja = {};

    caja.ancho = ancho;
    caja.largo = largo;
    caja.alto = alto;
    caja.texture = null;
    caja.mMatrix = mat4.create();

    caja.posX = 0;
    caja.posY = caja.alto;
    caja.posZ = 0;

    var cubo = new GeometriaCubo();
    caja.objeto = new Objeto3D(cubo,color);

    this.initBuffers = function(){
        caja.objeto.initBuffers();
    };

    this.initValues = function(){
      caja.objeto.trasladar(caja.mMatrix,0.0,caja.alto,0.0);
      caja.objeto.escalar(caja.mMatrix,caja.ancho,caja.alto,caja.largo);
    }

    this.draw = function(){
        caja.objeto.draw(caja.mMatrix);
    };

    this.rotar = function(cuanto,x,y,z){
      caja.objeto.rotar(caja.mMatrix,cuanto,x,y,z);
    }

    this.trasladar = function(x,y,z){
      caja.posX += x;
      caja.posY += y;
      caja.posZ += z;
      caja.objeto.trasladar(caja.mMatrix,x,y,z);
    }

    this.trasladar2 = function(mMatrix){
      var translation = vec3.create();
      mat4.getTranslation(translation,mMatrix);
      caja.posX += translation[0];
      caja.posY += translation[1];
      caja.posZ += translation[2];
      mat4.multiply(caja.mMatrix,mMatrix,caja.mMatrix);
    }

    this.escalar = function(x,y,z){
      caja.objeto.escalar(caja.mMatrix,x,y,z);
    }


    this.getPosX = function(){
      return caja.posX;
    }

    this.getPosY = function(){
      return caja.posY;
    }

    this.getPosZ = function(){
      return caja.posZ;
    }
}
