var parametricSurface = function(u_steps, v_steps, f) {
		var du = 1,
			dv = 1;
		var vertices = [];

		function fd(u, v) {

			// User function f returns p = [x,y,z] for a given [u,v]

			var p = f(u, v);

			// To compute the normal vector, take the cross product
			// of the tangent vectors computed by finite difference

			var pu = f(u + du, v);
			var ux = pu[0] - p[0],
				uy = pu[1] - p[1],
				uz = pu[2] - p[2];

			var pv = f(u, v + dv);
			var vx = pv[0] - p[0],
				vy = pv[1] - p[1],
				vz = pv[2] - p[2];

			var x = uy * vz - uz * vy;
			var y = uz * vx - ux * vz;
			var z = ux * vy - uy * vx;
			var r = Math.sqrt(x * x + y * y + z * z);

			// return point and normal:

			return [p[0], p[1], p[2], x / r, y / r, z / r];
		}

		// Add a single quad, covering parametric range [u,v] -> [u + du, v+ dv]
		function addQuad(u, v, a, b, c, d) {

			// vertex is a struct  {x,y,z, nx,ny,nz, u,v}
			vertices.push(a[0], a[1], a[2], a[3], a[4], a[5], u, v);
			vertices.push(b[0], b[1], b[2], b[3], b[4], b[5], u + du, v);
			vertices.push(c[0], c[1], c[2], c[3], c[4], c[5], u + du, v + dv);
			vertices.push(d[0], d[1], d[2], d[3], d[4], d[5], u, v + dv);
			vertices.push(a[0], a[1], a[2], a[3], a[4], a[5], u, v);
		}

		// TODO: The following would be more efficient if it created
		// triangle strips in the inner loop

		for (var v = 0; v < v_steps; v++)
			for (var u = 0; u < u_steps; u++) {
				addQuad(u, v, fd(u, v), fd(u + du, v), fd(u + du, v + dv), fd(u, v + dv));
			}
  
  return {
      position: vertices,
      nombre: "superficie",
  };
}
