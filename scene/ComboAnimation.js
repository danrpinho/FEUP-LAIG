function ComboAnimation(scene, startTime=0) {
	Animation.call(this, arguments);
	this.animations=[];
	this.animationsID=[];
	this.startTimes=[];
	this.totalTime=0;
};

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.transform = function(time){
	if(time>=this.startTime){
		for(var i=0;i<this.animations.length;i++){
			this.animations[i].transform(time-this.startTimes[i]);
		}
	}
}

ComboAnimation.prototype.addAnimationID=function(animationID) {
	this.animationsID.push(animationID);
}

ComboAnimation.prototype.addAnimation=function(animation) {
	
	this.startTimes.push(this.totalTime);
	this.animations.push(animation);
	this.totalTime += animation.totalTime;
}

ComboAnimation.prototype.invalidAnimations = function(standardAnimIDs) {
	for(var i = 0; i < this.animationsID.length; i++){
		if (standardAnimIDs.indexOf(this.animationsID[i]) == -1)
			return true;
	}

	return false;
}

