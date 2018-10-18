
var menu = {
	alturaMaxima:10,
	reiniciar:function(){
		alert("Se reiniciaron los parámetros");
	},
	detener:function(){
		alert("Se detuvo la ejecución");
	},
	modo:"random",
	ancho:0,
	umbral:100,
	samples:2
};

function dummy(){
	console.log("dummy function called");
}

var cantidadTotal=5;

function GUI (){
		// creamos el menu

		var gui = new dat.GUI();

		gui.add(window,"cantidadTotal",0,10);

		// definimos una carpeta comandos en la variable f1
		var f1 = gui.addFolder('Comandos');

		//el metodo add recibe un objeto y el nombre del atributo o funcion en forma de STRING
		f1.add(menu, 'reiniciar').name("Reiniciar");
		f1.add(menu, 'detener').name("detener");

		// si se desea invocar a una funcion o una variable global, se pasa el parametro window como primer argumento
		f1.add(window, 'dummy').name("detener");

		f1.open(); // hace que la carpeta f1 inicie abierta

		var f2 = gui.addFolder('Parametros generales');

		f2.add(menu, 'alturaMaxima', 1.0, 60.0).name("altura maxima").step(1);
		f2.add(menu, 'ancho',4,25).name("Ancho");

		f2.add(menu, 'modo',["random","secuencial"]).name("modo");

		var f3 = gui.addFolder('Parametros Especiales ');
		f3.add(menu,'umbral',0.0,200.0).name("umbral");
		f3.add(menu,'samples',0,30).name("samples").onChange(function(v){
			console.log(" cambio el valor de app.samples a "+v);
		});

		f2.open();
		f3.open();
  };
