/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
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

	this.minS = 0;
	this.minT = 0;
	this.maxS = 1; //length/ampFactor;
	this.maxT = 1; //height/ampFactor;

	this.initBuffers2(x1, y1, z1, x2, y2, z2, x3, y3, z3);
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function () {
	this.initGLBuffers();
};

MyTriangle.prototype.initBuffers2 = function (x1, y1, z1, x2, y2, z2, x3, y3, z3) {

	//variaveis para calcular a normal a partir dos vertices do triangulo
	var a = x2 - x1;
	var b = y2 - y1;
	var c = z2 - z1;
	var d = x3 - x1;
	var e = y3 - y1;
	var f = z3 - z1;

	this.vertices = [
		x1, y1, z1,
		x2, y2, z2,
		x3, y3, z3,
	];

	this.indices = [
		0, 1, 2,
	];

	//TODO
	this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
	];
	this.primitiveType = this.scene.gl.TRIANGLES;

	this.normals = [
		b * f - c * e, d * c - a * f, a * e - d * b,
		b * f - c * e, d * c - a * f, a * e - d * b,
		b * f - c * e, d * c - a * f, a * e - d * b,
	];

	this.initGLBuffers();
};

MyTriangle.prototype.amplifFactors = function(ampFactorS, ampFactorT){
	// var deltaX = x2 - x1;
	// var deltaY = y1 - y2;

	// this.texCoords = [
	// 	0, deltaY / ampFactor,
	// 	deltaX / ampFactor, deltaY / ampFactor,
	// 	0, 0,
	// 	deltaX / ampFactor, 0
	// ];

	// this.updateTexCoordsGLBuffers();
}