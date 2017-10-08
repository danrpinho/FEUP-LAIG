/**

 * MyCylinderSurface

 * @constructor

 */

function MyCylinderSurface(scene, slices, stacks, bottomradius, topradius, height) {
	CGFobject.call(this, scene);
	this.slices = slices;
	this.stacks = stacks;
	this.bradius = bottomradius;
	this.tradius = topradius;
	this.height = height;
	this.initBuffers();
};



MyCylinderSurface.prototype = Object.create(CGFobject.prototype);
MyCylinderSurface.prototype.constructor = MyCylinderSurface;

MyCylinderSurface.prototype.initBuffers = function () {
	this.vertices = [];
	this.normals = [];

	var teta = 2 * Math.PI / this.slices;
	for (var j = 0; j <= this.stacks; j++) {
		for (var i = 0; i < this.slices; i++) {
			var radius = (j / (this.stacks)) * (this.tradius - this.bradius) + this.bradius;
			var h = this.height * j / this.stacks;
			var vx = radius * Math.cos(i * teta);
			var vy = radius * Math.sin(i * teta);
			var vz = h;

			this.vertices.push(vx);
			this.vertices.push(vy);
			this.vertices.push(vz);

			this.normals.push(Math.cos(i * teta));
			//console.log(Math.cos(i * teta));
			this.normals.push(Math.sin(i * teta));
			//console.log(Math.sin(i * teta));
			this.normals.push((this.bradius - this.tradius) / this.height);
			//console.log((this.bradius - this.tradius) / this.height);
		}
	}

	this.indices = [];

	for (var j = 0; j < this.stacks; j++) {
		for (var i = 0; i < this.slices; i++) {

			this.indices.push((j + 1) * this.slices + (i + 1) % this.slices);
			this.indices.push(j * this.slices + i);//+0.5
			this.indices.push(j * this.slices + (i + 1) % this.slices);
			this.indices.push((j + 1) * this.slices + i);//+0.5
			this.indices.push(j * this.slices + i);//+0.5
			this.indices.push((j + 1) * this.slices + (i + 1) % this.slices);
		}
	}

	this.texCoords = [];

	var s = 0;
	var t = 0;
	var s_inc = 1 / this.slices;
	var t_inc = 1 / this.stacks;
	for (var i = 0; i <= this.stacks; i++) {
		for (var j = 0; j < this.slices; j++) {
			this.texCoords.push(s, t);
			s += s_inc;
		}
		s = 0;
		t += t_inc;
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};