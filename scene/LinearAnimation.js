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
    while(sumTimes<time){
        sumTimes=sumTimes+this.times[i];
        i++;
    }
    i--;
    if(i<1){
        this.scene.translate(this.controlPoints[0][0], this.controlPoints[0][1], this.controlPoints[0][2]);
    }
    else{
        var relativeTime=sumTimes-this.times[i]+time;
        this.scene.translate(this.controlPoints[i][0], this.controlPoints[i][1], this.controlPoints[i][2]);
    }

}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;
