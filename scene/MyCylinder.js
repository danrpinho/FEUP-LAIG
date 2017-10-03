/**

 * MyCylinder

 * @constructor

 */

 function MyCylinder(scene, slices, stacks, bottomradius, topradius, height) {

 	CGFobject.call(this,scene);	

	this.slices = slices;

	this.stacks = stacks;

	this.bradius=bottomradius;

	this.tradius=topradius;

	this.height=height;

 	this.initBuffers();

 };



 MyCylinder.prototype = Object.create(CGFobject.prototype);

 MyCylinder.prototype.constructor = MyCylinder;



 MyCylinder.prototype.initBuffers = function() {

 



 	this.vertices = [

 	

 	];

 	this.normals=[];

	var teta=2*Math.PI/this.slices;

 	for(var j=0;j<=this.stacks;j++){

 		for(var i=0;i<this.slices;i++){

 			var radius=(j/(this.stacks))*(this.tradius-this.bradius)+this.bradius;

 			var h=this.height*j/this.stacks;

 			var vx= radius*Math.cos(i*teta);
 			var vy=radius*Math.sin(i*teta);
 			var vz=h;

 			this.vertices.push(vx);

 			this.vertices.push(vy);

 			this.vertices.push(vz);

 			var vnextx=radius*Math.cos(((i+1)%this.slices)*teta);

 			var vnexty=radius*Math.sin(((i+1)%this.slices)*teta);

 			var vnextz=h;

 			var vaboveradius=((j+1)/(this.stacks))*(this.tradius-this.bradius)+this.bradius;

 			var vabovex=vaboveradius*Math.cos(i*teta);

 			var vabovey=vaboveradius*Math.sin(i*teta);

 			var vabovez=this.height*(j+1)/this.stacks;
			
			var v1x=vx-vnextx;
			var v1y=vy-vnexty;
			var v1z=vz-vnextz;
			
			var v2x=vx-vabovex;
			var v2y=vy-vabovey;
			var v2z=vz-vabovez;
			
			
 			this.normals.push(v1y*v2z-v2y*v1z);

			this.normals.push(v1z*v2x-v1x-v2z);

			this.normals.push(v1x*v2y-v1y*v2x);

 		}

 	}

 	



 this.indices=[];



 	for(var j=0;j<this.stacks;j++){

 		for(var i=0;i<this.slices;i++){

 			this.indices.push((j+1)*this.slices+(i+1)%this.slices);

 			this.indices.push(j*this.slices+i);//+0.5

			this.indices.push(j*this.slices+(i+1)%this.slices);

			this.indices.push((j+1)*this.slices+i);//+0.5

 			this.indices.push(j*this.slices+i);//+0.5

 			this.indices.push((j+1)*this.slices+(i+1)%this.slices);

 		}

 	}



 	this.texCoords = [	];



     var s = 0;

	var t = 0;

	var s_inc = 1/this.slices;

	var t_inc = 1/this.stacks;

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