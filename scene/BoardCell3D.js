/**
 * BoardCell3D
 *@brief - constructor of object MyBoardCell3D
 *@param scene - scene this object belongs to
 */
function BoardCell3D(scene, sphereRadius, cylinderRadius, topCylinderLength, bottomCylinderLength, leftCylinderLength, rightCylinderLength) {
	CGFobject.call(this, scene);
	this.sphereRadius=sphereRadius;
	this.cylinderRadius=Math.max(cylinderRadius, 0.002);
	this.topCylLen=topCylinderLength;
	this.bottomCylLen=bottomCylinderLength;
	this.leftCylLen=leftCylinderLength;
	this.rightCylLen=rightCylinderLength;
	
	this.boardCell= new BoardCell(scene, sphereRadius, cylinderRadius, topCylinderLength, bottomCylinderLength, leftCylinderLength, rightCylinderLength);
	this.
	this.initBuffers();

	
};

BoardCell3D.prototype = Object.create(CGFobject.prototype);
BoardCell3D.prototype.constructor = BoardCell3D;




/**
*display
*@brief - displays this object
*/


/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the BoardCell3D
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
BoardCell3D.prototype.amplifFactors = function (ampFactorS, ampFactorT) {
}