/**

 * MySphere

 * @constructor

 */

 function MySphere(scene, radius, slices, stacks) {

 	CGFobject.call(this,scene);

	

	this.slices = slices;

	this.stacks = stacks;

	this.radius=radius;

	this.sphere=new MySemiSphere(this.scene,this.radius, this.slices, this.stacks);

 };



 MySphere.prototype = Object.create(CGFobject.prototype);

 MySphere.prototype.constructor = MySphere;



 MySphere.prototype.display = function() {
	this.sphere.display();
	this.scene.rotate(Math.PI, 1,0,0);
	this.sphere.display();
 	    

 };