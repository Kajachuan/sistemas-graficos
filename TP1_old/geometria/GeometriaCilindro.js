function GeometriaCilindro(){
        var cols = 24; //poquitos para que no sea tan circular
        var rows = 4;

        // Definimos un array de Javascript con las posiciones de los vertices.
        var verticesPos = [];

        var radio = 0.5;

        for (var i = 0.0; i < rows; i++) {
          for (var j = 0.0; j < cols; j++) {

  					var rad=radio;
  					var z = 0;
  					if (i==0) {
  						rad=0;
  						z=(1-rows/2)+0.5;

  					} else if (i==rows-1) {
  						rad=0;
  						z=((i-1)-rows/2)+0.5;

  					} else {
  						z=((i)-rows/2)+0.5;
  					}

  					var x= rad*Math.cos(Math.PI/2+j*Math.PI*2/(cols-1));
  					var y= radio+rad*(Math.sin(Math.PI/2+j*Math.PI*2/(cols-1)));

            // Para cada vértice definimos su posición
            verticesPos.push(x);
            verticesPos.push(z);
            verticesPos.push(y);
            };
        };


        // Definimos con que indices de los buffers definidos antes, se debe dibujar
        // cada vertice de cada triangulo.
        // Cada cara del cubo se compone de dos triángulos.
  			var cilinderVertexIndices = [];
        var base = 0;
        var basePlusOne = 0;

        for (var row=0;row<rows-1;row++){
          for (var col=0;col<cols-1;col++){
            base = row * cols;
            basePlusOne = (row+1) * cols;
            cilinderVertexIndices.push(base+col);
            cilinderVertexIndices.push(base+(col+1));
            cilinderVertexIndices.push(basePlusOne+col);
            cilinderVertexIndices.push(basePlusOne+(col+1));
          }
        }

  return {
      position: verticesPos,
      indices: cilinderVertexIndices,
      nombre: "cilindro",
  };
}
