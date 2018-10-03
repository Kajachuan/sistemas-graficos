function Cilindro(color){
    let cilindro = {};

    cilindro.texture = null;
    cilindro.mMatrix = mat4.create();

    var cilindroGeo = new GeometriaCilindro();
    cilindro.objeto = new Objeto3D(cilindroGeo,color);

    this.initBuffers = function(){
        cilindro.objeto.initBuffers();
    };

    this.draw = function(){
        cilindro.objeto.draw(cilindro.mMatrix);
    };

    this.rotar = function(cuanto,x,y,z){
      cilindro.objeto.rotar(cilindro.mMatrix,cuanto,x,y,z);
    }

    this.trasladar = function(x,y,z){
      cilindro.objeto.trasladar(cilindro.mMatrix,x,y,z);
    }

    this.trasladar2 = function(mMatrix){
      mat4.multiply(cilindro.mMatrix,mMatrix,cilindro.mMatrix);
    }

    this.escalar = function(x,y,z){
      cilindro.objeto.escalar(cilindro.mMatrix,x,y,z);
    }

    this.escalar2 = function(mMatrix){
      mat4.multiply(cilindro.mMatrix,mMatrix,cilindro.mMatrix);
    }
}
