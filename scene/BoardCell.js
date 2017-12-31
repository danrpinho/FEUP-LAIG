/**
 *BoardCell
 *@brief - constructor of object MyBoardCell that is an individual cell of the larger Board
 *@param scene - scene this object belongs to
 *@param sphereRadius - radius of each sphere of the Board
 *@param cylinderRadius - radius of each cylinder of the Board
 *@param topCylinderLength - height of the cylinder in the top side
 *@param bottomCylinderLength - height of the cylinder in the bottom side
 *@param leftCylinderLength - height of the cylinder in the left side
 *@param rightCylinderLength - height of the cylinder in the right side
 */
function BoardCell(scene, sphereRadius, cylinderRadius, topCylinderLength, bottomCylinderLength, leftCylinderLength, rightCylinderLength) {
	CGFobject.call(this, scene);
	this.sphereRadius=sphereRadius;
	this.cylinderRadius=Math.max(cylinderRadius, 0.01);
	this.topCylinderLength=topCylinderLength;
	this.bottomCylinderLength=bottomCylinderLength;
	this.leftCylinderLength=leftCylinderLength;
	this.rightCylinderLength=rightCylinderLength;
	this.top=Math.max(sphereRadius, topCylinderLength);
	this.bottom=Math.max(sphereRadius, bottomCylinderLength);
	this.left=Math.max(sphereRadius, leftCylinderLength);
	this.right=Math.max(sphereRadius, rightCylinderLength);
	this.initBuffers();

	
};

BoardCell.prototype = Object.create(CGFobject.prototype);
BoardCell.prototype.constructor = BoardCell;

/**
* initBuffers
*@brief - initializes the buffers
*/
BoardCell.prototype.initBuffers = function (){
	this.vertices=[];
	this.normals=[];
	this.texCoords=[];

	//CREATES THE FOUR VERTICES OF THE SQUARE
	this.vertices.push(this.right, this.top, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(this.right, -this.bottom, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(-this.left, -this.bottom, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(-this.left, this.top, 0);
	this.normals.push(0, 0, 1);
	
	//CREATES THE EIGHT VERTICES THAT BELONG TO BOTH THE CYLINDER AND THE FRONTIER OF THE SQUARE
	this.vertices.push(this.right, this.cylinderRadius, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(this.right, -this.cylinderRadius, 0);
	this.normals.push(0, 0, 1);
	
	
	this.vertices.push(this.cylinderRadius, -this.bottom, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(-this.cylinderRadius, -this.bottom, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(-this.left, -this.cylinderRadius, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(-this.left, this.cylinderRadius, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(-this.cylinderRadius, this.top, 0);
	this.normals.push(0, 0, 1);

	this.vertices.push(this.cylinderRadius, this.top, 0);
	this.normals.push(0, 0, 1);

	if(this.rightCylinderLength === 0){
		this.vertices[12]=this.right;
		this.vertices[13]=0;
		this.vertices[14]=0;

		this.vertices[15]=this.right;
		this.vertices[16]=0;
		this.vertices[17]=0;
	}

	if(this.bottomCylinderLength === 0){
		this.vertices[18] = 0;
		this.vertices[19] = -this.bottom;
		this.vertices[20] = 0;

		this.vertices[21] = 0;
		this.vertices[22] = -this.bottom;
		this.vertices[23] = 0;
	}

	if(this.leftCylinderLength === 0){
		this.vertices[24] = -this.left;
		this.vertices[25] = 0;
		this.vertices[26]=0;

		this.vertices[27] = -this.left;
		this.vertices[28] = 0;
		this.vertices[29] = 0;
	}
	
	if(this.topCylinderLength === 0){
		this.vertices[30] = 0;
		this.vertices[31] = this.top;
		this.vertices[32] = 0;

		this.vertices[33] = 0;
		this.vertices[34] = this.top;
		this.vertices[35] = 0;
	}

	//CREATES THE VERTICES OF THE SPHERE
	var slices=1000; //slices of the sphere
	var teta=2*Math.PI/slices;
	var startcnt=0;
	var endcnt = 0;
	this.start=[-1, -1, -1, -1];
	this.end=[-1, -1, -1, -1];
	var vertPrevious=false;
	for(var i=0; i<slices; i++){
		var x = this.sphereRadius*Math.cos(-i*teta);
		var y=this.sphereRadius*Math.sin(-i*teta);

		if(this.cylinderRadius<= Math.abs(x) && this.cylinderRadius<=Math.abs(y)){
			if(vertPrevious === false){
				this.start[startcnt]=(this.vertices.length/3);
				vertPrevious = true;
				startcnt++;
			}
			this.vertices.push(x, y, 0);
			this.normals.push(0, 0, 1);
		}
		else if(this.cylinderRadius > Math.abs(x) && y > 0 && this.topCylinderLength === 0){
			this.vertices.push(x, y, 0);
			this.normals.push(0, 0, 1);
			if(x>=0 && startcnt == 3){
				this.start[3]=(this.vertices.length)/3-1;
				this.end[2]=this.vertices.length/3-2;
				startcnt++;
				endcnt++;
			}
			vertPrevious = true;
		}
		else if(this.cylinderRadius > Math.abs(x) && y < 0 && this.bottomCylinderLength === 0){
			
			this.vertices.push(x, y, 0);
			this.normals.push(0, 0, 1);
			if(x<=0 && startcnt == 1){
				this.start[1]=this.vertices.length/3-1;
				this.end[0]=this.vertices.length/3-2;
				startcnt++;
				endcnt++;
			}
			vertPrevious = true;
			
		}
		else if(this.cylinderRadius > Math.abs(y) && x>0 && this.rightCylinderLength === 0){
			this.vertices.push(x, y, 0);
			this.normals.push(0, 0, 1);
			if(y<=0 && startcnt == 0){
				this.start[0]=this.vertices.length/3-1;
				startcnt++;
			}
			if(i == (slices-1) ){
				this.end[3]=this.vertices.length/3-1;
				endcnt++;
			}
			vertPrevious = true;		
		}
		else if(this.cylinderRadius > Math.abs(y) && x<0 && this.leftCylinderLength === 0){
			this.vertices.push(x, y, 0);
			this.normals.push(0, 0, 1);
			if(y>=0 && (startcnt == 2)){
				this.start[2]=this.vertices.length/3-1;
				this.end[1]=this.vertices.length/3-2;
				startcnt++;
				endcnt++;
			}
			vertPrevious = true;			

		}
		else if(vertPrevious === true){
			this.end[endcnt]=(this.vertices.length/3-1);
			endcnt ++;
			vertPrevious=false;
		}
	}
	

	//ADDS THE INDICES OF THE OBJECT
	this.indices=[];

	this.indices.push(5, this.start[0], 1);
	this.indices.push(1, this.end[0], 6);

	this.indices.push(7, this.start[1], 2);
	this.indices.push(2, this.end[1], 8);

	this.indices.push(9, this.start[2], 3);
	this.indices.push(3, this.end[2], 10);

	this.indices.push(11, this.start[3], 0);
	this.indices.push(0, this.end[3], 4);

	for(var i=this.start[0]; i< this.end[0];i++){
		this.indices.push(1, i, i+1);
	}

	for(var i=this.start[1]; i< this.end[1];i++){
		this.indices.push(2, i, i+1);
	}

	for(var i=this.start[2]; i< this.end[2];i++){
		this.indices.push(3, i, i+1);
	}

	for(var i=this.start[3]; i< this.end[3];i++){
		this.indices.push(0, i, i+1);
	}
		
	for(var i=0; i< this.vertices.length; i++){
		this.texCoords.push(this.vertices[0], this.vertices[1]);
	}
	
	this.initGLBuffers();



}





/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the BoardCell
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
BoardCell.prototype.amplifFactors = function (ampFactorS, ampFactorT) {
}