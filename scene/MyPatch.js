/**
 * Patch
 * @constructor
 */
 
var DEGREE_TO_RAD = Math.PI / 180;

 function Patch(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 Patch.prototype = Object.create(CGFobject.prototype);
 Patch.prototype.constructor = Patch;

 Patch.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/


	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];

	var anguloFatia = 360/this.slices * degToRad; 


	var x1,y1,z1,x2,y2,z2;

	var ang = 0;
	var indice1 = 0;

	for(face = 0; face < this.slices ; face++){
	ang = anguloFatia*face;
	x1 = Math.cos(ang);
	y1 = Math.sin(ang);
	z1 = 0.0;
	x2 = Math.cos(ang+anguloFatia);
	y2 = Math.sin(ang+anguloFatia);
	z2 = 0.0;

	xN1 = Math.cos(ang+anguloFatia/2);
	yN1 = Math.sin(ang+anguloFatia/2);
	zN1 = 0.0;
	N1 = Math.sqrt(xN1*xN1 + yN1*yN1);
	var zed = 1/this.stacks;
	for(z1 = 0; z1 <=1 ; z1+= 1/this.stacks){

		//ponto 0
		this.vertices.push(x1);
		this.vertices.push(y1);
		this.vertices.push(z1);
		this.normals.push(x1);
		this.normals.push(y1);
		this.normals.push(0.0);

		//this.texCoords.push(1,1);
		this.texCoords.push(face/this.slices,1-z1);
		this.indices.push(indice1);
		indice1++;

		//ponto 2
		this.vertices.push(x2);
		this.vertices.push(y2);
		this.vertices.push(z1+zed);
		this.normals.push(x2);
		this.normals.push(y2);
		this.normals.push(0.0);

		//this.texCoords.push(0,0);
		this.texCoords.push((face+1)/this.slices,1-z1-zed);
		this.indices.push(indice1);
		indice1++;

		// ponto 1
		this.vertices.push(x1);
		this.vertices.push(y1);
		this.vertices.push(z1+zed);

		this.normals.push(x1);
		this.normals.push(y1);
		this.normals.push(0.0);

		//this.texCoords.push(0,1);
		this.texCoords.push(face/this.slices,1-z1-zed);
		this.indices.push(indice1);

		//////////////////////////////////////////////////////////////////
		//PARA SE VER DE DENTRO PARA FORA
		this.indices.push(indice1);
		this.indices.push(indice1-1);
		this.indices.push(indice1-2);
		indice1++;
		///////////////////////////////////////////////////////////////////

		//ponto 3
		this.vertices.push(x2);
		this.vertices.push(y2);
		this.vertices.push(z1);
		this.normals.push(x2);
		this.normals.push(y2);
		this.normals.push(0.0);

		//this.texCoords.push(1,0);
		this.texCoords.push((face+1)/this.slices,1-z1);
		this.indices.push(indice1);
		indice1++;

		//ponto 2
		this.vertices.push(x2);
		this.vertices.push(y2);
		this.vertices.push(z1+zed);
		this.normals.push(x2);
		this.normals.push(y2);
		this.normals.push(0.0);

		//this.texCoords.push(0,0);
		this.texCoords.push((face+1)/this.slices,1-z1-zed);
		this.indices.push(indice1);
		indice1++;

		//ponto 0
		this.vertices.push(x1);
		this.vertices.push(y1);
		this.vertices.push(z1);
		this.normals.push(x1);
		this.normals.push(y1);
		this.normals.push(0.0);

		//this.texCoords.push(1,1);
		this.texCoords.push(face/this.slices,1-z1);
		this.indices.push(indice1);



		//////////////////////////////////////////////////////////////
		//PARA SE VER DE DENTRO PA FORA
		this.indices.push(indice1);
		this.indices.push(indice1-1);
		this.indices.push(indice1-2);
		indice1++;
		///////////////////////////////////////////////////////////////
		}


	}





// 	this.vertices = [];
// 	this.normals = [];
// 	this.indices = [];
// 	var anguloFatia = 360/this.slices * degToRad;

// // 	this.vertices.push(0.0);
// // 	this.vertices.push(0.0);
// // 	this.vertices.push(0.0);

// 	for(zcol = 0.0 ; zcol < this.stacks; zcol+=(1/this.stacks)){
// 	var xAntigo = 1.0;
// 	var yAntigo = 0.0;
// 	var zAntigo = zcol;

// 	var xNovo, yNovo, zNovo;
// 	var a,b,c;
// 	var normaVetor;
// 	var xNorma;
// 	var yNorma;
// 	var zNorma;

// 	//face dianteira
// 	for(i = 1; i <= this.slices ; i++){
// 		xNovo = Math.cos(i*anguloFatia);
// 		yNovo = Math.sin(i*anguloFatia);
// 		zNovo = zcol;

// 		this.vertices.push(xAntigo);
// 		this.vertices.push(yAntigo);
// 		this.vertices.push(zAntigo);

// 		this.vertices.push(xNovo);
// 		this.vertices.push(yNovo);
// 		this.vertices.push(zNovo);

// // 		a = xNovo - xAntigo;
// // 		b = yNovo - yAntigo;
// // 		c = zcol;

// // 		normaVetor = Math.sqrt(b*b + a*a);
// // 		xNorma = b/normaVetor;
// // 		yNorma = -1*a /normaVetor;
// // 		zNorma = 0.0;

// 		normaVetor = Math.sqrt(xAntigo*xAntigo + yAntigo*yAntigo + zAntigo*zAntigo);
// 		xNorma = xAntigo/normaVetor;
// 		yNorma = yAntigo/normaVetor;
// 		zNorma = zAntigo/normaVetor;

// 		this.normals.push(xNorma);
// 		this.normals.push(yNorma);
// 		this.normals.push(zNorma);

// 		normaVetor = Math.sqrt(xNovo*xNovo + yNovo*yNovo + zNovo*zNovo);
// 		xNorma = xNovo/normaVetor;
// 		yNorma = yNovo/normaVetor;
// 		zNorma = zNovo/normaVetor;

// 		this.normals.push(xNorma);
// 		this.normals.push(yNorma);
// 		this.normals.push(zNorma);

// 		xAntigo = xNovo;
// 		yAntigo = yNovo;
// 		zAntigo = zNovo;
// 	}

// 	//face traseira
// 	var xAntigo = 1.0;
// 	var yAntigo = 0.0;
// 	var zAntigo = zcol+0.5;
// 	for(i = 1; i <= this.slices ; i++){
// 		xNovo = Math.cos(i*anguloFatia);
// 		yNovo = Math.sin(i*anguloFatia);
// 		zNovo = zcol+0.5;

// 		this.vertices.push(xAntigo);
// 		this.vertices.push(yAntigo);
// 		this.vertices.push(zAntigo);

// 		this.vertices.push(xNovo);
// 		this.vertices.push(yNovo);
// 		this.vertices.push(zNovo);

// // 		a = xNovo - xAntigo;
// // 		b = yNovo - yAntigo;
// // 		c = zcol+0.5;

// // 		normaVetor = Math.sqrt(b*b + a*a);
// // 		xNorma = b/normaVetor;
// // 		yNorma = -a /normaVetor;
// // 		zNorma = 0;

// 		normaVetor = Math.sqrt(xAntigo*xAntigo + yAntigo*yAntigo + zAntigo*zAntigo);
// 		xNorma = xAntigo/normaVetor;
// 		yNorma = yAntigo/normaVetor;
// 		zNorma = zAntigo/normaVetor;

// 		this.normals.push(xNorma);
// 		this.normals.push(yNorma);
// 		this.normals.push(zNorma);

// 		normaVetor = Math.sqrt(xNovo*xNovo + yNovo*yNovo + zNovo*zNovo);
// 		xNorma = xNovo/normaVetor;
// 		yNorma = yNovo/normaVetor;
// 		zNorma = zNovo/normaVetor;
// 		this.normals.push(xNorma);
// 		this.normals.push(yNorma);
// 		this.normals.push(zNorma);

// 		xAntigo = xNovo;
// 		yAntigo = yNovo;
// 		zAntigo = zNovo;
// 	}

// 	for(i = 0; i < this.slices; i++){
// 		//+zcol*2*this.slices factor de ajuste pa todos
// 		this.indices.push((2*i+2*this.slices+zcol*2*this.slices));
// 		this.indices.push(2*i+zcol*2*this.slices);
// 		this.indices.push(2*i+1+zcol*2*this.slices);

		
// 		this.indices.push((2*i+2*this.slices+zcol*2*this.slices));
// 		this.indices.push(2*i+1+zcol*2*this.slices);
// 		this.indices.push(((2*i+2*this.slices)+1+zcol*2*this.slices));
// 	}  




		
// 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
