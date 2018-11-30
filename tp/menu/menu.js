tipoTorta = "Crema";
radioTotal = 5;
altura = 5;
ciclos = 3;
amplitud = 2;
vueltas = 4;
decorador = "Ciruelas";
cantidadDecoradores = 10;
contorno = "Caramelos";
cantidadContorno = 30;

function startAnimation(){
		dat.GUI.toggleHide();
		gui.removeFolder("Iniciar animación");
		objects = [];
		setupBuffers();
		if(radioTotal == 3){

		} else if (radioTotal == 4){

		} else if (radioTotal == 5){
			animationLoop(station1R5);
		} else if (radioTotal == 6){
			animationLoop(station1R6);
		} else if (radioTotal == 7){
			animationLoop(station1R7);
		}

}

dat.GUI.prototype.removeFolder = function(name) {
  var folder = this.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.__ul.removeChild(folder.domElement.parentNode);
  delete this.__folders[name];
  this.onResize();
}

function GUI (){

		gui = new dat.GUI();

		var f0 = gui.addFolder('Torta');
		f0.add(window, 'tipoTorta', ["Crema", "Chocolate"]).name("Sabor") // ??????

		var f1 = gui.addFolder('Base');
		//gui.add(object, property, [min], [max], [step])
		f1.add(window, 'radioTotal', 3, 7, 1).name("Radio");

		f1.add(window, 'altura', 3, 10, 1).name("Altura");
		f1.add(window, 'ciclos', 1, 10, 1).name("Ciclos");
		f1.add(window, 'amplitud', 1, 10, 1).name("Amplitud");

		var f2 = gui.addFolder('Anillo');
		f2.add(window, 'vueltas', 1, 10, 1).name("Torsión");

		var f3 = gui.addFolder('Decoradores');
		f3.add(window, 'decorador', ["Ciruelas", "Campanas", "Paletas"]).name("Tipo");
		f3.add(window, 'cantidadDecoradores', 2, 10, 1).name("Cantidad");

		var f4 = gui.addFolder('Contorno');
		f4.add(window, 'contorno', ["Caramelos", "Oblea"]).name("Tipo");
		f4.add(window, 'cantidadContorno', 2, 50, 1).name("Cantidad");

		f0.open();
		f1.open();
		f2.open();
		f3.open();
		f4.open();
  };
