function GeometriaCubo(){
  // Definimos un array de Javascript con las posiciones de los vertices.
  			var verticesPos = [
  					// Cara frontal
  					-1.0, -1.0,  1.0,
  					 1.0, -1.0,  1.0,
  					 1.0,  1.0,  1.0,
  					-1.0,  1.0,  1.0,

  					// Cara de atrás
  					-1.0, -1.0, -1.0,
  					-1.0,  1.0, -1.0,
  					 1.0,  1.0, -1.0,
  					 1.0, -1.0, -1.0,

  					// Cara de arriba
  					-1.0,  1.0, -1.0,
  					-1.0,  1.0,  1.0,
  					 1.0,  1.0,  1.0,
  					 1.0,  1.0, -1.0,

  					// Cara de abajo
  					-1.0, -1.0, -1.0,
  					 1.0, -1.0, -1.0,
  					 1.0, -1.0,  1.0,
  					-1.0, -1.0,  1.0,

  					// Cara de la derecha
  					 1.0, -1.0, -1.0,
  					 1.0,  1.0, -1.0,
  					 1.0,  1.0,  1.0,
  					 1.0, -1.0,  1.0,

  					// Cara de la izquierda
  					-1.0, -1.0, -1.0,
  					-1.0, -1.0,  1.0,
  					-1.0,  1.0,  1.0,
  					-1.0,  1.0, -1.0
  				];

  				// Definimos con que indices de los buffers definidos antes, se debe dibujar
  				// cada vertice de cada triangulo.
  				// Cada cara del cubo se compone de dos triángulos.
  				var cubeVertexIndices = [
  					0,  1,  2,      0,  2,  3,    // adelante
  					4,  5,  6,      4,  6,  7,    // atrás
  					8,  9,  10,     8,  10, 11,   // arriba
  					12, 13, 14,     12, 14, 15,   // abajo
  					16, 17, 18,     16, 18, 19,   // derecha
  					20, 21, 22,     20, 22, 23    // izquierda
  				];

  return {
      position: verticesPos,
      indices: cubeVertexIndices,
      nombre: "cubo",
  };
}
