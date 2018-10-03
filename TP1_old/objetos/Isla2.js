function Isla2(color){
    let isla = {};

    isla.texture = null;
    isla.mMatrix = mat4.create();

      var pts = [
        0.0, 4.0, 0.0,
        0.4, 3.9, 0.0,
        0.9, 3.5, 0.0,
        //1.2, 2.5, 0.0,
        1.7, 1.0, 0.0,
        3.0, 0.0, 0.0,
        3.0, -2.0, 0.0,
        1.4, -2.9, 0.0,
        0.0, -3.0, 0.0
      ];

     isla.spline = GeometriaBSpline(pts,3);
     isla.spline_items = isla.spline.length / 3;
     isla.steps = 60;
     
    /* Adds perlin noise in the 3 dimensions
     */
      var add3DNoise = function(pt, a, oct) {
        var perlinF = new perlin();
        var n_x = a * perlinF.noise(pt[0] * oct, pt[1] * oct, pt[2] * oct);
        var n_y = a * perlinF.noise(pt[1] * oct, pt[2] * oct, pt[0] * oct);
        var n_z = a * perlinF.noise(pt[2] * oct, pt[0] * oct, pt[1] * oct);

        return [pt[0] + n_x, pt[1] + n_y, pt[2] + n_z];
      }

      var shape = function(u, v) {
        // Our function for the shape is discrete in u,
        // and the parametric function will call it with values 
        // outside the range [0, spline_items - 1].
        // Given that our shape is a mirror its very easy to fix this
        // numbers
        if (u < 0) {
          u = 0 - u;
        } else if (u >= isla.spline_items) {
          u = 2 * isla.spline_items - 1 - u;
        }
        var pt = [isla.spline[u * 3 + 0], isla.spline[u * 3 + 1], isla.spline[u * 3 + 2]];
        var angle = Math.PI * 2 * v / steps;
        var rotationMatrix = mat4.create();
        mat4.identity(rotationMatrix);
        mat4.rotateY(rotationMatrix,rotationMatrix,angle);
        pt = vec3.transformMat4(pt,pt,rotationMatrix);

        // >> we add noise to the shape
        return add3DNoise(pt, 0.1, 1.0);
      }


    isla.superficie = parametricSurface(isla.spline_items,isla.steps,shape);

    
    isla.objeto = new Objeto3D(isla.superficie,color);
    //isla.objeto.agregarHijo(curvaT);

    this.initBuffers = function(){
        isla.objeto.initBuffers();
    };

    this.draw = function(){
        isla.objeto.draw(isla.mMatrix);
    };

    this.rotar = function(cuanto,x,y,z){
      isla.objeto.rotar(isla.mMatrix,cuanto,x,y,z);
    }

    this.trasladar = function(x,y,z){
      mat4.identity(isla.mMatrix);
      isla.objeto.trasladar(isla.mMatrix,x,y,z);
      this.trasladar2(mat4.clone(isla.mMatrix));
    }

    this.trasladar2 = function(mMatrix){
      mat4.identity(isla.mMatrix);
      mat4.multiply(isla.mMatrix,mMatrix,isla.mMatrix);
      isla.objeto.trasladarHijos(isla.mMatrix);
    }

    this.escalar = function(x,y,z){
      isla.objeto.escalar(isla.mMatrix,x,y,z);
    }

    this.escalar2 = function(mMatrix){
      mat4.multiply(isla.mMatrix,mMatrix,isla.mMatrix);
    }
}
