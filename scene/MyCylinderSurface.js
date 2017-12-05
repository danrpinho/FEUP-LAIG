/**
 * MyCylinderSurface
 *@brief - constructor of object MyCylinderSurface
 *@param scene - scene this object belongs to
 *@param slices - slices the cylinder is divided in
 *@param stacks - stacks the cylinder is divided in
 *@param bottomradius - radius of the bottom base of the cylinder
 *@param topradius - radius of the top base of the cylinder
 *@param height - height of the cylinder
 *@param topCap - boolean that tells if there is a circle on top of this cylinder
 *@param botCap - boolean that tells if there is a circle on the bottom of this cylinder
 */
function MyCylinderSurface(scene, slices, stacks, bottomradius, topradius, height, half=0) {
	CGFobject.call(this, scene);
	this.slices = slices;
	this.stacks = stacks;
	this.bradius = bottomradius;
	this.tradius = topradius;
	this.height = height;
	this.half=half;
	this.initBuffers();
};

MyCylinderSurface.prototype = Object.create(CGFobject.prototype);
MyCylinderSurface.prototype.constructor = MyCylinderSurface;

/**
* initBuffers
*@brief - initializes the buffers
*/
MyCylinderSurface.prototype.initBuffers = function () {
	this.vertices = [];
	this.normals = [];

	var teta = 2 * Math.PI / this.slices;


	var slicesLim=this.slices/(this.half+1); //IF half is on, slices becomes equal to slices/2
	
	for (var j = 0; j <= this.stacks; j++) {
		for (var i = 0; i <= slicesLim; i++) {
			var radius = (j / (this.stacks)) * (this.tradius - this.bradius) + this.bradius;
			var h = this.height * j / this.stacks;
			var vx = radius * Math.cos(i * teta);
			var vy = radius * Math.sin(i * teta);
			var vz = h;

			this.vertices.push(vx);
			this.vertices.push(vy);
			this.vertices.push(vz);

			this.normals.push(Math.cos(i * teta));
			this.normals.push(Math.sin(i * teta));
			this.normals.push((this.bradius - this.tradius) / this.height);
		}
	}

	this.indices = [];
	
	for (var j = 0; j < this.stacks; j++) {
		for (var i = 0; i <= (slicesLim-this.half); i++) {

			this.indices.push((j + 1) * (slicesLim + 1) + (i + 1) % (slicesLim + 1));
			this.indices.push(j * (slicesLim + 1) + i);
			this.indices.push(j * (slicesLim + 1) + (i + 1) % (slicesLim + 1));
			this.indices.push((j + 1) * (slicesLim + 1) + i);
			this.indices.push(j * (slicesLim + 1) + i);
			this.indices.push((j + 1) * (slicesLim + 1) + (i + 1) % (slicesLim + 1));
		
		}
	}

	this.texCoords = [];

	var s = 0;
	var t = 0;
	var s_inc = 1 / slicesLim;
	var t_inc = 1 / this.stacks;
	for (var i = 0; i <= this.stacks; i++) {
		for (var j = 0; j <= slicesLim; j++) {
			this.texCoords.push(s, t);
			s += s_inc;
		}
		s = 0;
		t += t_inc;
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();

}