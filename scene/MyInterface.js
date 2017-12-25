/**
* MyInterface class, creating a GUI interface.
* @constructor
*/
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function (application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a group of controls (and open/expand by defult)

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function (lights) {

    var group = this.gui.addFolder("Lights");
    group.close();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
}

MyInterface.prototype.addSelectablesGroup = function (nodes, color) {
    var shadersGroup = this.gui.addFolder("Shader setings");
    shadersGroup.close();
    shadersGroup.add(this.scene, "currentSelectable", nodes).name("Selected Node");
    shadersGroup.addColor(this.scene, "shaderColor", color).name("Shader Color");
}

MyInterface.prototype.addGameOptions = function(difficulty, gametype, playStack, time){
    var optionsGroup = this.gui.addFolder("Game Settings");
    optionsGroup.open();
    //optionsGroup.add(this.scene, "toggle").name("Toggle top-down view");
    optionsGroup.add(this.scene, "gameDifficulty", difficulty).name("Game difficulty");
    optionsGroup.add(this.scene, "gametype", gametype).name("Game type");
    //optionsGroup.add(this.scene, "undo").name("Undo");
}