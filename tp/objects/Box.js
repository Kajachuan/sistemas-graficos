function Box(r, g, b) {
  this.position_buffer = [ 1, 1, 1,   -1, 1, 1,   -1,-1, 1,    1,-1, 1,
                           1, 1, 1,    1,-1, 1,    1,-1,-1,    1, 1,-1,
                           1, 1, 1,    1, 1,-1,   -1, 1,-1,   -1, 1, 1,
                          -1, 1, 1,   -1, 1,-1,   -1,-1,-1,   -1,-1, 1,
                          -1,-1, 1,   -1,-1,-1,    1,-1,-1,    1,-1, 1,
                          -1,-1,-1,   -1, 1,-1,    1, 1,-1,    1,-1,-1];

  this.normal_buffer = [ 0, 0, 1,    0, 0, 1,    0, 0, 1,    0, 0, 1,
                         1, 0, 0,    1, 0, 0,    1, 0, 0,    1, 0, 0,
                         0, 1, 0,    0, 1, 0,    0, 1, 0,    0, 1, 0,
                        -1, 0, 0,   -1, 0, 0,   -1, 0, 0,   -1, 0, 0,
                         0,-1, 0,    0,-1, 0,    0,-1, 0,    0,-1, 0,
                         0, 0,-1,    0, 0,-1,    0, 0,-1,    0, 0,-1];

  this.index_buffer = [ 0, 1, 2,   0, 2, 3,   3, 0, 4,
                        7, 4, 5,   7, 5, 6,   6, 7, 9,
                       11, 8, 9,  11, 9,10,  10,11,12,
                       15,12,13,  15,13,14,  14,15,16,
                       19,16,17,  19,17,18,  19,18,23,
                       23,20,21,  23,21,22];

  Node.call(this);
}

Box.prototype = Object.create(Node.prototype);
