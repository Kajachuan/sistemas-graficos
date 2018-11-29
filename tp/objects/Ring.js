function Ring(turns) {
  var angle = Math.PI / 6;
  var nPoints = 26;
  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];

  for(var i = 0; i < nPoints / 2; i++) {
    var x = Math.cos(i * angle);
    var y = Math.sin(i * angle);
    this.position_buffer.push(3 + 0.2 * x, 0.2 * y, 0);
    this.position_buffer.push(3 + 0.2 * x, 0.2 * y, 0);

    this.texture_coord_buffer.push(0,0);
    this.texture_coord_buffer.push(0,0);

    var x1 = Math.cos((i - 1) * angle) - x;
    var y1 = Math.sin((i - 1) * angle) - y;
    var n1 = vec3.fromValues(x1, y1, 0);
    vec3.rotateZ(n1, n1, [0,0,0], Math.PI / 2);
    this.normal_buffer.push(n1[0], n1[1], n1[2]);
    var x2 = Math.cos((i + 1) * angle) - x;
    var y2 = Math.sin((i + 1) * angle) - y;
    var n2 = vec3.fromValues(x2, y2, 0);
    vec3.rotateZ(n2, n2, [0,0,0], -Math.PI / 2);
    this.normal_buffer.push(n2[0], n2[1], n2[2]);

    i++;
    if(i == 13) break;
    var x = Math.cos(i * angle);
    var y = Math.sin(i * angle);
    this.position_buffer.push(3 + 0.1 * x, 0.1 * y, 0);
    this.position_buffer.push(3 + 0.1 * x, 0.1 * y, 0);

    this.texture_coord_buffer.push(0,0);
    this.texture_coord_buffer.push(0,0);

    var x1 = Math.cos((i - 1) * angle) - x;
    var y1 = Math.sin((i - 1) * angle) - y;
    var n1 = vec3.fromValues(x1, y1, 0);
    vec3.rotateZ(n1, n1, [0,0,0], Math.PI / 2);
    this.normal_buffer.push(n1[0], n1[1], n1[2]);
    var x2 = Math.cos((i + 1) * angle) - x;
    var y2 = Math.sin((i + 1) * angle) - y;
    var n2 = vec3.fromValues(x2, y2, 0);
    vec3.rotateZ(n2, n2, [0,0,0], -Math.PI / 2);
    this.normal_buffer.push(n2[0], n2[1], n2[2]);
  }

  var levels = 50 * (turns + 1);
  var ang = 2 * Math.PI / levels;
  var torsion = -turns * ang;
  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j+=3) {
      var x = this.position_buffer[j];
      var y = this.position_buffer[j + 1];
      var z = this.position_buffer[j + 2];
      var new_pos = vec3.fromValues(x - 3, y, z);
      vec3.rotateZ(new_pos, new_pos, [0,0,0], torsion * (i + 1));
      new_pos[0] += 3;
      vec3.rotateY(new_pos, new_pos, [0,0,0], ang * (i + 1));
      this.position_buffer.push(new_pos[0], new_pos[1], new_pos[2]);

      var nx = this.normal_buffer[j];
      var ny = this.normal_buffer[j + 1];
      var nz = this.normal_buffer[j + 2];
      var nrot = vec3.fromValues(nx, ny, nz);
      vec3.rotateZ(nrot, nrot, [0,0,0], torsion * (i + 1));
      vec3.rotateY(nrot, nrot, [0,0,0], ang * (i + 1));
      this.normal_buffer.push(nrot[0], nrot[1], nrot[2]);

      this.texture_coord_buffer.push(0,0);
    }
  }

  this.index_buffer = [];
  for (var i = 0; i < levels; i++) {
    var column1Offset = i * nPoints;
    var column2Offset = column1Offset + nPoints;
    for (let j = 0; j < nPoints - 1; j++) {
      this.index_buffer.push(column1Offset + j, column2Offset + j, column1Offset + j + 1);
      this.index_buffer.push(column1Offset + j + 1, column2Offset + j, column2Offset + j + 1);
    }
  }

  Node.call(this);
}

Ring.prototype = Object.create(Node.prototype);
