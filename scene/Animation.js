function Animation() {
    if (this.constructor == Animation) {
        throw new Error("Can't instanciate abstract class.")
    }
}

Animation.prototype.constructor = Animation;