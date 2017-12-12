/**
 * BoardCell
 *@brief - constructor of object MyBoardCell
 *@param scene - scene this object belongs to
 */
function BoardCell(scene, sphereRadius, cylinderRadius, topCylinderLength, bottomCylinderLength, leftCylinderLength, rightCylinderLength) {
	CGFobject.call(this, scene);
	this.depth=depth;
	this.sphRadius=sphereRadius;
	this.cylRadius=cylinderRadius;
	this.topCylLen=topCylinderLength;
	this.bottomCylLen=bottomCylinderLength;
	this.leftCylLen=leftCylinderLength;
	this.rightCylLen=rightCylinderLength;
	this.top=Math.max(sphereRadius, topCylinderLength);
	this.bottom=Math.max(sphereRadius, bottomCylinderLength);
	this.left=Math.max(sphereRadius, leftCylinderLength);
	this.right=Math.max(sphereRadius, rightCylinderLength);
	this.initBuffers();

	
};

BoardCell.prototype = Object.create(CGFobject.prototype);
BoardCell.prototype.constructor = BoardCell;

BoardCell.prototype.initBuffers = function (){
	this.vertices=[];
	this.normals=[];
	var inc=0.001;
	for(var i=this.bottom; i<=this.top;i=i+inc){
		
	}
}


/**
*display
*@brief - displays this object
*/
BoardCell.prototype.display = function () {
	
};

/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the BoardCell
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
BoardCell.prototype.amplifFactors = function (ampFactorS, ampFactorT) {
}