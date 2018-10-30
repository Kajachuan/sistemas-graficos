radioTotal = 5;
altura = 5;
ciclos = 3;
amplitud = 2;
vueltas = 4;
decorador = "Bola";
cantidadDecoradores = 9;
contorno = "Tubo";
cantidadContorno = 30;

function GUI (){

		var gui = new dat.GUI();

		gui.add(window, "reset").name("Reiniciar");

		var f1 = gui.addFolder('Base');
		f1.add(window, 'radioTotal', 1, 10).name("Radio").step(1);
		f1.add(window, 'altura', 1, 10).name("Altura").step(1);
		f1.add(window, 'ciclos', 1, 10).name("Ciclos").step(1);
		f1.add(window, 'amplitud', 0, 10).name("Amplitud").step(1);

		var f2 = gui.addFolder('Anillo');
		f2.add(window, 'vueltas', 0, 10).name("Torsión").step(1);

		var f3 = gui.addFolder('Decoradores');
		f3.add(window, 'decorador', ["Bola", "Campana", "Paleta"]).name("Tipo");
		f3.add(window, 'cantidadDecoradores', 1, 10).name("Cantidad").step(1);

		var f4 = gui.addFolder('Contorno');
		f4.add(window, 'contorno', ["Tubo", "Barra"]).name("Tipo");
		f4.add(window, 'cantidadContorno', 2, 50).name("Cantidad").step(1);

		f1.open();
		f2.open();
		f3.open();
		f4.open();
  };
