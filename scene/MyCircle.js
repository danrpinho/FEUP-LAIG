/**
 * MyCircle
 *@brief - constructor of object MyCircle
 *@param scene - scene this object belongs to
 *@param slice - number of slices that the circle is divided in
 */
function MyCircle(scene, slices) {
	CGFobject.call(this, scene);
	this.slices = slices;
	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

/**
* initBuffers
*@brief - initializes the buffers
*/
MyCircle.prototype.initBuffers = function () {

	var teta = 2 * Math.PI / this.slices;
	this.vertices = [0, 0, 0];
	this.normals = [0, 0, 1];
	var teta = 2 * Math.PI / this.slices;
	this.texCoords = [0.5, 0.5];
	for (var i = 0; i < this.slices; i++) {
		this.vertices.push(Math.cos(i * teta));
		this.vertices.push(Math.sin(i * teta));
		this.vertices.push(0);

		this.normals.push(0);
		this.normals.push(0);
		this.normals.push(1);
		this.texCoords.push(Math.cos((this.slices - i) * teta) * 0.5 + 0.5, Math.sin((this.slices - i) * teta) * 0.5 + 0.5);

	}

	this.indices = [];

	for (var i = 0; i < this.slices; i++) {
		this.indices.push(0);
		this.indices.push(i + 1);
		if (i == this.slices - 1)
			this.indices.push(1);
		else
			this.indices.push((i + 2));
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};

