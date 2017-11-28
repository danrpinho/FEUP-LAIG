var DEGREE_TO_RAD = Math.PI / 180;

/**
 * MyCylinder
 *@brief - constructor of object MyCylinder
 *@param scene - scene this object belongs to
 *@param udiv - divisions along the surface u
 *@param vdiv - divisions along the surface v
 *@param controlvertexes - matrix that contains the controlvertexes of the patch
 */
function MyPatch(scene, udiv, vdiv, controlvertexes) {
	CGFobject.call(this, scene);

	this.udiv = udiv;
	this.vdiv = vdiv;
	this.controlvertexes = controlvertexes;
	var knots1 = this.getKnotsVector(this.controlvertexes.length - 1);
	var knots2 = this.getKnotsVector(this.controlvertexes[0].length - 1);

	var nurbsSurface = new CGFnurbsSurface(this.controlvertexes.length - 1, this.controlvertexes[0].length - 1, knots1, knots2, this.controlvertexes);
	getSurfacePoint = function (u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.obj = new CGFnurbsObject(scene, getSurfacePoint, this.udiv, this.vdiv);

};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

/**
 * getKnotsVector
 *@brief - gets knots vector of the patch, according to what was told in class
 *@param degree - degree of the patch
 */
MyPatch.prototype.getKnotsVector = function (degree) {

	var v = new Array();
	for (var i = 0; i <= degree; i++) {
		v.push(0);
	}
	for (var i = 0; i <= degree; i++) {
		v.push(1);
	}
	return v;
}

/**
*display
*@brief - displays this object
*/
MyPatch.prototype.display = function () {
	this.obj.display();
}

/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the cylinder
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
MyPatch.prototype.amplifFactors = function (ampFactorS, ampFactorT) {
}