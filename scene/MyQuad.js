/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyQuad(scene, x1, y1, x2, y2) {
	CGFobject.call(this, scene);

	// var deltaX = x2 - x1;
	// var deltaY = y1 - y2;

	this.minS = 0;
	this.minT = 0;
	this.maxS = x2-x1; 
	this.maxT = y2-y1; 

	this.initBuffers2(x1, y1, x2, y2);
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.initGLBuffers();
};


MyQuad.prototype.initBuffers2 = function (x1, y1, x2, y2) {
	this.vertices = [
		x1, y2, 0,
		x2, y2, 0,
		x1, y1, 0,
		x2, y1, 0,
	];

	this.indices = [
		0, 1, 2,
		3, 2, 1
	];

	this.origCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
	];

	this.texCoords=this.origCoords;
	this.primitiveType = this.scene.gl.TRIANGLES;

	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

	this.initGLBuffers();
};

MyQuad.prototype.amplifFactors = function(ampFactorS, ampFactorT){

	this.texCoords = [
		this.origCoords[0] / ampFactorS, this.origCoords[1] / ampFactorT,
		this.origCoords[2] / ampFactorS, this.origCoords[3] / ampFactorT,
		this.origCoords[4] / ampFactorS, this.origCoords[5] / ampFactorT,
		this.origCoords[6] / ampFactorS, this.origCoords[7] / ampFactorT,
	];
	this.updateTexCoordsGLBuffers();
}