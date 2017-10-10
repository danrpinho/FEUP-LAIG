/**
 * Patch
 * @constructor
 */
 
var DEGREE_TO_RAD = Math.PI / 180;

 function MyPatch(scene, udiv, vdiv, controlvertexes) {
 	CGFobject.call(this,scene);
	
	this.udiv=udiv;
	this.vdiv=vdiv;

	var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions
		
	var nurbsSurface = new CGFnurbsSurface(controlvertexes.length-1, controlvertexes[0].length-1, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(this.udiv, this.vdiv);
	};

	this.obj = new CGFnurbsObject(scene, getSurfacePoint, this.udiv, this.vdiv );

 };

 MyPatch.prototype = Object.create(CGFobject.prototype);
 MyPatch.prototype.constructor = MyPatch;



MyPatch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

