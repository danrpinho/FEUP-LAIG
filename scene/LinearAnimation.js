function LinearAnimation(scene, speed, controlPoints) {
    Animation.apply(this,  [scene, speed]);
    this.controlPoints=controlPoints;
    this.distances=[];
    //this.distances.push(0);
    for(var i=0; i<(this.controlPoints.size()-1);i++){
        this.distances.push(Math.sqrt(this.controlPoints[0]*this.controlPoints[0]+this.controlPoints[1]*this.controlPoints[1]+this.controlPoints[2]*this.controlPoints[2]));
    }
    this.times=[];
    //this.times.push(0);
    for(var i=0;i<this.distances.size();i++){
        this.times.push(this.distances[i]/this.speed);
    }
};

LinearAnimation.prototype.transform=function(time){
    var sumTimes=0;
    var i=0;
    var timeExceeded=0;
    while(sumTimes<time){
        if(i>=this.times[i]){
            timeExceeded=1;
            break;
        }
        sumTimes=sumTimes+this.times[i];
        i++;
    }
    i--;
    if(timeExceeded){
         this.scene.translate(this.controlPoints[this.controlPoints.size()-1][0], this.controlPoints[this.controlPoints.size()-1][1], this.controlPoints[this.controlPoints.size()-1][2]);
    }
    else if(i<0){
        this.scene.translate(this.controlPoints[0][0], this.controlPoints[0][1], this.controlPoints[0][2]);
    }
    else{
        var relativeTime=-sumTimes+this.times[i]+time;
        this.scene.translate(this.controlPoints[i][0], this.controlPoints[i][1], this.controlPoints[i][2]);
        this.orientation([(this.controlPoints[i+1][0]-this.controlPoints[i][0]),(this.controlPoints[i+1][1]-this.controlPoints[i][1]),(this.controlPoints[i+1][2]-this.controlPoints[i][2])]);
        var relativeDistance=(relativeTime/this.times[i])*this.distances[i];
        this.scene.translate(relativeDistance,0,0);
    }

}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;
