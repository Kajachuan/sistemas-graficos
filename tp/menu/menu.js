tipoTorta = "Crema";
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

function beginAnimation(){
		starttime = new Date().getTime();
    animate(starttime,5000);
}

function GUI (){

		var gui = new dat.GUI();

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

		gui.add(window, "beginAnimation").name("Comenzar");
		gui.add(window, "reset").name("Reiniciar");

		f0.open();
		f1.open();
		f2.open();
		f3.open();
		f4.open();
  };
