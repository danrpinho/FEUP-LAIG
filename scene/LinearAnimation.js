function LinearAnimation(scene, speed,  controlPoints, startTime=0) {
    
    Animation.call(this, scene, startTime);
    this.controlPoints = controlPoints;
    this.speed=speed;
    this.distances = [];
    //this.distances.push(0);
    for (var i = 0; i < (this.controlPoints.length - 1); i++) {
        var distx=this.controlPoints[i+1][0]-this.controlPoints[i][0];
        var disty=this.controlPoints[i+1][1]-this.controlPoints[i][1];
        var distz=this.controlPoints[i+1][2]-this.controlPoints[i][2];
        this.distances.push(Math.sqrt(distx*distx+disty*disty+distz*distz));
    }
    this.times = [];
    //this.times.push(0);
    for (var i = 0; i < this.distances.length; i++) {
        this.times.push(this.distances[i] / this.speed);
    }

    var totalDistance = 0;
    for (var i = 0; i < this.distances.length; i++) {
        totalDistance += this.distances[i];
    }
    this.totalTime = totalDistance / speed;
   
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.transform = function (time) {
    if(time>=this.startTime){
    var sumTimes = 0;
    var i = 0;
    var timeExceeded = 0;
    while (sumTimes < time) {
        if (i >= this.times.length) {
            timeExceeded = 1;
            break;
        }
        sumTimes = sumTimes + this.times[i];
        i++;
    }
    i--;
    if (timeExceeded) {
        this.scene.translate(this.controlPoints[this.controlPoints.length - 1][0], this.controlPoints[this.controlPoints.length - 1][1], this.controlPoints[this.controlPoints.length - 1][2]);
        if(this.controlPoints.length>1){
            this.orientation([(this.controlPoints[this.controlPoints.length - 1][0] - this.controlPoints[this.controlPoints.length - 2][0]), 0, (this.controlPoints[this.controlPoints.length - 1][2] - this.controlPoints[this.controlPoints.length - 2][2])]);
        }
    } else if (i < 0) {
        this.scene.translate(this.controlPoints[0][0], this.controlPoints[0][1], this.controlPoints[0][2]);
    } else {
        var relativeTime = -sumTimes + this.times[i] + time;
        this.scene.translate(this.controlPoints[i][0], this.controlPoints[i][1], this.controlPoints[i][2]);
        
        var ratio = (relativeTime / this.times[i]) ;
        this.scene.translate(ratio*(this.controlPoints[i + 1][0] - this.controlPoints[i][0]),ratio*(this.controlPoints[i + 1][1] - this.controlPoints[i][1]), ratio*(this.controlPoints[i + 1][2] - this.controlPoints[i][2]));
        this.orientation([(this.controlPoints[i + 1][0] - this.controlPoints[i][0]), 0, (this.controlPoints[i + 1][2] - this.controlPoints[i][2])]);
    }
    }
}


