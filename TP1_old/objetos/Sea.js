function Sea() {
  this.worldVertexPositionBuffer = null;
  this.worldVertexTextureCoordBuffer = null;
  this.waterTexture = null;
}

Sea.prototype.draw = function () {
        if (this.worldVertexTextureCoordBuffer == null || this.worldVertexPositionBuffer == null) {
            return;
        }

        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(gl.TEXTURE_2D, this.waterTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.worldVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.worldVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.worldVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.worldVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.disableVertexAttribArray(shaderProgram.colorAttribute);
        gl.vertexAttrib4f(shaderProgram.colorAttribute, 1, 1, 1, 1);

        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLES, 0, this.worldVertexPositionBuffer.numItems);

};

Sea.prototype.loadSea = function () {
    var data = "-1000.0  0.0 -1000.0 0.0 2000.0\n-1000.0  0.0  1000.0 0.0 0.0\n1000.0  0.0  1000.0 2000.0 0.0\n-1000.0  0.0 -1000.0 0.0 2000.0\n1000.0  0.0 -1000.0 2000.0 2000.0\n1000.0  0.0  1000.0 2000.0 0.0";
    var lines = data.split("\n");
    var vertexCount = 0;
    var vertexPositions = [];
    var vertexTextureCoords = [];
    for (var i in lines) {
        var vals = lines[i].replace(/^\s+/, "").split(/\s+/);
        if (vals.length == 5 && vals[0] != "//") {

            // It is a line describing a vertex; get X, Y and Z first
            vertexPositions.push(parseFloat(vals[0]));
            vertexPositions.push(parseFloat(vals[1]));
            vertexPositions.push(parseFloat(vals[2]));

            // And then the texture coords
            vertexTextureCoords.push(parseFloat(vals[3]));
            vertexTextureCoords.push(parseFloat(vals[4]));

            vertexCount += 1;
        }
      }

    this.worldVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.worldVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);
    this.worldVertexPositionBuffer.itemSize = 3;
    this.worldVertexPositionBuffer.numItems = vertexCount;

    this.worldVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.worldVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTextureCoords), gl.STATIC_DRAW);
    this.worldVertexTextureCoordBuffer.itemSize = 2;
    this.worldVertexTextureCoordBuffer.numItems = vertexCount;
};

Sea.prototype.initTexture = function (gl,texture,image) {
      this.waterTexture = texture;
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, this.waterTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.waterTexture.image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
};
