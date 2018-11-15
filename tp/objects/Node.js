function Node() {
  this.children = [];
  this.localMatrix = mat4.create();
  this.worldMatrix = mat4.create();
  this.parent = null;
}

Node.prototype.setParent = function(parent) {
  if(this.parent) {
    var index = this.parent.children.indexOf(this);
    this.parent.children.splice(index, 1);
  }

  parent.children.push(this);
  this.parent = parent;
}

Node.prototype.updateWorldMatrix = function(parentWorldMatrix) {
  if (parentWorldMatrix) {
    mat4.multiply(this.worldMatrix, this.localMatrix, parentWorldMatrix);
  } else {
    mat4.copy(this.worldMatrix, this.localMatrix);
  }

  var worldMatrix = this.worldMatrix;
  this.children.forEach(function(child) {
    child.updateWorldMatrix(worldMatrix);
  });
}

Node.prototype.setupWebGLBuffers = function() {
  this.webgl_position_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

  this.webgl_normal_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);

  this.webgl_texture_coord_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);

  this.webgl_index_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
}

Node.prototype.draw = function() {

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
  gl.vertexAttribPointer(glProgram.vertexPosition, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
  gl.vertexAttribPointer(glProgram.vertexNormal, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
  gl.vertexAttribPointer(glProgram.vertexTexCoord, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.uniform1i(glProgram.diffuseMap, 0);

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, this.reflectMap);
  gl.uniform1i(glProgram.reflectMap, 1);

  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, this.specularMap);
  gl.uniform1i(glProgram.specularMap, 2);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

  gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
}

Node.prototype.initTexture = function(path) {
  this.texture = gl.createTexture();
  this.texture.image = new Image();
  var self = this
  this.texture.image.onload = function() {
    handleLoadedTexture(self.texture, self.texture.image);
  }
  this.texture.image.src = path;
}

Node.prototype.initReflectMap = function() {
  this.reflectMap = gl.createTexture();
  this.reflectMap.image = new Image();
  var self = this
  this.reflectMap.image.onload = function() {
    handleLoadedTexture(self.reflectMap, self.reflectMap.image);
  }
  this.reflectMap.image.src = refMapPath;
}

Node.prototype.initSpecularMap = function(path) {
  this.specularMap = gl.createTexture();
  this.specularMap.image = new Image();
  var self = this
  this.specularMap.image.onload = function() {
    handleLoadedTexture(self.specularMap, self.specularMap.image);
  }
  this.specularMap.image.src = path;
}
