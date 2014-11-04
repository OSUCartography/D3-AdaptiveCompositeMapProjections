function transformedLambertAzimuthalTransverseRaw(lonB, latB, ratio) {
	var projection = d3.geo.transformedLambertAzimuthal()
			.parameters(lonB, latB, ratio)
			.precision(0.3)
			.scale(10)
			.rotate(0,0,90);

	function forward(λ, φ) {
		var coordinates = projection([λ, φ]);
		return [coordinates[1], -coordinates[0]];
	}


	forward.invert = function(x, y) {
		return projection.invert(-y, x).rotate(0,0,-90);
	};

	return forward;
}

function transformedLambertAzimuthalTransverse() {
	var mutator = d3.geo.projectionMutator(transformedLambertAzimuthalTransverseRaw), 
		projection = mutator(0);

	projection.parameters = function(lonB, latB, ratio) {
		return mutator(lonB, latB, ratio);
	};
	
	return projection;
}

(d3.geo.transformedLambertAzimuthalTransverse = transformedLambertAzimuthalTransverse).raw = transformedLambertAzimuthalTransverse();