function CircularAnimation(scene, speed, center, radius, initialAngle, rotationAngle) {
    Animation.call(this, scene, speed );
    this.center=center;
    this.radius=radius;
    this.initialAngle=initialAngle;
    this.rotationAngle=rotationAngle;
    this.totalTime=Math.abs((rotationAngle*this.radius)/this.speed);
};

CircularAnimation.prototype.transform=function(time){
    this.scene.translate(this.center[0], this.center[1], this.center[2]);
    var angularSpeed=this.speed/this.radius;
    var tmpRotationAngle =Math.min(angularSpeed*time, this.rotationAngle);
    this.scene.rotate(0,1,0,tmpRotationAngle);
    this.scene.translate(radius, 0, 0);
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

