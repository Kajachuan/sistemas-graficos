function GeometriaCurva(puntosDeControl,tipoCurva){
        
        var rows = puntosDeControl.length/4;
        var cols = 10;
        var deltaCols = 1/cols;
        // Definimos un array de Javascript con las posiciones de los vertices.
        var verticesPos = [];

        for (var i = 0.0; i < rows; i++) {
          for (var u = deltaCols; u <= 1; u = u+deltaCols) {
            var punto = tipoCurva.curvaCubica(u,puntosDeControl);

            verticesPos.push(punto.x);
            verticesPos.push(punto.y);
            verticesPos.push(punto.z);
            
            if(((1-u) < deltaCols) && ((1-u) > 0) && puntosDeControl.length != 4){
              puntosDeControl.shift();
              puntosDeControl.shift();
              puntosDeControl.shift();
              puntosDeControl.shift();
            }
        }
      }


  			var curvaVertexIndices = [];

        for (var row=0;row<rows-1;row++){
          for (var col=0;col<cols-1;col++){
                var base = 0;
                var basePlusOne = 0;
                base = row * cols;
                basePlusOne = (row+1) * cols;
                curvaVertexIndices.push(base+col);
                curvaVertexIndices.push(base+(col+1));
                curvaVertexIndices.push(basePlusOne+col);
                curvaVertexIndices.push(basePlusOne+(col+1));
            }
          }

  return {
      position: verticesPos,
      indices: curvaVertexIndices,
      nombre: "curva",
  };
}
