function CircularAnimation(scene, speed, center, radius, initialAngle, rotationAngle) {
    Animation.call(this, scene, speed );
    this.center=center;
    this.radius=radius;
    this.initialAngle=initialAngle*Math.PI/180;
    this.rotationAngle=rotationAngle*Math.PI/180;
    this.totalTime=Math.abs((rotationAngle*this.radius)/this.speed);
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.transform=function(time){
    this.scene.translate(this.center[0], this.center[1], this.center[2]);
    var angularSpeed=this.speed/this.radius;
    console.log(this.initialAngle+angularSpeed*time);
    console.log(this.rotationAngle)
    var tmpRotationAngle =Math.min(angularSpeed*time, this.rotationAngle);
    this.scene.rotate(this.initialAngle+tmpRotationAngle, 0,1,0);
    this.scene.translate(-this.radius, 0, 0);
    //this.scene.rotate(Math.PI, 0, 1, 0);
}



