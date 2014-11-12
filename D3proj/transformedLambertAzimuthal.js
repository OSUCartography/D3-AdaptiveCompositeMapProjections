function transformedLambertAzimuthalRaw(lonB, latB, ratio) {
	var m, n, k, CA, CB, d,
		lonLimit = lonB * Math.PI / 180,
		latLimit = latB * Math.PI / 180,
		lambertAzimuthalEqualArea = d3.geo.azimuthalEqualArea.raw;

	if (Math.abs(lonLimit) > Math.PI)
		lonLimit = Math.PI;
	if (Math.abs(latLimit) > Math.PI / 2)
		latLimit = Math.PI / 2;
	if (Math.abs(lonLimit) < 1E-15)
		lonLimit = 1E-15;
	if (Math.abs(latLimit) < 1E-15)
		latLimit = 1E-15;

	m = Math.abs(Math.sin(latLimit));
	n = Math.abs(lonLimit / Math.PI);

	if ((m === 1) && (n === 1)) {
		return lambertAzimuthalEqualArea;
	}

	k = Math.sqrt(ratio * Math.sin(latLimit / 2) / Math.sin(lonLimit / 2));
	d = Math.sqrt(m * n);
	CA = k / d;
	CB = 1 / (k * d);

	function forward(λ, φ) {
		var coordinates = lambertAzimuthalEqualArea(λ * n, Math.asin(m * Math.sin(φ)));
		coordinates[0] *= CA;
		coordinates[1] *= CB;
		return coordinates;
	}

	forward.invert = function(x, y) {
		var coordinates = lambertAzimuthalEqualArea.invert(x / CA, y / CB);
		coordinates[0] /= n;
		coordinates[1] = Math.asin(Math.sin(coordinates[1]) / m);
		return coordinates;
	};

	return forward;
}

function transformedLambertAzimuthal() {
	var lonLimit = 0, 
		latLimit = 61.9 * Math.PI / 180, 
		ratio = 2.03, 
		mutator = d3.geo.projectionMutator(transformedLambertAzimuthalRaw), 
		projection = mutator(lonLimit, latLimit, ratio);

	projection.parameters = function(lonB, latB, r) {
		return mutator( lonB, latB, r);
	};
	
	return projection;
}

(d3.geo.transformedLambertAzimuthal = transformedLambertAzimuthal).raw = transformedLambertAzimuthal();