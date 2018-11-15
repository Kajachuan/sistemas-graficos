function Ball(r, g, b) {
  this.ka = [0,0,0];
  this.kd = [r,g,b];
  this.ks = [0,0,0];
  this.gloss = 1;

  var nPoints = 20;
  var angle = Math.PI / (nPoints - 1);
  this.position_buffer = [];
  this.texture_coord_buffer = [];

  for(var i = 0; i < nPoints; i++) {
    this.position_buffer.push(Math.cos(i * angle));
    this.position_buffer.push(Math.sin(i * angle));
    this.position_buffer.push(0);

    this.texture_coord_buffer.push(0,0);
  }

  var levels = 50;
  angle = 2 * Math.PI / levels;
  var rot = vec3.create();

  for(var i = 0; i < levels; i++) {
    for(var j = 0; j < nPoints * 3; j += 3) {
      var x = this.position_buffer[j];
      var y = this.position_buffer[j + 1];
      var z = this.position_buffer[j + 2];
      var pos = vec3.fromValues(x, y, z);
      vec3.rotateX(rot, pos, [0, 0, 0], angle * (i + 1));
      this.position_buffer.push(rot[0], rot[1], rot[2]);

      this.texture_coord_buffer.push(0,0);
    }
  }

  this.normal_buffer = this.position_buffer;

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

Ball.prototype = Object.create(Node.prototype);
