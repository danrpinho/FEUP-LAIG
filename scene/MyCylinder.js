/**
 * MyCylinder
 *@brief - constructor of object MyCylinder
 *@param scene - scene this object belongs to
 *@param slices - slices the cylinder is divided in 
 *@param stacks - stacks the cylinder is divided in
 *@param bottomradius - radius of the bottom base of the cylinder 
 *@param topradius - radius of the top base of the cylinder
 *@param height - height of the cylinder
 *@param topCap - boolean that tells if there is a circle on top of this cylinder
 *@param botCap - boolean that tells if there is a circle on the bottom of this cylinder 
 */
function MyCylinder(scene, slices, stacks, bottomradius, topradius, height, topCap, botCap) {
	CGFobject.call(this, scene);
	this.slices = slices;
	this.stacks = stacks;
	this.br = bottomradius;
	this.tr = topradius;
	this.height = height;
	this.topCap = topCap;
	this.botCap = botCap;
	this.cs = new MyCylinderSurface(this.scene, this.slices, this.stacks, this.br, this.tr, this.height);
	this.circle = new MyCircle(this.scene, this.slices);
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

/**
*display
*@brief - displays this object
*/
MyCylinder.prototype.display = function () {
	this.cs.display();

	//base
	if (this.botCap == 1) {
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.scene.scale(this.br, this.br, 1);
		this.circle.display();
		this.scene.popMatrix();
	}
	
	//top
	if (this.topCap == 1) {
		this.scene.pushMatrix();
		this.scene.translate(0, 0, this.height);
		this.scene.scale(this.tr, this.tr, 1);
		this.circle.display();
		this.scene.popMatrix();
	}
};

/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the cylinder
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
MyCylinder.prototype.amplifFactors = function (ampFactorS, ampFactorT) {
}