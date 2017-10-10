/**
 * Patch
 * @constructor
 */
 
var DEGREE_TO_RAD = Math.PI / 180;

 function Patch(scene) {
 	CGFobject.call(this,scene);
	

 	this.initBuffers();
 };

 Patch.prototype = Object.create(CGFobject.prototype);
 Patch.prototype.constructor = Patch;

 Patch.prototype.initBuffers = function() {
 


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
