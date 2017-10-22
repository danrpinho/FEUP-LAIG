/**

 * MySemiSphere

 * @constructor
 * @param

 */

function MySemiSphere(scene, radius, slices, stacks, tex) {

	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;
	this.radius = radius;
	this.tex=tex;

	this.initBuffers();
};



MySemiSphere.prototype = Object.create(CGFobject.prototype);
MySemiSphere.prototype.constructor = MySemiSphere;

MySemiSphere.prototype.initBuffers = function () {
	var teta = 2 * Math.PI / this.slices;

	this.vertices = [];
	this.normals = [];
	this.texCoords = [];

	var teta = 2 * Math.PI / this.slices;
	for (var j = 0; j <= this.stacks; j++) {
		for (var i = 0; i <= this.slices; i++) {
			var k = this.radius * Math.sqrt(1 - Math.pow(j / this.stacks, 2));
			this.vertices.push(k * Math.cos(i * teta));
			this.vertices.push(k * Math.sin(i * teta));			
			this.vertices.push(this.radius * j / this.stacks);
			this.normals.push(k * Math.cos(i * teta));
			this.normals.push(k * Math.sin(i * teta));
			this.normals.push(this.radius * j / this.stacks);
		}

	}
	

	this.indices = [];
	console.log(this.vertices.length/3);
	console.log((this.stacks+1)*this.slices+this.stacks-1+1);
	for (var j = 0; j < this.stacks; j++) {
		for (var i = 0; i <= this.slices; i++) {
			var a=j * (this.slices+1) + i;
			var b=j * (this.slices+1) + (i + 1) % (this.slices+1);
			var c=(j + 1) * (this.slices+1) + i;
			var d=(j + 1) * (this.slices+1) + (i + 1) % (this.slices+1);
			this.indices.push(d);
			this.indices.push(a);
			this.indices.push(b);
			this.indices.push(c);
			this.indices.push(a);
			this.indices.push(d);
			

		}
	}

	this.texCoords = [];
	if(this.tex==0){
		for (var i = 0; i <= this.stacks; i++) {
			for (var j = 0; j <= this.slices; j++) {
				this.texCoords.push(j/this.slices, i/this.stacks);
			}
		}
		
	}
	else if(this.tex==1){
		for (var i = 0; i <= this.stacks; i++) {
			for (var j = this.slices; j >= 0; j--) {
				this.texCoords.push(j/this.slices, i/this.stacks);
			}
		}
	}
	this.primitiveType = this.scene.gl.TRIANGLES;

	this.initGLBuffers();

};