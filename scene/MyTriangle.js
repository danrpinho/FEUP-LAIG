/**
 * MyTriangle
 *@brief - constructor of object MyTriangle
 *@param scene - scene this object belongs to
 *@param x1, y1, z1 - coordinates of the first vertice
 *@param x2, y2, z2 - coordinates of the second vertice
 *@param x3, y3, z3 - coordinates of the third vertice
 */
function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
	CGFobject.call(this, scene);

	// //calcular produto escalar para obter o angulo no ponto 1
	// var a = x2 - x1;
	// var b = y2 - y1;
	// var c = z2 - z1;
	// var d = x3 - x1;
	// var e = y3 - y1;
	// var f = z3 - z1;
	// var prodEscalar = a*d+b*e+c*f;

	// //calcular comprimentos dos lados que saem do ponto 1
	// var length = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1));
	// var length13 = Math.sqrt((x3-x1)*(x3-x1) + (y3-y1)*(y3-y1) + (z3-z1)*(z3-z1));
	// var cosAng = prodEscalar/(length*length13);

	// //calcular altura do triangulo a partir das medidas obtidas anteriormente
	// //(height = length13*sin(ang))
	// var height = length13 * Math.sqrt(1-(cosAng*cosAng));

	this.x1 = x1;
	this.y1 = y1;
	this.z1 = z1;
	this.x2 = x2;
	this.y2 = y2;
	this.z2 = z2;
	this.x3 = x3;
	this.y3 = y3;
	this.z3 = z3;

	this.minS = 0;
	this.minT = 0;
	this.maxS = 1;
	this.maxT = 1;

	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

/**
* initBuffers
*@brief - initializes the buffers
*/
MyTriangle.prototype.initBuffers = function () {
	this.initGLBuffers();
};

/**
* initBuffers
*@brief - initializes the buffers
*/
MyTriangle.prototype.initBuffers = function () {

	//variaveis para calcular a normal a partir dos vertices do triangulo
	var a = this.x2 - this.x1;
	var b = this.y2 - this.y1;
	var c = this.z2 - this.z1;
	var d = this.x3 - this.x1;
	var e = this.y3 - this.y1;
	var f = this.z3 - this.z1;

	this.vertices = [
		this.x1, this.y1, this.z1,
		this.x2, this.y2, this.z2,
		this.x3, this.y3, this.z3,
	];

	this.indices = [
		0, 1, 2,
	];

	var l = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2));
	var n = Math.sqrt(Math.pow(d, 2) + Math.pow(e, 2) + Math.pow(f, 2));
	var m = Math.sqrt(Math.pow(this.x2 - this.x3, 2) + Math.pow(this.y2 - this.y3, 2) + Math.pow(this.z2 - this.z3, 2));
	this.origCoords = [
		0, 0,
		l, 0,
		(Math.pow(l, 2) - Math.pow(m, 2) + Math.pow(n, 2)) / (2 * l), -Math.sqrt(-Math.pow(m, 4) - Math.pow(n, 4) - Math.pow(l, 4) + 2 * Math.pow(n, 2) * Math.pow(l, 2) + 2 * Math.pow(l, 2) * Math.pow(m, 2) + 2 * Math.pow(m, 2) * Math.pow(n, 2)) / (2 * l)

	];
	this.texCoords = this.origCoords;
	this.primitiveType = this.scene.gl.TRIANGLES;

	this.normals = [
		b * f - c * e, d * c - a * f, a * e - d * b,
		b * f - c * e, d * c - a * f, a * e - d * b,
		b * f - c * e, d * c - a * f, a * e - d * b,
	];

	this.initGLBuffers();
};

/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the triangle
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
MyTriangle.prototype.amplifFactors = function (ampFactorS, ampFactorT) {

	var oldCoords = this.texCoords;

	this.texCoords = [
		0, 0,
		this.origCoords[2] / ampFactorS, 0,
		this.origCoords[4] / ampFactorS, this.origCoords[5] / ampFactorT,
	];

	if (this.arraysEqual(oldCoords, this.texCoords) === false) {
		this.updateTexCoordsGLBuffers();
	}
}

/**
 * arraysEqual
 *@brief - checks if two arrays are equal
 *@param x - first array
 *@param y - second array
 */
MyTriangle.prototype.arraysEqual = function (x, y) {
	if (x.length != y.length) {
		return false;
	}
	else {
		for (var i = 0; i < x.length; i++) {
			if (x[i] !== y[i]) {
				return false;
			}
		}
	}
	return true;
}