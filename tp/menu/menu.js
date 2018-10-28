var menu = {
	reiniciar:function(){
		alert("Se reiniciaron los parámetros");
	},
};

radioTotal = 2;
altura = 2;
ciclos = 2;
vueltas = 2;
decorador = "Bola";
cantidadDecoradores = 2;
contorno = "Tubo";
cantidadContorno = 2;

function GUI (){

		var gui = new dat.GUI();

		gui.add(menu,"reiniciar").name("Reiniciar"); // Este debe ser el botón reiniciar que aun no funciona

		var f1 = gui.addFolder('Base');
		f1.add(window, 'radioTotal', 1, 10).name("Radio");
		f1.add(window, 'altura', 1, 5).name("Altura");
		f1.add(window, 'ciclos', 1, 5).name("Ciclos");

		var f2 = gui.addFolder('Anillo');
		f2.add(window, 'vueltas', 1, 6).name("Torsión");

		var f3 = gui.addFolder('Decoradores');
		f3.add(window, 'decorador', ["Bola", "Campana", "Paleta"]).name("Tipo");
		f3.add(window, 'cantidadDecoradores', 1, 10).name("Cantidad");

		var f4 = gui.addFolder('Contorno');
		f4.add(window, 'contorno', ["Tubo", "Barra"]).name("Tipo");
		f4.add(window, 'cantidadContorno', 2, 20).name("Cantidad");

		f1.open();
		f2.open();
		f3.open();
		f4.open();
  };
