function Tube(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [r,g,b];
  this.ks = [0,0,0];
  this.gloss = 1;

  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];

  this.position_buffer.push(0, 1.85, 0);
  this.normal_buffer.push(0, 1, 0);
  this.texture_coord_buffer.push(0, 1);

  this.position_buffer.push(0.12, 1.85, 0);
  this.normal_buffer.push(0, 1, 0);
  this.texture_coord_buffer.push(0, 0.975);
  this.position_buffer.push(0.12, 1.85, 0);
  this.normal_buffer.push(-1, 0, 0);
  this.texture_coord_buffer.push(0, 0.975);

  this.position_buffer.push(0.12, 2, 0);
  this.normal_buffer.push(-1, 0, 0);
  this.texture_coord_buffer.push(0, 0.95);
  this.position_buffer.push(0.12, 2, 0);
  this.normal_buffer.push(0, 1, 0);
  this.texture_coord_buffer.push(0, 0.95);

  this.position_buffer.push(0.2, 2, 0);
  this.normal_buffer.push(0, 1, 0);
  this.texture_coord_buffer.push(0, 0.925);
  this.position_buffer.push(0.2, 2, 0);
  this.normal_buffer.push(1, 0, 0);
  this.texture_coord_buffer.push(0, 0.925);

  this.position_buffer.push(0.2, -2, 0);
  this.normal_buffer.push(1, 0, 0);
  this.texture_coord_buffer.push(0, 0.075);
  this.position_buffer.push(0.2, -2, 0);
  this.normal_buffer.push(0, -1, 0);
  this.texture_coord_buffer.push(0, 0.075);

  this.position_buffer.push(0.12, -2, 0);
  this.normal_buffer.push(0, -1, 0);
  this.texture_coord_buffer.push(0, 0.05);
  this.position_buffer.push(0.12, -2, 0);
  this.normal_buffer.push(-1, 0, 0);
  this.texture_coord_buffer.push(0, 0.05);

  this.position_buffer.push(0.12, -1.85, 0);
  this.normal_buffer.push(-1, 0, 0);
  this.texture_coord_buffer.push(0, 0.025);
  this.position_buffer.push(0.12, -1.85, 0);
  this.normal_buffer.push(0, -1, 0);
  this.texture_coord_buffer.push(0, 0.025);

  this.position_buffer.push(0, -1.85, 0);
  this.normal_buffer.push(0, -1, 0);
  this.texture_coord_buffer.push(0, 0);

  var nPoints = 14;
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
    }

    for(var k = 0; k < nPoints * 2; k += 2) {
      var u = this.texture_coord_buffer[k];
      var v = this.texture_coord_buffer[k + 1];
      this.texture_coord_buffer.push(u + (i + 1) / levels, v);
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

Tube.prototype = Object.create(Node.prototype);
