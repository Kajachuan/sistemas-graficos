function Isla(color){
    let isla = {};

    isla.texture = null;
    isla.mMatrix = mat4.create();

    var y1 = 1;
    var y2 = 1.75;
    var y3 = 3;

    var puntosDeControl = [];

    var puntosDeControl2=[/*[3,0,3] , [10,16,3] , [20,14,3] , [50,18,3], 
                          [2,0,2] , [10,16,2] , [20,14,2] , [50,18,2], */
                          [1,0,1] , [10,16,1] , [20,14,1] , [50,18,1],
                          [0,0,0] , [10,16,0] , [20,14,0] , [50,18,0]];  

    var puntosDeControl8=[/*[3,0,3] , [10,16,3] , [20,14,3] , [50,18,3], 
                          [2,0,2] , [10,16,2] , [20,14,2] , [50,18,2], */
                          [1,0,1] , [10,16,1] , [20,14,1] , [50,18,1],
                          [0,0,0] , [10,16,0] , [20,14,0] , [50,18,0]];  

    var puntosDeControl3=[/*[3,0,3] , [10,16,3] , [20,14,3] , [50,18,3], 
                          [2,0,2] , [10,16,2] , [20,14,2] , [50,18,2], */
                          [50,7,1], [60,15,1] , [70,10,1] , [70,40,1] , 
                          [50,7,0], [60,15,0] , [70,10,0] , [70,40,0]  ];  

    var puntosDeControl4=[/*[3,0,3] , [10,16,3] , [20,14,3] , [50,18,3], 
                          [2,0,2] , [10,16,2] , [20,14,2] , [50,18,2], */
                          [70,40,1] ,  [75,50,1] , [80,60,1] , [110,70,1] ,
                          [70,40,0] ,  [75,50,0] , [80,60,0] , [110,70,0] ];  

    var puntosDeControl5=[/*[3,0,3] , [10,16,3] , [20,14,3] , [50,18,3], 
                          [2,0,2] , [10,16,2] , [20,14,2] , [50,18,2], */
                          [110,70,1] ,[120,70,1] , [130,80,1] , [160,60,1] ,
                          [110,70,0] ,[120,70,0] , [130,80,0] , [160,60,0] ];  


    var puntosDeControlT=[[0.5,y1,-1.969] , [1.5,y1,-4.5] , [2.5,y1,-4.5] , [6,y1,-5],
                          [0.5,y2,-1.989] , [1.5,y2,-4.5] , [2.5,y2,-4.5] , [6,y2,-5.5],
                          [0.5,y2+1,-2] , [1.5,y2+1,-4.5] , [2.5,y2+1,-5.5] , [6,y2+1,-5.5]];
    var incremento = 0;
    for(var i = 0.0; i < 360; i += 360 / 100){
      //var asd = Math.PI * 2 * i;
      p0 = [i,0,incremento];
      if(i > 0){
        incremento += 2;
      }
      p2 = [20,14,incremento];
      if(i > 0){
        incremento += 2;
      }
      p1 = [10,16,incremento];
      
      p3 = [50,18,incremento];
      puntosDeControl.push(p3);
      puntosDeControl.push(p2);
      puntosDeControl.push(p1);
      puntosDeControl.push(p0);

    }


/*


curva pequeño nivel plano
    var puntosDeControl=[ [0.5,0,-1] , [1.5,1,-1] , [2.5,2,-1] , [6,1.5,-1],
                          [0.5,0,0] , [1.5,1,0] , [2.5,2,0] , [6,1.5,0]];
*/
/*planito: 
    var puntosDeControl=[ [1,0,4.5] , [2,0,1] , [6,0,1] , [7,0,4.5] ,
                          [1,0,4.5] , [2,0,5] , [6,0,5] , [7,0,4.5]  ];*/

    var curvaBSpline= new CurvaBSpline();
    var islaGeo = new GeometriaContenedor();
    isla.objeto = new Objeto3D(islaGeo,color);

    var curva2 = new Curva(puntosDeControl2,curvaBSpline,color);
        var curva3 = new Curva(puntosDeControl3,curvaBSpline,blueColor);
        var curva4 = new Curva(puntosDeControl4,curvaBSpline,color);
        var curva5 = new Curva(puntosDeControl5,curvaBSpline,color);
    var curvaT = new Curva(puntosDeControlT,curvaBSpline,blueColor);


    curva2.trasladar(0,-10,0);
    curva2.rotar(degToRad(-90),0,1,0);

    curva3.trasladar(0,-7.95,-37.75);
    //scurva3.trasladar(0,-10,0);
    curva3.rotar(degToRad(-90),0,1,0);

        curva4.trasladar(0,-43.3,-45);
    curva4.rotar(degToRad(-90),0,1,0);

            curva5.trasladar(0,-55.6,-82);
    curva5.rotar(degToRad(-90),0,1,0);

/*
    isla.objeto.agregarHijo(curva2);
        isla.objeto.agregarHijo(curva3);
        isla.objeto.agregarHijo(curva4);
        isla.objeto.agregarHijo(curva5);*/
    isla.objeto.agregarHijo(curvaT);

    this.initBuffers = function(){
        isla.objeto.initBuffers();
    };

    this.draw = function(){
        isla.objeto.draw(isla.mMatrix);
    };

    this.rotar = function(cuanto,x,y,z){
      isla.objeto.rotar(isla.mMatrix,cuanto,x,y,z);
    }

    this.trasladar = function(x,y,z){
      mat4.identity(isla.mMatrix);
      isla.objeto.trasladar(isla.mMatrix,x,y,z);
      this.trasladar2(mat4.clone(isla.mMatrix));
    }

    this.trasladar2 = function(mMatrix){
      mat4.identity(isla.mMatrix);
      mat4.multiply(isla.mMatrix,mMatrix,isla.mMatrix);
      isla.objeto.trasladarHijos(isla.mMatrix);
    }

    this.escalar = function(x,y,z){
      isla.objeto.escalar(isla.mMatrix,x,y,z);
    }

    this.escalar2 = function(mMatrix){
      mat4.multiply(isla.mMatrix,mMatrix,isla.mMatrix);
    }
}
