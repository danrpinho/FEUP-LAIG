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

	/*//TODO
	this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
	];*/
	var l=Math.sqrt(Math.pow(a,2)+Math.pow(b,2)+Math.pow(c,2));
	var n=Math.sqrt(Math.pow(d,2)+Math.pow(e,2)+Math.pow(f,2));
	var m=Math.sqrt(Math.pow(x2-x3,2)+Math.pow(y2-y3,2)+Math.pow(z2-z3,2));
	this.origCoords=[
		0,0,
		l,0,
		(Math.pow(l,2)-Math.pow(m,2)+Math.pow(n,2))/(2*l),-Math.sqrt(-Math.pow(m,4)-Math.pow(n,4)-Math.pow(l,4)+2*Math.pow(n,2)*Math.pow(l,2)+2*Math.pow(l,2)*Math.pow(m,2)+2*Math.pow(m,2)*Math.pow(n,2))/(2*l)

	];
	this.texCoords=this.origCoords;
	this.primitiveType = this.scene.gl.TRIANGLES;

	this.normals = [
		b * f - c * e, d * c - a * f, a * e - d * b,
		b * f - c * e, d * c - a * f, a * e - d * b,
		b * f - c * e, d * c - a * f, a * e - d * b,
	];

	this.initGLBuffers();
};

MyTriangle.prototype.amplifFactors = function(ampFactorS, ampFactorT){
	
	var oldCoords=this.texCoords;
	
	this.texCoords = [
	 	0, 0,
	 	this.origCoords[2]/ ampFactorS, 0,
	 	this.origCoords[4]/ ampFactorS, this.origCoords[5]/ ampFactorT,
	 ];
	 
	
	if(this.arraysEqual(oldCoords, this.texCoords)===false){
		//console.log("different triangle",oldCoords, this.texCoords);
		this.updateTexCoordsGLBuffers();
	}
	else{
		//console.log("equal triangle",oldCoords,this.texCoords);
	}
	 
}

MyTriangle.prototype.arraysEqual = function(x, y){
	if(x.length!=y.length){
		return false;
	}
	else{
		for(var i=0;i<x.length;i++){
			if(x[i]!==y[i]){
				//console.log("arraysEqual different triangle",i, x[i],y[i]);
				return false;
			}
		}
	}
	return true;
}