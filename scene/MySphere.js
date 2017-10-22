/**
 * MySphere
 *@brief - constructor of object MySphere
 *@param radius - radius of the sphere
 *@param scene - scene this object belongs to
 *@param slices - slices the sphere is divided in 
 *@param stacks - stacks the sphere is divided in
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

/**
*display
*@brief - displays this object
*/
MySphere.prototype.display = function () {
	this.scene.pushMatrix();
	this.sphere0.display();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.sphere1.display();
	this.scene.popMatrix();
}

/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the cylinder
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
MySphere.prototype.amplifFactors = function(ampFactorS, ampFactorT){
}