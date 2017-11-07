function LinearAnimation() {
    Animation.apply(this, arguments);
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;
