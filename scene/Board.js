/**
 * Board
 *@brief - constructor of object MyBoard
 *@param scene - scene this object belongs to
 */
function Board(scene) {
	CGFobject.call(this, scene);
	//this.cell=new BoardCell()
};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor = Board;

/**
*display
*@brief - displays this object
*/
Board.prototype.display = function () {
	
};

/**
 * amplifFactors
 *@brief - handles the amplification factors of the texture in the board
 *@param ampFactorS - amplification factor on the S axis
 *@param ampFactorT - amplification factor on the T axis
 */
Board.prototype.amplifFactors = function (ampFactorS, ampFactorT) {
}