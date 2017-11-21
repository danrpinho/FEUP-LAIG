function ComboAnimation() {
	Animation.apply(this, arguments);
	this.animations=[];
};

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.addAnimation=function(animation) {
	this.animations.push(animation);
}

ComboAnimation.prototype.invalidAnimations = function(standardAnimIDs) {
	for(var i = 0; i < this.animations.length; i++){
		if (standardAnimIDs.indexOf(this.animations[i]) == -1)
			return true;
	}

	return false;
}