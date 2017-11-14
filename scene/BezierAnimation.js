function BezierAnimation(scene, animationSpeed, controlPoints) {
    Animation.apply(this, [scene, animationSpeed]);
    var distance = casteljau(0, 2, controlPoints);
    this.totalTime = distance/animationSpeed;
};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.transform = function(time){
	var t = time/this.totalTime;

}

BezierAnimation.prototype.casteljau = function(level, goal, controlPoints){
	var p12 = calculateMidpoint(controlPoints[0], controlPoints[1]);
	var p23 = calculateMidpoint(controlPoints[1], controlPoints[2]);
	var p34 = calculateMidpoint(controlPoints[2], controlPoints[3]);
	var p123 = calculateMidpoint(p12, p23);
	var p234 = calculateMidpoint(p23, p34);
	var m = calculateMidpoint(p123, p234);
	if (level < goal){
		return (casteljau(level + 1, goal, [controlPoints[0], p12, p123, m]) +
			casteljau (level + 1, goal, [m, p234, p34, controlPoints[3]]));
	} else {
		var dist = calculateDistance(controlPoints[0], p12);
		dist += calculateDistance(p12, p123);
		dist += calculateDistance(p123, p234);
		dist += calculateDistance(p234, p34);
		dist += calculateDistance(p34, controlPoints[3]);
		return dist;
	}
}

BezierAnimation.prototype.calculateMidpoint = function(p1, p2){
	var x, y, z;
	x = (p1[0] + p2[0])/2;
	y = (p1[1] + p2[1])/2;
	z = (p1[2] + p2[2])/2;
	return [x,y,z];
}

BezierAnimation.prototype.calculateDistance = function(p1, p2){
	return Math.sqrt((p1[0] + p2[0])*(p1[0] + p2[0]) +
		(p1[1] + p2[1])*(p1[1] + p2[1]) + (p1[2] + p2[2])*(p1[2] + p2[2]));
}