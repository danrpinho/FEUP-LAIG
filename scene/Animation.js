function Animation(scene, speed) {
    if (this.constructor == Animation) {
        throw new Error("Can't instanciate abstract class.")
    }
    this.scene=scene;
    this.speed=speed;
}

Animation.prototype.constructor = Animation;

Animation.prototype.orientation = function(newOrientation){
    //Now we are going to calculate degree which is the orientation in the xy plane
    console.log("Animation: Orientation");
    console.log(newOrientation);
    var degree;
    if(newOrientation[0]==0 && newOrientation[1]>0){
        degree=Math.PI/2;
    }
    else if(newOrientation[0]==0 && newOrientation[1]<=0){
        degree=-Math.PI/2;
    }
    else{
        degree=Math.atan(newOrientation[1]/newOrientation[0]);
        if(newOrientation[0]<0){
            degree=Math.PI-degree;
        }
    }
    this.scene.rotate(degree, 0,0,1);


    //Now we are going to calculate slope which is the orientation in the xz plane
    var slope;
     if(newOrientation[0]==0 && newOrientation[1]>0){
        slope=Math.PI/2;
    }
    else if(newOrientation[0]==0 && newOrientation[1]<=0){
        slope=-Math.PI/2;
    }
    else{
        slope=Math.atan(newOrientation[2]/newOrientation[0]);
        if(newOrientation[0]<0){
            slope=Math.PI-slope;
        }
    }
     this.scene.rotate(-slope, 0,1,0);
}

