function Animation(scene, speed) {
    if (this.constructor == Animation) {
        throw new Error("Can't instanciate abstract class.")
    }
    this.scene=scene;
    this.speed=speed;
}

Animation.prototype.constructor = Animation;