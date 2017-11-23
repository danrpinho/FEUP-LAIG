function BezierAnimation(scene, animationSpeed, controlPoints) {
	Animation.call(this, scene, animationSpeed);
	this.controlPoints=controlPoints;
	var distance = this.bezierLength(controlPoints, 100);
	console.log(this.controlPoints);
	console.log("distance");
	console.log(distance);
	this.totalTime = distance/animationSpeed;
};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.transform = function(time){
	var t = time/this.totalTime;
	var point=this.controlPoints[this.controlPoints.length-1];
	if(t<=1){
		point = this.bezierPoint(this.controlPoints, t);
	}

	/*console.log(t);
	console.log(point);*/
	this.scene.translate(point[0], point[1], point[2]);
	if(t<=1){
		this.orientation(this.calculateDeriv(this.controlPoints, t));
	}
	else{
		this.orientation(this.calculateDeriv(this.controlPoints, 1));
	}

}

/*BezierAnimation.prototype.casteljau = function(level, goal, controlPoints){
	var p12 = this.calculateMidpoint(controlPoints[0], controlPoints[1]);
	var p23 = this.calculateMidpoint(controlPoints[1], controlPoints[2]);
	var p34 = this.calculateMidpoint(controlPoints[2], controlPoints[3]);
	var p123 = this.calculateMidpoint(p12, p23);
	var p234 = this.calculateMidpoint(p23, p34);
	var m = this.calculateMidpoint(p123, p234);

	if (level < goal){
		return (this.casteljau(level + 1, goal, [controlPoints[0], p12, p123, m]) +
				this.casteljau(level + 1, goal, [m, p234, p34, controlPoints[3]]));
	} else {
		var dist = this.calculateDistance(controlPoints[0], p12);
		dist += this.calculateDistance(p12, p123);
		dist += this.calculateDistance(p123, p234);
		dist += this.calculateDistance(p234, p34);
		dist += this.calculateDistance(p34, controlPoints[3]);
		return dist;
	}
}*/

BezierAnimation.prototype.bezierLength = function(controlPoints, divisions){
	var currentPoint=this.bezierPoint(this.controlPoints, 0);
	var sumDistances=0;
	for(var i=1;i<=divisions;i++){
		var t=i/divisions;
		var newPoint=this.bezierPoint(this.controlPoints, t);
		sumDistances=sumDistances+this.calculateDistance(currentPoint, newPoint);
		currentPoint=newPoint;

	}	
	return sumDistances;

}

BezierAnimation.prototype.calculateMidpoint = function(p1, p2){
	var x, y, z;
	x = (p1[0] + p2[0])/2;
	y = (p1[1] + p2[1])/2;
	z = (p1[2] + p2[2])/2;
	return [x,y,z];
}

/*BezierAnimation.prototype.calculateDistance = function(p1, p2){
	return Math.sqrt((p1[0] + p2[0])*(p1[0] + p2[0]) +
		(p1[1] + p2[1])*(p1[1] + p2[1]) + (p1[2] + p2[2])*(p1[2] + p2[2]));
}*/

BezierAnimation.prototype.bezierPoint = function(p, t){
	var k = 1 - t;
	var a = k * k * k;
	var b = 3 * k * k * t;
	var c = 3 * k * t * t;
	var d = t * t * t;

	var x = a * p[0][0] + b * p[1][0] + c * p[2][0] + d * p[3][0];
	var y = a * p[0][1] + b * p[1][1] + c * p[2][1] + d * p[3][1];
	var z = a * p[0][2] + b * p[1][2] + c * p[2][2] + d * p[3][2];

	return [x,y,z];

	//B(t)  = (1-t)^3 P0 + 3(1-t)^2 t P1 + 3(1-t) t^2 P2 + t^3 P3, t E (0, 1)
}

BezierAnimation.prototype.calculateDeriv = function(p, t){
	var k = 1 - t;
	var a = 3 * k * k;
	var b = 6 * k * t;
	var c = 3 * t * t;

	var x = a * (p[1][0] - p[0][0]) + b * (p[2][0] - p[1][0]) + c * (p[3][0] - p[2][0]);
	var y = a * (p[1][1] - p[0][1]) + b * (p[2][1] - p[1][1]) + c * (p[3][1] - p[2][1]);
	var z = a * (p[1][2] - p[0][2]) + b * (p[2][2] - p[1][2]) + c * (p[3][2] - p[2][2]);

	return [x,y,z];

	//B'(t) = 3(1-t)^2 (P1-P0) + 6(1-t) t (P2-P1) + 3t^2 (P3-P2);
}