function Curva(puntosDeControl,tipoCurva,color){
    let curva = {};

    curva.texture = null;
    curva.mMatrix = mat4.create();

    var curvaGeo = new GeometriaCurva(puntosDeControl,tipoCurva);
    curva.objeto = new Objeto3D(curvaGeo,color);

    this.initBuffers = function(){
        curva.objeto.initBuffers();
    };

    this.draw = function(){
        curva.objeto.draw(curva.mMatrix);
    };

    this.rotar = function(cuanto,x,y,z){
      curva.objeto.rotar(curva.mMatrix,cuanto,x,y,z);
    }

    this.trasladar = function(x,y,z){
      curva.objeto.trasladar(curva.mMatrix,x,y,z);
    }

    this.trasladar2 = function(mMatrix){
      mat4.multiply(curva.mMatrix,mMatrix,curva.mMatrix);
    }

    this.escalar = function(x,y,z){
      curva.objeto.escalar(curva.mMatrix,x,y,z);
    }
}
