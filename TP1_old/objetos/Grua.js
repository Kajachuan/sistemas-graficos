function Grua(){

    let grua = {};

    grua.texture = null;
    grua.mMatrix = mat4.create();

    var darkGreyColor = new Uint8Array([135, 135, 135, 255]);
    var blueColor = new Uint8Array([0, 0, 255, 255]);

    var contenedorGeo = new GeometriaContenedor();

    grua.objeto = new Objeto3D(contenedorGeo,darkGreyColor);

    var soporteH1 = new Caja(3,0.15,0.15,darkGreyColor);
    var soporteH2 = new Caja(3,0.15,0.15,darkGreyColor);

    var soporteH3 = new Caja(3,0.15,0.15,darkGreyColor);
    var soporteH4 = new Caja(3,0.15,0.15,darkGreyColor);

    var soporteH5 = new Caja(2.25,0.2,0.35,darkGreyColor);
    var soporteH6 = new Caja(2.25,0.2,0.35,darkGreyColor);

    var soporteH7 = new Caja(8.5,0.3,0.1,darkGreyColor);
    var soporteH8 = new Caja(8.5,0.3,0.1,darkGreyColor);
    var soporteH9 = new Caja(0.1,0.3,0.9,darkGreyColor);

    var soporteV1 = new Caja(0.20,4.025,0.15,darkGreyColor);
    var soporteV2 = new Caja(0.20,4.025,0.15,darkGreyColor);
    var soporteV3 = new Caja(0.20,4.025,0.15,darkGreyColor);
    var soporteV4 = new Caja(0.20,4.025,0.15,darkGreyColor);

    var soporteD1 = new Caja(3.5,0.15,0.15,darkGreyColor);
    var soporteD2 = new Caja(3.5,0.15,0.15,darkGreyColor);

    var soporteBloque = new Caja(1.25,0.6,1.25,darkGreyColor);

    var rueda1 = new Cilindro(darkGreyColor);
    var rueda2 = new Cilindro(darkGreyColor);
    var rueda3 = new Cilindro(darkGreyColor);
    var rueda4 = new Cilindro(darkGreyColor);
    var rueda5 = new Cilindro(darkGreyColor);
    var rueda6 = new Cilindro(darkGreyColor);
    var rueda7 = new Cilindro(darkGreyColor);
    var rueda8 = new Cilindro(darkGreyColor);

    var cabina = new Cabina();

    var muelleFloorPaddingY = 1;

    soporteH1.trasladar(2.8,muelleFloorPaddingY+3.75,0);
    soporteH1.initValues();

    soporteV1.trasladar(0,muelleFloorPaddingY,0);
    soporteV1.initValues();

    soporteH2.trasladar(2.8,muelleFloorPaddingY+7.75,0);
    soporteH2.initValues();

    soporteV2.trasladar(5.6,muelleFloorPaddingY,0);
    soporteV2.initValues();

    soporteD1.trasladar(2.7,6.75,0);
    soporteD1.rotar(degToRad(-35.0),0,0,1);
    soporteD1.initValues();

    soporteH3.trasladar(2.8,muelleFloorPaddingY+3.75,4.5);
    soporteH3.initValues();

    soporteV3.trasladar(0,muelleFloorPaddingY,4.5);
    soporteV3.initValues();

    soporteH4.trasladar(2.8,muelleFloorPaddingY+7.75,4.5);
    soporteH4.initValues();

    soporteV4.trasladar(5.6,muelleFloorPaddingY,4.5);
    soporteV4.initValues();

    soporteD2.trasladar(2.7,6.75,4.5);
    soporteD2.rotar(degToRad(-35.0),0,0,1);
    soporteD2.initValues();

    soporteH5.trasladar(1,8.625,2.25);
    soporteH5.rotar(degToRad(-90.0),0,1,0);
    soporteH5.initValues();

    soporteH6.trasladar(4.75,8.625,2.25);
    soporteH6.rotar(degToRad(-90.0),0,1,0);
    soporteH6.initValues();

    soporteH7.trasladar(6.75,8.425,1.4);
    soporteH7.initValues();

    soporteH8.trasladar(6.75,8.425,3.1);
    soporteH8.initValues();

    soporteH9.trasladar(15.15,8.425,2.25);
    soporteH9.initValues();

    soporteBloque.trasladar(-3,8,2.25);
    soporteBloque.initValues();

    rueda1.trasladar(-0.35,1.615,-0.625);
    rueda1.rotar(degToRad(90),0,0,1);
    rueda1.escalar(1.25,0.3,1.25);

    rueda2.trasladar(0.35,1.615,-0.625);
    rueda2.rotar(degToRad(90),0,0,1);
    rueda2.escalar(1.25,0.3,1.25);

    rueda3.trasladar(5.95,1.615,-0.625);
    rueda3.rotar(degToRad(90),0,0,1);
    rueda3.escalar(1.25,0.3,1.25);

    rueda4.trasladar(5.25,1.615,-0.625);
    rueda4.rotar(degToRad(90),0,0,1);
    rueda4.escalar(1.25,0.3,1.25);

    rueda5.trasladar(-0.35,1.615,3.875);
    rueda5.rotar(degToRad(90),0,0,1);
    rueda5.escalar(1.25,0.3,1.25);

    rueda6.trasladar(0.35,1.615,3.875);
    rueda6.rotar(degToRad(90),0,0,1);
    rueda6.escalar(1.25,0.3,1.25);

    rueda7.trasladar(5.95,1.615,3.875);
    rueda7.rotar(degToRad(90),0,0,1);
    rueda7.escalar(1.25,0.3,1.25);

    rueda8.trasladar(5.25,1.615,3.875);
    rueda8.rotar(degToRad(90),0,0,1);
    rueda8.escalar(1.25,0.3,1.25);

     grua.objeto.agregarHijo(soporteV1);
     grua.objeto.agregarHijo(soporteH1);
     grua.objeto.agregarHijo(soporteD1);
     grua.objeto.agregarHijo(soporteV2)
     grua.objeto.agregarHijo(soporteH2);
     grua.objeto.agregarHijo(soporteV3);
     grua.objeto.agregarHijo(soporteH3);
     grua.objeto.agregarHijo(soporteV4);
     grua.objeto.agregarHijo(soporteH4);
     grua.objeto.agregarHijo(soporteD2);
     grua.objeto.agregarHijo(soporteH5);
     grua.objeto.agregarHijo(soporteH6);
     grua.objeto.agregarHijo(soporteH7);
     grua.objeto.agregarHijo(soporteH8);
     grua.objeto.agregarHijo(soporteH9);
     grua.objeto.agregarHijo(soporteBloque);
     grua.objeto.agregarHijo(rueda1);
     grua.objeto.agregarHijo(rueda2);
     grua.objeto.agregarHijo(rueda3);
     grua.objeto.agregarHijo(rueda4);
     grua.objeto.agregarHijo(rueda5);
     grua.objeto.agregarHijo(rueda6);
     grua.objeto.agregarHijo(rueda7);
     grua.objeto.agregarHijo(rueda8);
     grua.objeto.agregarHijo(cabina);


    this.initBuffers = function(){
        grua.objeto.initBuffers();
    };

    this.draw = function(){
        grua.objeto.draw(grua.mMatrix);
    };

    this.trasladar = function(x,y,z){
        mat4.identity(grua.mMatrix);
        grua.objeto.trasladar(grua.mMatrix,x,y,z);
        grua.objeto.trasladarHijos(grua.mMatrix);
    }

    this.trasladarCabina = function(x){
        var y = 0;
        var z = 0;
        grua.objeto.trasladarUltimoHijo(x,y,z);
    }

    this.moverPinzasYCables = function (tC,e,tP){
        grua.objeto.escalarYTrasladarItemsUltimoHijo(tC,e,tP);
    }

    this.siTieneAlgunContenedorAlAlcanceAgarrar = function(cajasMuelle){
        var cabina = grua.objeto.getUltimoHijo();
        var pinzas = cabina.getPinzas();
        var i = 0;

        while(pinzas.noTienenNadaAgarrado() && (i < cajasMuelle.length)){
          if(pinzas.tieneContenedorAlAlcance(cajasMuelle[i])){
              pinzas.agarrarContenedor(cajasMuelle[i]);
          }
          i++;
        }
    }

    this.noTieneAlgunContenedorActualmente = function(){
        var cabina = grua.objeto.getUltimoHijo();
        var pinzas = cabina.getPinzas();
        return pinzas.noTienenNadaAgarrado();
    }

    this.dejarContenedor = function(){
        var cabina = grua.objeto.getUltimoHijo();
        var pinzas = cabina.getPinzas();
        return pinzas.dejarContenedor();
    }
}
