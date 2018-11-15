function Bell(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [r,g,b];
  this.ks = [0,0,0];
  this.gloss = 1;

  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];
  var cp = [  0,0,    0.5,0,    0.9,0,      1,0,      1,0.05,   1,0.1,   0.9,0.1,
            0.7,0.1,  0.6,0.6,  0.5,1.1,  0.3,1.2,  0.1,1.3,    0,1.5];

  var nPoints = 0;
  for(var i = 0; i < cp.length - 4; i+=4) {
    for(var u = 0; u <= 1; u+=0.1) {
      var b0 = Math.pow(1 - u, 2);
      var b1 = 2 * (1 - u) * u;
      var b2 = Math.pow(u, 2);
      var x = b0 * cp[i] + b1 * cp[i + 2] + b2 * cp[i + 4];
      var y = b0 * cp[i + 1] + b1 * cp[i + 3] + b2 * cp[i + 5];
      this.position_buffer.push(x, y, 0);

      var db0 = -2 * (1 - u);
      var db1 = 2 - 4 * u;
      var db2 = 2 * u;
      var tx = db0 * cp[i] + db1 * cp[i + 2] + db2 * cp[i + 4];
      var ty = db0 * cp[i + 1] + db1 * cp[i + 3] + db2 * cp[i + 5];
      this.normal_buffer.push(ty, -tx, 0);
      nPoints++;

      this.texture_coord_buffer.push(0,0);
    }
  }

  var levels = 50;
  var angle = 2 * Math.PI / levels;
  var rot = vec3.create();
  var nrot = vec3.create();

  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j += 3) {
      var x = this.position_buffer[j];
      var y = this.position_buffer[j + 1];
      var z = this.position_buffer[j + 2];
      var pos = vec3.fromValues(x, y, z);
      vec3.rotateY(rot, pos, [0,0,0], angle * (i + 1));
      this.position_buffer.push(rot[0], rot[1], rot[2]);

      var nx = this.normal_buffer[j];
      var ny = this.normal_buffer[j + 1];
      var nz = this.normal_buffer[j + 2];
      var normal = vec3.fromValues(nx, ny, nz);
      vec3.rotateY(nrot, normal, [0,0,0], angle * (i + 1));
      this.normal_buffer.push(nrot[0], nrot[1], nrot[2]);

      this.texture_coord_buffer.push(0,0);
    }
  }

  this.index_buffer = [];
  for (var i = 0; i < levels; i++) {
    var column1Offset = i * nPoints;
    var column2Offset = column1Offset + nPoints;
    for (var j = 0; j < nPoints - 1; j++) {
      this.index_buffer.push(column1Offset + j, column2Offset + j, column1Offset + j + 1);
      this.index_buffer.push(column1Offset + j + 1, column2Offset + j, column2Offset + j + 1);
    }
  }

  Node.call(this);
}

Bell.prototype = Object.create(Node.prototype);
