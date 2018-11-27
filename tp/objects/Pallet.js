function Pallet(r, g, b) {
  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];

  var nPoints = 2;
  for(var u = 0; u <= 1; u += 0.001) {
    var b0 = Math.pow(1 - u, 2);
    var b1 = 2 * (1 - u) * u;
    var b2 = Math.pow(u, 2);
    var x = -2.5 * b0 + b2 * 1.5;
    var y = 2 * b1;
    this.position_buffer.push(x, y, 0);
    this.normal_buffer.push(0, 0, 1);
    this.texture_coord_buffer.push(0,0);

    var db0 = -2 * (1 - u);
    var db1 = 2 - 4 * u;
    var db2 = 2 * u;
    var tx = -2.5 * db0 + db2 * 1.5;
    var ty = 2 * db1;
    this.position_buffer.push(x, y, 0);
    this.normal_buffer.push(-ty, tx, 0);
    this.texture_coord_buffer.push(0,0);
    nPoints += 2;
  }

  this.position_buffer.push(-2.5, 0, 0);
  this.normal_buffer.push(0, -1, 0);
  this.texture_coord_buffer.push(0,0);
  this.position_buffer.push(1.5, 0, 0);
  this.normal_buffer.push(0, -1, 0);
  this.texture_coord_buffer.push(0,0);

  for(var i = 0; i < nPoints * 3; i+=3) {
    var x = this.position_buffer[i];
    var y = this.position_buffer[i + 1];
    var z = this.position_buffer[i + 2];
    this.position_buffer.push(x, y, z - 0.2);

    var nx = this.normal_buffer[i];
    var ny = this.normal_buffer[i + 1];
    var nz = this.normal_buffer[i + 2];
    this.normal_buffer.push(nx, ny, -nz);

    this.texture_coord_buffer.push(0,0);
  }

  this.index_buffer = [];
  for (i = 2; i < nPoints - 2; i+=2) {
    this.index_buffer.push(0, i);
  }
  for (i = nPoints; i < 2 * nPoints - 2; i+=2) {
    this.index_buffer.push(nPoints, i);
  }
  this.index_buffer.push(2 * nPoints - 2, nPoints - 1, nPoints - 2);
  for (i = 1; i < nPoints - 2; i+=2) {
    this.index_buffer.push(i, i + 2, nPoints + i + 2);
    this.index_buffer.push(i, nPoints + i + 2, nPoints + i);
  }

  Node.call(this);
}

Pallet.prototype = Object.create(Node.prototype);
