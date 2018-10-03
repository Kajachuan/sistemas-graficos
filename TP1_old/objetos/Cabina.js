function Cabina(){

    let cabina = {};

    cabina.texture = null;
    cabina.mMatrix = mat4.create();

    var contenedorGeo = new GeometriaContenedor();

    cabina.objeto = new Objeto3D(contenedorGeo,darkGreyColor);

    var paddingX = 17.0;
    var paddingZ = 2.25;

    var tapaArriba = new Caja(1,1,1,darkGreyColor);
    var tapaAbajo = new Caja(1,1,1,darkGreyColor);
    var tapaAbajo2 = new Caja(1,1,1,darkGreyColor);
    var frenteArr = new Caja(1,1,1,darkGreyColor);
    var frenteIzq = new Caja(1,1,1,darkGreyColor);
    var frenteDer = new Caja(1,1,1,darkGreyColor);
    var frenteAba = new Caja(1,1,1,darkGreyColor);
    var costadoIzq = new Caja(1,1,1,darkGreyColor);
    var costadoIzqAba = new Caja(1,1,1,darkGreyColor);
    var costadoIzqArr = new Caja(1,1,1,darkGreyColor);
    var costadoDer = new Caja(1,1,1,darkGreyColor);
    var costadoDerAba = new Caja(1,1,1,darkGreyColor);
    var costadoDerArr = new Caja(1,1,1,darkGreyColor);
    var costadoIzqRotado = new Caja(1,1,1,darkGreyColor);
    var costadoIzqRotado2 = new Caja(1,1,1,darkGreyColor);
    var costadoDerRotado = new Caja(1,1,1,darkGreyColor);
    var costadoDerRotado2 = new Caja(1,1,1,darkGreyColor);
    var tapaDerecha = new Caja(1,1,1,darkGreyColor);
    var tapaIzq = new Caja(1,1,1,darkGreyColor);
    var tapaAtras = new Caja(1,1,1,darkGreyColor);
    var pinzas = new Pinzas();
    var cables = new Cables();

    tapaArriba.trasladar(-5.35+paddingX,8.45,paddingZ);
    tapaArriba.escalar(0.4,0.01,0.75);

    tapaAbajo.trasladar(-5.55+paddingX,7.45,paddingZ);
    tapaAbajo.escalar(0.2,0.01,0.75);

    tapaAbajo2.trasladar(-4.6+paddingX,7.45,paddingZ);
    tapaAbajo2.escalar(0.1,0.01,0.75);

    tapaDerecha.trasladar(-4.95+paddingX,7.45,paddingZ-0.69);
    tapaDerecha.escalar(0.45,0.01,0.06);

    tapaIzq.trasladar(-4.95+paddingX,7.45,paddingZ+0.69);
    tapaIzq.escalar(0.45,0.01,0.06);

    frenteArr.trasladar(paddingX-4.905,8.322,paddingZ);
    frenteArr.rotar(degToRad(25.0),0,0,1.0);
    frenteArr.escalar(0.01,0.15,0.63);

    frenteIzq.trasladar(paddingX-4.755,8,paddingZ+0.69);
    frenteIzq.rotar(degToRad(25.0),0,0,1.0);
    frenteIzq.escalar(0.01,0.5,0.06);

    frenteDer.trasladar(paddingX-4.755,8,paddingZ-0.69);
    frenteDer.rotar(degToRad(25.0),0,0,1.0);
    frenteDer.escalar(0.01,0.5,0.06);

    frenteAba.trasladar(paddingX-4.524,7.505,paddingZ);
    frenteAba.rotar(degToRad(25.0),0,0,1.0);
    frenteAba.escalar(0.01,0.05,0.75);

    costadoIzq.trasladar(paddingX-5.55,7.95,paddingZ+0.74);
    costadoIzq.escalar(0.2,0.5,0.01);

    costadoIzqAba.trasladar(paddingX-5.15,7.49,paddingZ+0.74);
    costadoIzqAba.escalar(0.6,0.05,0.01);

    costadoIzqArr.trasladar(paddingX-5.16,8.322,paddingZ+0.74);
    costadoIzqArr.escalar(0.2,0.15,0.01);

    costadoDer.trasladar(paddingX-5.55,7.95,paddingZ-0.74);
    costadoDer.escalar(0.2,0.5,0.01);

    costadoDerAba.trasladar(paddingX-5.15,7.49,paddingZ-0.74);
    costadoDerAba.escalar(0.6,0.05,0.01);

    costadoDerArr.trasladar(paddingX-5.16,8.322,paddingZ-0.74);
    costadoDerArr.escalar(0.2,0.15,0.01);

    costadoIzqRotado.trasladar(paddingX-4.775,7.95,paddingZ+0.74);
    costadoIzqRotado.rotar(degToRad(25.0),0,0,1.0);
    costadoIzqRotado.escalar(0.03,0.55,0.01);

    costadoIzqRotado2.trasladar(paddingX-4.975,8.275,paddingZ+0.74);
    costadoIzqRotado2.rotar(degToRad(25.0),0,0,1.0);
    costadoIzqRotado2.escalar(0.03,0.1,0.01);

    costadoDerRotado.trasladar(paddingX-4.775,7.95,paddingZ-0.74);
    costadoDerRotado.rotar(degToRad(25.0),0,0,1.0);
    costadoDerRotado.escalar(0.03,0.55,0.01);

    costadoDerRotado2.trasladar(paddingX-4.975,8.275,paddingZ-0.74);
    costadoDerRotado2.rotar(degToRad(25.0),0,0,1.0);
    costadoDerRotado2.escalar(0.03,0.1,0.01);

    tapaAtras.trasladar(-5.75+paddingX,7.95,paddingZ);
    tapaAtras.escalar(0.01,0.5,0.75);

    cabina.objeto.agregarHijo(tapaArriba);
    cabina.objeto.agregarHijo(tapaAbajo);
    cabina.objeto.agregarHijo(tapaAbajo2);
    cabina.objeto.agregarHijo(tapaDerecha);
    cabina.objeto.agregarHijo(tapaIzq);
    cabina.objeto.agregarHijo(frenteArr);
    cabina.objeto.agregarHijo(frenteIzq);
    cabina.objeto.agregarHijo(frenteDer);
    cabina.objeto.agregarHijo(frenteAba);
    cabina.objeto.agregarHijo(costadoIzq);
    cabina.objeto.agregarHijo(costadoDer);
    cabina.objeto.agregarHijo(costadoIzqAba);
    cabina.objeto.agregarHijo(costadoDerAba);
    cabina.objeto.agregarHijo(costadoIzqArr);
    cabina.objeto.agregarHijo(costadoDerArr);
    cabina.objeto.agregarHijo(costadoIzqRotado);
    cabina.objeto.agregarHijo(costadoIzqRotado2);
    cabina.objeto.agregarHijo(costadoDerRotado);
    cabina.objeto.agregarHijo(costadoDerRotado2);
    cabina.objeto.agregarHijo(tapaAtras);
    cabina.objeto.agregarHijo(cables);
    cabina.objeto.agregarHijo(pinzas);


    this.initBuffers = function(){
        cabina.objeto.initBuffers();
    };

    this.draw = function(){
        cabina.objeto.draw(cabina.mMatrix);
    };

    this.trasladar2 = function(mMatrix){
      mat4.identity(cabina.mMatrix);
      mat4.multiply(cabina.mMatrix,mMatrix,cabina.mMatrix);
      cabina.objeto.trasladarHijos(cabina.mMatrix);
    }

    this.trasladar = function(x,y,z){
      mat4.identity(cabina.mMatrix);
      cabina.objeto.trasladar(cabina.mMatrix,x,y,z);
      this.trasladar2(mat4.clone(cabina.mMatrix));
    }

    this.trasladarYEscalarPinzasYCables = function(tC,e,tP){
      cabina.objeto.trasladarUltimoHijo(0,tP,0);
      cabina.objeto.trasladarYEscalarAnteultimoHijo(tC,e);
    }

    this.getPinzas = function(){
      return cabina.objeto.getUltimoHijo();
    }
}
