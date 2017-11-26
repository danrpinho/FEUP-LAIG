/**
 *ComboAnimation
 *@brief - constructor of ComboAnimation
 *@param scene - scene the object this Animation is going to move belongs to
 */
function ComboAnimation(scene, startTime=0) {
	Animation.call(this, arguments);
	this.animations=[];
	this.animationsID=[];
	this.startTimes=[];
	this.totalTime=0;
};

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

/**
*transform
*@brief - performs the Animation
*@param time - time in seconds since the start of the Animation
*/
ComboAnimation.prototype.transform = function(time){
	if(time>=this.startTime){
		for(var i=0;i<this.animations.length;i++){
			this.animations[i].transform(time-this.startTimes[i]);
		}
	}
}

/**
addAnimationID
@brief - adds ID to the list of Animation ID's
@param animationID - animationID that is going to be added to the list
*/
ComboAnimation.prototype.addAnimationID=function(animationID) {
	this.animationsID.push(animationID);
}

/**
addAnimation
@brief - adds Animation to the list of Animations
@param animation - animation that is going to be added to the list
*/
ComboAnimation.prototype.addAnimation=function(animation) {
	
	this.startTimes.push(this.totalTime);
	this.animations.push(animation);
	this.totalTime += animation.totalTime;
}

/**
@brief - checks if any ID in the list of ID's is invalid
@param standardAnimIDs - list of valid ID's
@return - true if there is any valid ID, false if there isn't
*/
ComboAnimation.prototype.invalidAnimations = function(standardAnimIDs) {
	for(var i = 0; i < this.animationsID.length; i++){
		if (standardAnimIDs.indexOf(this.animationsID[i]) == -1)
			return true;
	}

	return false;
}

