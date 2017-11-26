/**
 *BezierAnimation
 *@brief - constructor of BezierAnimation
 *@param scene - scene the object this Animation is going to move belongs to
 *@param speed - speed of the Animation
 *@param controlPoints - control Points of the Bezier Curve
 */
function BezierAnimation(scene, speed, controlPoints, startTime=0) {
	Animation.call(this, scene, startTime);
	this.speed=speed;
	this.controlPoints=controlPoints;
	var distance = this.bezierLength(controlPoints, 100);
	this.totalTime = distance/speed;
};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

/**
*transform
*@brief - performs the Animation
*@param time - time in seconds since the start of the Animation
*/
BezierAnimation.prototype.transform = function(time){
	if(time>=this.startTime){
	var t = time/this.totalTime;
	var point=this.controlPoints[this.controlPoints.length-1];
	if(t<=1){
		point = this.bezierPoint(this.controlPoints, t);
	}

	
	this.scene.translate(point[0], point[1], point[2]);
	if(t<=1){
		this.orientation(this.calculateDeriv(this.controlPoints, t));
	}
	else{
		this.orientation(this.calculateDeriv(this.controlPoints, 1));
	}
	}

}


/**
*bezierLength
*@brief - calculates the length of a bezier curve
*@param controlPoints - control Points of a bezier curve
*@param divisions - divisions of the bezier Curve made to calculate its distance
*/
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

/**
*bezierPoint
*@brief - calculates the bezier Point corresponding to a set of control Points and to a certain time
*@param p - control Points of a bezier curve
*@param t - time of the the Bezier Curve 0<=t<=1
*/
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

/**
*bezierPoint
*@brief - calculates the derivative of a Bezier Curve corresponding to a set of control Points and to a certain time
*@param p - control Points of a bezier curve
*@param t - time of the the Bezier Curve 0<=t<=1
*/
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