function CircularAnimation(scene, speed, center, radius, initialAngle, rotationAngle, startTime=0) {
    Animation.call(this, scene, startTime );
    this.center=center;
    this.radius=radius;
    this.speed=speed;
    this.initialAngle=initialAngle*Math.PI/180;
    this.rotationAngle=rotationAngle*Math.PI/180;
    this.totalTime=Math.abs((this.rotationAngle*this.radius)/this.speed);
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.transform=function(time){
    if(time>=this.startTime){
    this.scene.translate(this.center[0], this.center[1], this.center[2]);
    var angularSpeed=this.speed/this.radius;
    var tmpRotationAngle =Math.min(angularSpeed*time, this.rotationAngle);
    this.scene.rotate(this.initialAngle+tmpRotationAngle, 0,1,0);
    this.scene.translate(-this.radius, 0, 0);
    //this.scene.rotate(Math.PI, 0, 1, 0);
    }
}



