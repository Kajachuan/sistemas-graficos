function Cables(){

    let cables = {};

    cables.texture = null;
    cables.mMatrix = mat4.create();

    var contenedorGeo = new GeometriaContenedor();
    cables.objeto = new Objeto3D(contenedorGeo,darkGreyColor);

    var paddingX = 17.0;
    var paddingZ = 2.25;

    var cable1 = new Cilindro(blackColor);
    var cable2 = new Cilindro(blackColor);
    var cable3 = new Cilindro(blackColor);
    var cable4 = new Cilindro(blackColor);

    cable1.trasladar(paddingX-4.85,6.575,paddingZ+0.69);
    cable1.escalar(0.02,1.75,0.02);

    cable2.trasladar(paddingX-5.05,6.575,paddingZ+0.69);
    cable2.escalar(0.02,1.75,0.02);

    cable3.trasladar(paddingX-4.85,6.575,paddingZ-0.69);
    cable3.escalar(0.02,1.75,0.02);

    cable4.trasladar(paddingX-5.05,6.575,paddingZ-0.69);
    cable4.escalar(0.02,1.75,0.02);

    cables.objeto.agregarHijo(cable1);
    cables.objeto.agregarHijo(cable2);
    cables.objeto.agregarHijo(cable3);
    cables.objeto.agregarHijo(cable4);

    this.initBuffers = function(){
        cables.objeto.initBuffers();
    };

    this.draw = function(){
        cables.objeto.draw(cables.mMatrix);
    };

    this.trasladar2 = function(mMatrix){
      mat4.identity(cables.mMatrix);
      mat4.multiply(cables.mMatrix,mMatrix,cables.mMatrix);
      cables.objeto.trasladarHijos(cables.mMatrix);
    }

    this.trasladar = function(x,y,z){
      mat4.identity(cables.mMatrix);
      cables.objeto.trasladar(cables.mMatrix,x,y,z);
      this.trasladar2(mat4.clone(cables.mMatrix));
    }

    this.escalar2 = function(mMatrix){
      mat4.identity(cables.mMatrix);
      mat4.multiply(cables.mMatrix,mMatrix,cables.mMatrix);
      cables.objeto.escalarHijos(cables.mMatrix);
    }

    this.escalar = function(x,y,z){
      mat4.identity(cables.mMatrix);
      cables.objeto.escalar(cables.mMatrix,x,y,z);
      this.escalar2(mat4.clone(cables.mMatrix));
    }
}
