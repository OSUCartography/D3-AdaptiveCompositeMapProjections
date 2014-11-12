function transverseCylindricalEqualAreaRaw(lat0) {
	var projection = d3.geo.cylindricalEqualArea()
						.parallel(lat0);

	function forward(λ, φ) {
		var coordinates = projection([λ, φ]);
		return [-coordinates[1], -coordinates[0]];
	}


	forward.invert = function(x, y) {
		/* Needs extra work*/
		return projection.invert(-y, x);
	};

	return forward;
}

function transverseCylindricalEqualArea() {
	var mutator = d3.geo.projectionMutator(transverseCylindricalEqualAreaRaw), 
		projection = mutator(0);

	projection.parallel = function(phi0) {
		return mutator(phi0);
	};
	
	return projection;
}

(d3.geo.transverseCylindricalEqualArea = transverseCylindricalEqualArea).raw = transverseCylindricalEqualArea();