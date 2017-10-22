/**

 * MySphere

 * @constructor

 */

function MySphere(scene, radius, slices, stacks) {
	CGFobject.call(this, scene);
	this.slices = slices;
	this.stacks = stacks;
	this.radius = radius;
	this.sphere0 = new MySemiSphere(this.scene, this.radius, this.slices, this.stacks, 0);
	this.sphere1 = new MySemiSphere(this.scene, this.radius, this.slices, this.stacks, 1);

};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.display = function () {
	this.scene.pushMatrix();
	this.sphere0.display();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.sphere1.display();
	this.scene.popMatrix();
}


MySphere.prototype.amplifFactors = function(ampFactorS, ampFactorT){
}