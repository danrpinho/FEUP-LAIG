/**
 * MyCylinder
 * @constructor
 */

 function MyCylinder(scene, slices, stacks, bottomradius, topradius, height) {
 	CGFobject.call(this,scene);
	this.slices = slices;
	this.stacks = stacks;
	this.br=bottomradius;
	this.tr=topradius;
	this.height=height;
	this.cs=new MyCylinderSurface(this.scene, this.slices, this.stacks, this.br, this.tr,this.height);
	this.circle=new MyCircle(this.scene,this.slices);
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.display = function() {
	this.cs.display();
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI,1,0,0);
	this.scene.scale(this.br,this.br,1);
	this.circle.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(0,0,this.height);
	this.scene.scale(this.tr,this.tr,1);
	this.circle.display();
	this.scene.popMatrix();
 };