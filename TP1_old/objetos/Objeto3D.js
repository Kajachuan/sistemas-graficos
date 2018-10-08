function Objeto3D(geometria,color){
  var objeto = {}
  this.hijos = [];

  this.texture = null;
  this.geometria = geometria;
  this.color = color;

  this.webgl_position_buffer = [];
  this.webgl_normal_buffer = [];
  this.webgl_texture_coord_buffer = [];
  this.webgl_color_buffer = [];
  this.webgl_index_buffer = [];
}

Objeto3D.prototype.initBuffers = function(){
        if(this.geometria.nombre == "contenedor"){
          for(var i=0; i < this.hijos.length; i++){
            this.hijos[i].initBuffers();
          }
        } else if(this.geometria.nombre == "superficie"){
            this.webgl_position_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertArray), gl.STATIC_DRAW);

            this.webgl_position_buffer.positionElementCount = 3;
            this.webgl_position_buffer.normalElementCount = 3;
            this.webgl_position_buffer.uvElementCount = 2;

            this.webgl_position_buffer.positionOffset = 0 * Float32Array.BYTES_PER_ELEMENT;
            this.webgl_position_buffer.normalOffset = 3 * Float32Array.BYTES_PER_ELEMENT;
            this.webgl_position_buffer.uvOffset = 6 * Float32Array.BYTES_PER_ELEMENT;
            this.webgl_position_buffer.stride = 8 * Float32Array.BYTES_PER_ELEMENT;

            this.webgl_position_buffer.numItems = vertArray.length / 8;
        } else {
          this.texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.color);

          this.webgl_position_buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.geometria.position), gl.STATIC_DRAW);

          this.webgl_index_buffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.geometria.indices), gl.STATIC_DRAW);
/*
          this.webgl_position_buffer.positionElementCount = 3;
          this.webgl_position_buffer.normalElementCount = 3;
          this.webgl_position_buffer.uvElementCount = 2;

          this.webgl_position_buffer.positionOffset = 0 * Float32Array.BYTES_PER_ELEMENT;
          this.webgl_position_buffer.normalOffset = 3 * Float32Array.BYTES_PER_ELEMENT;
          this.webgl_position_buffer.uvOffset = 6 * Float32Array.BYTES_PER_ELEMENT;
          this.webgl_position_buffer.stride = 8 * Float32Array.BYTES_PER_ELEMENT;

          this.webgl_position_buffer.numItems = vertArray.length / 8;*/
        }
};

Objeto3D.prototype.escalar = function(mMatrix,x,y,z){
    mat4.scale(mMatrix,mMatrix,vec3.fromValues(x,y,z));
};

Objeto3D.prototype.trasladar = function(mMatrix,x,y,z){
  mat4.translate(mMatrix,mMatrix,vec3.fromValues(x,y,z));
};

Objeto3D.prototype.trasladarHijos = function(mMatrix,x,y,z){
  for(var i = 0; i < this.hijos.length; i++){
    this.hijos[i].trasladar2(mMatrix,x,y,z);
  }
};

Objeto3D.prototype.escalarHijos = function(mMatrix){
  for(var i = 0; i < this.hijos.length; i++){
    this.hijos[i].escalar2(mMatrix);
  }
};

Objeto3D.prototype.trasladarUltimoHijo = function(x,y,z){
    this.hijos[this.hijos.length-1].trasladar(x,y,z);
};

Objeto3D.prototype.getUltimoHijo = function(){
    return this.hijos[this.hijos.length-1];
};

Objeto3D.prototype.retirarUltimoHijo = function(){
    this.hijos.pop();
};

Objeto3D.prototype.getHijosSize = function(){
    return this.hijos.length;
};

Objeto3D.prototype.trasladarYEscalarAnteultimoHijo = function(t,e){
    this.hijos[this.hijos.length-2].trasladar(0,t,0);
    this.hijos[this.hijos.length-2].escalar(1,e,1);
};

Objeto3D.prototype.escalarYTrasladarItemsUltimoHijo = function(tC,e,tP){
    this.hijos[this.hijos.length-1].trasladarYEscalarPinzasYCables(tC,e,tP);
};

Objeto3D.prototype.rotar = function(mMatrix,cuanto,x,y,z){
        mat4.rotate(mMatrix, mMatrix, cuanto, [x,y,z]);
};

Objeto3D.prototype.draw = function(mMatrix){
            if(this.geometria.nombre == "contenedor"){
                for(var i=0; i < this.hijos.length;i++){
                  this.hijos[i].draw();
              }
            } else {

              mvPushMatrix();
              // Se configuran los buffers que alimentarán el pipeline
              {
                const numComponents = 3;
                const type = gl.FLOAT;
                const normalize = false;
                const stride = 0;
                const offset = 0;

                gl.bindBuffer(gl.ARRAY_BUFFER,  this.webgl_position_buffer);
                gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,numComponents,type,normalize,stride,offset);
              }

              {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
              }

              {
                const vertexCount = 36;
                const type = gl.UNSIGNED_SHORT;
                const offset = 0;
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
                mat4.multiply(modMatrix,mMatrix,modMatrix);
                setMatrixUniforms();

                if(this.geometria.nombre == "cubo"){
                  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
                } else if(this.geometria.nombre == "cilindro" || this.geometria.nombre == "curva"){
                  gl.drawElements(gl.LINE_STRIP, this.geometria.indices.length, type, offset);
                  //gl.drawElements(gl.TRIANGLE_STRIP, this.geometria.indices.length, type, offset);
                }else if(this.geometria.nombre == "superficie"){

                  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);

                  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                    this.webgl_position_buffer.positionElementCount,
                    gl.FLOAT,
                    false,
                    this.webgl_position_buffer.stride,
                    this.webgl_position_buffer.positionOffset
                  );
                  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute,
                    this.webgl_position_buffer.normalElementCount,
                    gl.FLOAT,
                    false,
                    this.webgl_position_buffer.stride,
                    this.webgl_position_buffer.normalOffset
                  );
                  gl.vertexAttribPointer(shaderProgram.vertexUVAttribute,
                    this.webgl_position_buffer.uvElementCount,
                    gl.FLOAT,
                    false,
                    this.webgl_position_buffer.stride,
                    this.webgl_position_buffer.uvOffset
                  );
                  gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, mat4.invert(mat4.tranpose(mMatrix*viewMatrix)));
                  gl.uniform1fv(shaderProgram.p, defaults.p);
                  gl.uniform3fv(shaderProgram.lDir, defaults.lDir);
                  gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.webgl_position_buffer);
                }
               }
              mvPopMatrix();
            }
};

Objeto3D.prototype.agregarHijo = function(objetoNuevo){
      this.hijos.push(objetoNuevo);
};
