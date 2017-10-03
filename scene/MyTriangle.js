/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
	CGFobject.call(this, scene);
	
	// this.minS = 0;
	// this.minT = 0;
	// this.maxS = 1;
	// this.maxT = 1;

	this.initBuffers2(x1, y1, z1, x2, y2, z2, x3, y3, z3);
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function () {
	this.initGLBuffers();
};

MyTriangle.prototype.initBuffers2 = function (x1, y1, z1, x2, y2, z2, x3, y3, z3) {
	//variaveis para calcular a normal a partir dos vertices do triangulo
	var a = x2-x1;
	var b = y2-y1;
	var c = z2-z1;
	var d = x3-x1;
	var e = y3-y1;
	var f = z3-z1;

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
		b*f-c*e, d*c-a*f, a*e-d*b,
		b*f-c*e, d*c-a*f, a*e-d*b,
		b*f-c*e, d*c-a*f, a*e-d*b,
	];

	this.initGLBuffers();
};