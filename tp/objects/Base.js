function Base(r, g, b, rad, cycles, h, amp) {
  this.ka = [0,0,0];
  this.kd = [r,g,b];
  this.ks = [0,0,0];
  this.gloss = 1;

  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];

  var d = h / (4 * cycles - 1);
  var cp = [0,0,  0,0,  rad - 0.5,0,  rad,d,  rad,2 * d];
  var ly = 0;
  for(i = 1; i < cycles; i++) {
    ly = cp[cp.length - 1];
    cp.push(rad - amp,ly + d,  rad - amp,ly + 2 * d);
    cp.push(rad,ly + 3 * d,  rad,ly + 4 * d);
  }
  ly = cp[cp.length - 1];
  cp.push(rad - 0.5,ly + d,  0,ly + d,  0,ly + d);

  var nPoints = 0;
  var max_uv = 2 * rad + 2;
  var c_tex = max_uv / 2;
  var uv = c_tex;

  for(var i = 0; i < cp.length - 4; i += 2) {
    if((i - 6) % 8 == 0 && i != cp.length - 10) uv = max_uv;
    else if(i == cp.length - 10) uv = c_tex + rad;
    step = i < 6 ? rad / 32 : i > cp.length - 12 ? -rad / 32 : -1 / 43;
    for(var u = 0; u < 1; u += 0.1) {
      var b0 = 0.5 * Math.pow(1 - u, 2);
      var b1 = -Math.pow(u, 2) + u + 0.5;
      var b2 = 0.5 * Math.pow(u, 2);
      var x = b0 * cp[i] + b1 * cp[i + 2] + b2 * cp[i + 4];
      var y = b0 * cp[i + 1] + b1 * cp[i + 3] + b2 * cp[i + 5];
      this.position_buffer.push(x, y, 0);
      nPoints++;

      this.texture_coord_buffer.push(uv, c_tex);
      uv += step;

      var db0 = u - 1;
      var db1 = 1 - 2 * u;
      var db2 = u;
      var tx = db0 * cp[i] + db1 * cp[i + 2] + db2 * cp[i + 4];
      var ty = db0 * cp[i + 1] + db1 * cp[i + 3] + db2 * cp[i + 5];
      this.normal_buffer.push(ty, -tx, 0);
    }
  }

  var levels = 50;
  var angle = 2 * Math.PI / levels;
  var rot = vec3.create();
  var nrot = vec3.create();
  var texrot = vec3.create();

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
      vec3.rotateZ(texrot, [u, v, 0], [c_tex, c_tex, 0], angle * (i + 1));
      this.texture_coord_buffer.push(texrot[0], texrot[1]);
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

Base.prototype = Object.create(Node.prototype);
