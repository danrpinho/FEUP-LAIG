function LinearAnimation(scene, speed, controlPoint1, controlPoint2, controlPoint3) {
    Animation.apply(this,  [scene, speed]);
    
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;
