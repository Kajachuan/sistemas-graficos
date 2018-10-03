function Barco(color){
    let barco = {};

    barco.texture = null;
    barco.mMatrix = mat4.create();

    var y1 = 0;
    var y2 = 1.75;
    var y3 = 3;
    var y4 = 5;

    var puntosDeControl=[ [0.5,y1,-1.969] , [1.5,y1,-3] , [2.5,y1,-4.5] , [6,y1,-5],
                          [0.5,y2,-2] , [1.5,y2,-4.5] , [2.5,y2,-5.5] , [6,y2,-5.5]];

    var puntosDeControl2=[ [0.5,y1,1.969] , [1.5,y1,3] , [2.5,y1,4.5] , [6,y1,5],
                          [0.5,y2,2] , [1.5,y2,4.5] , [2.5,y2,5.5] , [6,y2,6]];

    var puntosDeControl3=[ [5.5,y1,5], [15,y1,5], [23,y1,5], [25,y1,5],
                          [5.5,y2,4.5] , [15,y2,4.5] , [23,y2,4.5] , [25,y2,4.5]];

    var puntosDeControl4=[ [5.5,y1,4.5], [15,y1,4.5], [20,y1,4.5], [25,y1,4.5],
                          [5.5,y2,5.5] , [15,y2,5.5] , [20,y2,5.5] , [25,y2,5.5]];

    var puntosDeControl5=[ [6.5,y1,-1.969] , [6.5,y1,-3] , [7.5,y1,-4.5] , [9,y1,-5],
                          [5.5,y2,-2] , [6.5,y2,-4.5] , [7.5,y2,-5.5] , [9,y2,-6]];

    var puntosDeControl6=[ [-6.5,y1,-1.969] , [-6.5,y1,-3] , [-7.5,y1,-4.5] , [-9,y1,-5],
                          [-5.5,y2,-2] , [-6.5,y2,-4.5] , [-7.5,y2,-5.5] , [-9,y2,-5.5]];

    var puntosDeControl7=[ [5.5,1.5,11.75], [15,1.5,11.75], [23,1.5,11.75], [25,1.5,11.75],
                          [5.5,1.51,4.5] , [15,1.51,4.5] , [23,1.51,4.5] , [25,1.51,4.5]];

    var puntosDeControl8=[ [0.85,1.5,2] , [1.5,1.5,2] , [2.5,1.5,2] , [6,1.5,2],
                          [0.85,1.51,2] , [1.65,1.51,4.5] , [4,1.51,5.5] , [6,1.51,5.8]];

    var puntosDeControl9=[ [0.85,1.5,-2] , [1.5,1.5,-2] , [2.5,1.5,-2] , [6,1.5,-2],
                          [0.85,1.51,-2] , [1.65,1.51,-4.5] , [4,1.51,-5.5] , [6,1.51,-5.38]];

    var puntosDeControl10=[ [-6.5,1.5,-2] , [-6.5,1.5,-2] , [-7.5,1.5,-2] , [-9,1.5,-2],
                          [-5.65,1.51,-2] , [-6.5,1.51,-4.25] , [-7.5,1.51,-5] , [-9,1.51,-5.5]];

    var puntosDeControl11=[ [-6.5,1.5,2] , [-6.5,1.5,2] , [-7.5,1.5,2] , [-9,1.5,2],
                          [-5.65,1.51,2] , [-6.5,1.51,4.25] , [-7.5,1.51,5.25] , [-9,1.51,5.85]];

    var curvaBezier = new CurvaBezier();
    var barcoGeo = new GeometriaContenedor();
    barco.objeto = new Objeto3D(barcoGeo,color);

    var curva1 = new Curva(puntosDeControl,curvaBezier,color);
    var curva2 = new Curva(puntosDeControl2,curvaBezier,color);
    var curva3 = new Curva(puntosDeControl3,curvaBezier,color);
    var curva4 = new Curva(puntosDeControl4,curvaBezier,color);
    var curva5 = new Curva(puntosDeControl5,curvaBezier,color);
    var curva6 = new Curva(puntosDeControl6,curvaBezier,color);
    var tapa1 = new Curva(puntosDeControl7,curvaBezier,color);
    var tapa2 = new Curva(puntosDeControl8,curvaBezier,color);
    var tapa3 = new Curva(puntosDeControl9,curvaBezier,color);
    var tapa4 = new Curva(puntosDeControl10,curvaBezier,color);
    var tapa5 = new Curva(puntosDeControl11,curvaBezier,color);
    var control1 = new Caja(3,1.5,0.75,cremeColor);
    var control2 = new Caja(3.5,0.5,0.75,cremeColor);

    curva1.rotar(degToRad(90.0),0,1,0);
    curva2.trasladar(-4,0,0);
    curva2.rotar(degToRad(90.0),0,1,0);
    curva3.trasladar(-10,0,0.3);
    curva3.rotar(degToRad(90.0),0,1,0);
    curva4.trasladar(-3.55,0,0.3);
    curva4.rotar(degToRad(90.0),0,1,0);
    curva5.trasladar(-4,0,-33.275);
    curva5.rotar(degToRad(-90.0),0,1,0);
    curva6.trasladar(0,0,-33.275);
    curva6.rotar(degToRad(90.0),0,1,0);
    tapa1.trasladar(-9.925,0,0.3);
    tapa1.rotar(degToRad(90.0),0,1,0);
    tapa2.trasladar(-4,0,0.3);
    tapa2.rotar(degToRad(90.0),0,1,0);
    tapa3.trasladar(0,0,0.3);
    tapa3.rotar(degToRad(90.0),0,1,0);
    tapa4.trasladar(0,0,-33.275);
    tapa4.rotar(degToRad(90.0),0,1,0);
    tapa5.trasladar(-4,0,-33.275);
    tapa5.rotar(degToRad(90.0),0,1,0);
    control1.trasladar(-1.75,1.51,-23);
    control1.initValues();
    control2.trasladar(-1.75,4.51,-23);
    control2.initValues();

    barco.objeto.agregarHijo(curva1);
    barco.objeto.agregarHijo(curva2);
    barco.objeto.agregarHijo(curva3);
    barco.objeto.agregarHijo(curva4);
    barco.objeto.agregarHijo(curva5);
    barco.objeto.agregarHijo(curva6);
    barco.objeto.agregarHijo(tapa1);
    barco.objeto.agregarHijo(tapa2);
    barco.objeto.agregarHijo(tapa3);
    barco.objeto.agregarHijo(tapa4);
    barco.objeto.agregarHijo(tapa5);
    barco.objeto.agregarHijo(control1);
    barco.objeto.agregarHijo(control2);


    this.initBuffers = function(){
        barco.objeto.initBuffers();
    };

    this.draw = function(){
        barco.objeto.draw(barco.mMatrix);
    };

    this.rotar = function(cuanto,x,y,z){
      barco.objeto.rotar(barco.mMatrix,cuanto,x,y,z);
    }

    this.trasladar = function(x,y,z){
      mat4.identity(barco.mMatrix);
      barco.objeto.trasladar(barco.mMatrix,x,y,z);
      this.trasladar2(mat4.clone(barco.mMatrix));
    }

    this.trasladar2 = function(mMatrix){
      mat4.identity(barco.mMatrix);
      mat4.multiply(barco.mMatrix,mMatrix,barco.mMatrix);
      barco.objeto.trasladarHijos(barco.mMatrix);
    }

    this.escalar = function(x,y,z){
      barco.objeto.escalar(barco.mMatrix,x,y,z);
    }

    this.escalar2 = function(mMatrix){
      mat4.multiply(barco.mMatrix,mMatrix,barco.mMatrix);
    }
}
