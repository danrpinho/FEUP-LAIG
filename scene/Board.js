/**
 * Board
 *@brief - constructor of object MyBoard
 *@param scene - scene this object belongs to
 */
function Board(scene, sphereRadius, cylinderRadius,  spaceBetweenSpheres, sphereHeight) {
	CGFobject.call(this, scene);
	this.sphereRadius=sphereRadius;
	this.cylinderRadius=cylinderRadius;
	this.spaceBetweenSpheres=spaceBetweenSpheres;
	this.sphereHeight=sphereHeight;
	
	this.cylinderLength=spaceBetweenSpheres/2+this.sphereRadius;
	this.cellInterior=new BoardCell(scene, sphereRadius, cylinderRadius, this.cylinderLength, this.cylinderLength, this.cylinderLength, this.cylinderLength);

	this.cellFrontierTop=new BoardCell(scene, sphereRadius, cylinderRadius, 0, this.cylinderLength, this.cylinderLength, this.cylinderLength);
	this.cellFrontierBottom=new BoardCell(scene, sphereRadius, cylinderRadius, this.cylinderLength, 0, this.cylinderLength, this.cylinderLength);
	this.cellFrontierLeft=new BoardCell(scene, sphereRadius, cylinderRadius, this.cylinderLength, this.cylinderLength, 0, this.cylinderLength);
	this.cellFrontierRight=new BoardCell(scene, sphereRadius, cylinderRadius, this.cylinderLength, this.cylinderLength, this.cylinderLength, 0);

	this.cellCornerTopLeft=new BoardCell(scene, sphereRadius, cylinderRadius, 0, this.cylinderLength, 0, this.cylinderLength);
	this.cellCornerTopRight=new BoardCell(scene, sphereRadius, cylinderRadius, 0, this.cylinderLength, this.cylinderLength, 0);
	this.cellCornerBottomLeft=new BoardCell(scene, sphereRadius, cylinderRadius, this.cylinderLength, 0, 0, this.cylinderLength);
	this.cellCornerBottomRight=new BoardCell(scene, sphereRadius, cylinderRadius, this.cylinderLength, 0, this.cylinderLength, 0);

	this.semiSphere=new MySemiSphere(scene, sphereRadius, 50, 50, 0, 1);

	this.cylinderHeight = spaceBetweenSpheres + 2*sphereRadius - 2*Math.sqrt(sphereRadius*sphereRadius-cylinderRadius*cylinderRadius);
	this.cylinder = new MyCylinderSurface(scene, 80, 1, this.cylinderRadius, this.cylinderRadius, this.cylinderHeight, 1);

	this.appearance=new CGFappearance(scene);
	this.appearance.loadTexture("./scenes/images/tela.jpg");


};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor = Board;

/**
*display
*@brief - displays this object
*/
Board.prototype.display = function () {
	this.cellCornerTopLeft.display();
	for(var i=1; i<=5; i++){
		this.scene.pushMatrix();
		this.scene.translate(i*(this.spaceBetweenSpheres+2*this.sphereRadius), 0, 0);
		this.cellFrontierTop.display();
		this.scene.popMatrix();
	}
	this.scene.pushMatrix();
	this.scene.translate(6*(this.spaceBetweenSpheres+2*this.sphereRadius), 0, 0);
	this.cellCornerTopRight.display();
	this.scene.popMatrix();

	for(var i=1; i<=5; i++){
		this.scene.pushMatrix();
		this.scene.translate(0, -i*(this.spaceBetweenSpheres+2*this.sphereRadius), 0);
		this.cellFrontierLeft.display();
		this.scene.popMatrix();
	}

	this.scene.pushMatrix();
	this.scene.translate(0, -6*(this.spaceBetweenSpheres+2*this.sphereRadius), 0);
	this.cellCornerBottomLeft.display();
	this.scene.popMatrix();

	for(var i=1; i<=5; i++){
		this.scene.pushMatrix();
		this.scene.translate(i*(this.spaceBetweenSpheres+2*this.sphereRadius), -6*(this.spaceBetweenSpheres+2*this.sphereRadius), 0);
		this.cellFrontierBottom.display();
		this.scene.popMatrix();
	}

	this.scene.pushMatrix();
	this.scene.translate(6*(this.spaceBetweenSpheres+2*this.sphereRadius), -6*(this.spaceBetweenSpheres+2*this.sphereRadius), 0);
	this.cellCornerBottomRight.display();
	this.scene.popMatrix();

	for(var i=1; i<=5; i++){
		this.scene.pushMatrix();
		this.scene.translate(6*(this.spaceBetweenSpheres+2*this.sphereRadius), -i*(this.spaceBetweenSpheres+2*this.sphereRadius), 0);
		this.cellFrontierRight.display();
		this.scene.popMatrix();
	}

	for(var i=1; i<=5; i++){
		for(var j=1; j<=5; j++){
			this.scene.pushMatrix();
			this.scene.translate(i*(this.spaceBetweenSpheres+2*this.sphereRadius), -j*(this.spaceBetweenSpheres+2*this.sphereRadius), 0);
			this.cellInterior.display();
			this.scene.popMatrix();
		}
	}
	
	var cylinderScale = 1;
	for(var i=0; i<7; i++){
		for(var j=0; j<7; j++){
			this.scene.pushMatrix();
			this.scene.translate(i*(this.spaceBetweenSpheres+2*this.sphereRadius), -j*(this.spaceBetweenSpheres+2*this.sphereRadius), 0);
			
			if(i!=6){
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0,1,0);
			this.scene.translate(0,0,Math.sqrt(this.sphereRadius*this.sphereRadius-this.cylinderRadius*this.cylinderRadius));
			this.scene.rotate(3*Math.PI/2, 0, 0, 1);
			this.scene.scale(-1, cylinderScale*this.sphereHeight/this.sphereRadius, 1);
			this.cylinder.display();
			this.scene.popMatrix();
			}
			if(j!= 6){
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 1,0,0);
			this.scene.translate(0,0,Math.sqrt(this.sphereRadius*this.sphereRadius-this.cylinderRadius*this.cylinderRadius));
			this.scene.rotate(2*Math.PI/2, 0, 0, 1);
			this.scene.scale(-1, cylinderScale*this.sphereHeight/this.sphereRadius, 1);
			this.cylinder.display();
			this.scene.popMatrix();
			}

			this.scene.rotate(Math.PI, 1, 0, 0);
			//this.scene.scale(1, 1, 1);
			this.appearance.apply();
			this.scene.scale(1,1,this.sphereHeight/this.sphereRadius);
			this.semiSphere.display();
			this.scene.popMatrix();
		}
	}
};

/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the board
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
Board.prototype.amplifFactors = function (ampFactorS, ampFactorT) {
}