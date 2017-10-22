/**
 * MyQuad
 *@brief - constructor of object MyTriangle
 *@param scene - scene this object belongs to
 *@param x1, y1 - coordinates of the top left vertice
 *@param x2, y2 - coordinates of the bottom down vertice 
 */
function MyQuad(scene, x1, y1, x2, y2) {
	CGFobject.call(this, scene);

	this.minS = 0;
	this.minT = 0;
	this.maxS = x2-x1; 
	this.maxT = y1-y2; 
	this.x1=x1;
	this.y1=y1;
	this.x2=x2;
	this.y2=y2;
	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;


/**
* initBuffers
*@brief - initializes the buffers
*/
MyQuad.prototype.initBuffers = function () {
	this.vertices = [
		this.x1, this.y2, 0,
		this.x2, this.y2, 0,
		this.x1, this.y1, 0,
		this.x2, this.y1, 0,
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

/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the quad
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
MyQuad.prototype.amplifFactors = function(ampFactorS, ampFactorT){
	
	var oldCoords=this.texCoords;

	this.texCoords = [
		this.origCoords[0] / ampFactorS, this.origCoords[1] / ampFactorT,
		this.origCoords[2] / ampFactorS, this.origCoords[3] / ampFactorT,
		this.origCoords[4] / ampFactorS, this.origCoords[5] / ampFactorT,
		this.origCoords[6] / ampFactorS, this.origCoords[7] / ampFactorT,
	];
	if(this.arraysEqual(oldCoords, this.texCoords)===false){
		this.updateTexCoordsGLBuffers();
	}

}

/**
 * arraysEqual
 *@brief - checks if two arrays are equal
 *@param x - first array
 *@param y - second array
 */
MyQuad.prototype.arraysEqual = function(x, y){
	if(x.length!=y.length){
		return false;
	}
	else{
		for(var i=0;i<x.length;i++){
			if(x[i]!==y[i]){
				return false;
			}
		}
	}
	return true;
}