/**
 *Animation
 *@brief - constructor of Animation
 *@param scene - scene the object this Animation is going to move belongs to
 */
function Animation(scene, startTime = 0) {
    if (this.constructor == Animation) {
        throw new Error("Can't instanciate abstract class.")
    }
    this.scene = scene;
    this.startTime = startTime;
    this.relativeAnimation = 1;
}

Animation.prototype.constructor = Animation;

/**
*orientation
*@brief - changes the horizontal orientation of an object to newOrientation
*@param newOrientation - new Orientation of the object
*/
Animation.prototype.orientation = function (newOrientation) {
   
}

/**
*calculateDistance
*@brief - calculates the distance between two points in space
*@param p1 - first point
*@param p2 - second point
*/
Animation.prototype.calculateDistance = function (p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) +
        (p1[1] - p2[1]) * (p1[1] - p2[1]) + (p1[2] - p2[2]) * (p1[2] - p2[2]));
}


