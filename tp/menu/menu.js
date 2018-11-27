tipoTorta = "Chocolate";
radioTotal = 5;
altura = 5;
ciclos = 3;
amplitud = 2;
vueltas = 4;
decorador = "Bola";
cantidadDecoradores = 9;
contorno = "Tubo";
cantidadContorno = 30;
var starttime;
var horizontalVelocity = 0.025;
var ringSpeedFactor = 3.175;
var plateSpeedFactor = 0.91;
var bandSpeedFactor = 0.1;
var timeToStation1 = 5075;

function startAnimation(){
		dat.GUI.toggleHide();
		gui.removeFolder("Iniciar animación");
		starttime = new Date().getTime();
		objects = [];
		setupBuffers();
    animate(starttime,timeToStation1);
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
		f1.add(window, 'radioTotal', 1, 10, 1).name("Radio");

		f1.add(window, 'altura', 1, 10, 1).name("Altura");
		f1.add(window, 'ciclos', 1, 10, 1).name("Ciclos");
		f1.add(window, 'amplitud', 1, 10, 1).name("Amplitud");

		var f2 = gui.addFolder('Anillo');
		f2.add(window, 'vueltas', 1, 10, 1).name("Torsión");

		var f3 = gui.addFolder('Decoradores');
		f3.add(window, 'decorador', ["Bola", "Campana", "Paleta"]).name("Tipo");
		f3.add(window, 'cantidadDecoradores', 1, 10, 1).name("Cantidad");

		var f4 = gui.addFolder('Contorno');
		f4.add(window, 'contorno', ["Tubo", "Barra"]).name("Tipo");
		f4.add(window, 'cantidadContorno', 2, 50, 1).name("Cantidad");

		var f5 = gui.addFolder('Iniciar animación');
		f5.add(window, "startAnimation").name("Comenzar");

		f0.open();
		f1.open();
		f2.open();
		f3.open();
		f4.open();
		f5.open();
  };
