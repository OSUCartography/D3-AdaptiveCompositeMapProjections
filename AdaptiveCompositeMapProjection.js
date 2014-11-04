function PortraitMapACMP(scale, coords) {
	
	if (coords[1] > 90) {
		coords[1] = 90;
	}
	if (coords[1] < -90) {
		coords[1] = -90;
	}
	
	//SMALL-SCALE map projection
	if (scale <= 1.5) {
		d3.select("#proj").text("Pseudocylindrical");
		currentProj = "pseudocylindrical";
		return d3.geo.transformedLambertAzimuthal()
			.parameters(0, 61.9, 2.03)
			.precision(0.3)
			.scale(scale * 90)
			.rotate([coords[0],coords[1]]);
			
	//Transition to MEDIUM-SCALE map projection
	} else if (scale <= 2.0) {
		d3.select("#proj").text("Wagner's transformation of the Lambert azimuthal");
		currentProj = "wagner";
		return d3.geo.transformedLambertAzimuthal()
			.parameters((scale - 1.5) * 360.0, (scale - 1.5) * 56.2 + 61.9, (scale - 1.5) * 2 * (Math.sqrt(2) - 2.03) + 2.03)
			.precision(0.3)
			.scale(scale * 90)
			.rotate([coords[0],coords[1]]);
	
	//MEDIUM-SCALE map projection		
	} else if (scale <= 4.0) {
		d3.select("#proj").text("Lambert azimuthal");
		currentProj = "lambert";
		return d3.geo.azimuthalEqualArea()
			.scale(scale * 90)
			.precision(0.3)
			.clipAngle(180 - 1e-3)
			.rotate(coords);
		
	//Transition to LARGE-SCALE map projection
	/*
	//Transition needs to be implemented
	} else if (scale <= 6.0) {
		
	}
	*/	
	
	//LARGE-SCALE map projection
	} else {
		d3.select("#proj").text("Transverse cylindrical");
		currentProj = "transCylindrical";
		return d3.geo.transverseCylindricalEqualArea()
			.parallel(0)
			.scale(scale * 90)
			.precision(0.1)
			.rotate([coords[0],coords[1],90]);
	}
}


function SquareMapACMP(scale, coords) {
	
	if (coords[1] > 90) {
		coords[1] = 90;
	}
	if (coords[1] < -90) {
		coords[1] = -90;
	}
	
	//SMALL-SCALE map projection
	if (scale <= 1.5) {
		d3.select("#proj").text("Pseudocylindrical");
		currentProj = "pseudocylindrical";
		return d3.geo.transformedLambertAzimuthal()
			.parameters(0, 61.9, 2.03)
			.precision(0.3)
			.scale(scale * 90)
			.rotate([coords[0],coords[1]]);
			
	//Transition to MEDIUM-SCALE map projection
	} else if (scale <= 2.0) {
		d3.select("#proj").text("Wagner's transformation of the Lambert azimuthal");
		currentProj = "wagner";
		return d3.geo.transformedLambertAzimuthal()
			.parameters((scale - 1.5) * 360.0, (scale - 1.5) * 56.2 + 61.9, (scale - 1.5) * 2 * (Math.sqrt(2) - 2.03) + 2.03)
			.precision(0.3)
			.scale(scale * 90)
			.rotate([coords[0],coords[1]]);
			
	//MEDIUM- AND LARGE-SCALE map projection
	} else {
		d3.select("#proj").text("Lambert azimuthal");
		currentProj = "lambert";
		return d3.geo.azimuthalEqualArea()
			.scale(scale * 90)
			.precision(0.3)
			.clipAngle(180 - 1e-3)
			.rotate(coords);
	}
}


function LandscapeMapACMP(scale, coords) {

	if (coords[1] > 90) {
		coords[1] = 90;
	}
	if (coords[1] < -90) {
		coords[1] = -90;
	}
	
	//SMALL-SCALE map projection
	if (scale <= 1.5) {
		d3.select("#proj").text("Pseudocylindrical");
		currentProj = "pseudocylindrical";
		return d3.geo.transformedLambertAzimuthal()
			.parameters(0, 61.9, 2.03)
			.precision(0.3)
			.scale(scale * 90)
			.rotate(coords);
		
	//Transition to MEDIUM-SCALE map projection
	} else if (scale <= 2.0) {
		d3.select("#proj").text("Wagner's transformation of the Lambert azimuthal");
		currentProj = "hammer";
		return d3.geo.transformedLambertAzimuthal()
			.parameters((scale - 1.5) * 360.0, (scale - 1.5) * 56.2 + 61.9, (scale - 1.5) * 2 * (Math.sqrt(2) - 2.03) + 2.03)
			.precision(0.3)
			.scale(scale * 90)
			.rotate(coords);
			
	//MEDIUM-SCALE map projection
	} else if (scale <= 4.0) {
		d3.select("#proj").text("Lambert azimuthal");
		currentProj = "lambert";
		return d3.geo.azimuthalEqualArea()
			.scale(scale * 90)
			.precision(0.3)
			.clipAngle(180 - 1e-3)
			.rotate(coords);
			
			
	//Transition to LARGE-SCALE map projection
	/*
	//Transition needs to be implemented
	} else if (scale <= 6.0) {
		
	}
	*/	
	
	//LARGE-SCALE map projection
	} else {
		currentProj = "albers";
		/*Polar projections needs to be shifted correctly*/
		if (coords[1] < -75) {
			//Displaying north pole areas
			d3.select("#proj").text("Lambert azimuthal polar");
			return d3.geo.azimuthalEqualArea()
				.scale(scale * 90)
				.rotate([coords[0], -90])
				.clipAngle(180 - 1e-3)
				.translate([width / 2, height / 2])
				.precision(.1);

		} else if (coords[1] > 75) {
			//Displaying south pole areas
			d3.select("#proj").text("Lambert azimuthal polar");
			return d3.geo.azimuthalEqualArea()
				.scale(scale * 90)
				.rotate([coords[0], 90])
				.clipAngle(180 - 1e-3)
				.translate([width / 2, height / 2])
				.precision(.1);

		} else if (Math.abs(coords[1]) < 15) {
			d3.select("#proj").text("Lambert cylindrical");
			return d3.geo.cylindricalEqualArea()
				.rotate([coords[0], 0])
				.center([0, -coords[1]])
				.scale(scale * 90)
				.translate([width / 2, height / 2])
				.precision(.1);

		} else {
			var phi1 = -coords[1] - scale, phi2 = -coords[1] + scale, phi0 = -coords[1];

			d3.select("#proj").text("Alberts conic with adjusted standard parallels");

			if (Math.abs(phi0) < 22) {
				phi1 = phi1 * (Math.abs(phi0) - 15) / 7;
				phi2 = phi2 * (Math.abs(phi0) - 15) / 7;
			} else if (phi0 > 60) {
				phi1 = (90 - phi1) * (phi0 - 60) / 15 + phi1;
				phi2 = (90 - phi2) * (phi0 - 60) / 15 + phi2;
			} else if (phi0 < -60) {
				phi1 = (-90 - phi1) * (phi0 + 60) / -15 + phi1;
				phi2 = (-90 - phi2) * (phi0 + 60) / -15 + phi2;
			} else {
				d3.select("#proj").text("Alberts conic");
			}

			coords = (coords[0] == 0) ? [0.01, 0.01] : coords;
			return d3.geo.albers()
				.rotate([coords[0], 0])
				.center([0, -coords[1]])
				.parallels([phi1, phi2])
				.scale(scale * 90)
				.translate([width / 2, height / 2])
				.precision(.1);
		}
	}
}