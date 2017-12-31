var DEGREE_TO_RAD = Math.PI / 180;
var UPDATE_SCENE = 0.1;
var RELATIVE_ANIMATION = 1;
var PrologMsgReceive = '';
var INITIAL_TIMER = 50;
var CAMERA_TILT = 5;
var CAMERA_PAN = 20;
var CAMERA_TILT_INCREMENT = Math.PI/180*10;
var CAMERA_PAN_INCREMENT_POS = [0.1,0,1];
var CAMERA_PAN_INCREMENT_NEG = [-0.1,0,1];

var CPU_MOVE_TIME = 1;//Time that it takes the CPU to make a move


/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;
    this.activeGame = false;
    this.mainTime = 0;
    this.startTime = 0;
    this.lightValues = {};
	this.waitForProlog=0;
    this.topDown = false;
    this.waitForCPU = -1;


    this.gameDifficulty="Easy";
    this.difficulties=["Easy", "Medium", "Hard"];
    this.gametypes=["Player vs Player", "Player vs CPU", "CPU vs CPU"];
    this.gametype="Player vs CPU";
    this.ol_gametype=this.gametype;
    this.playStack = [ [[[0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0]], 22, 22, 1]   ];//each member of the stack contains the following element [Board, CurrentPiecesPlayer1, CurrentPiecesPlayer2, nextPlayer]


    this.score=[0,0];
    this.moveTimer = INITIAL_TIMER;
    this.currentPlayer = 1;

    this.currentlyPicked = null;
    this.currentSelectable = "none";
    this.currentAmbient="wood";
    this.shaderColor = [255, 215, 0];
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(UPDATE_SCENE * 1000);

    this.shader = new CGFshader(this.gl, "t2shader.vert", "t2shader.frag");

    this.axis = new CGFaxis(this);
}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function () {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function () {
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this, this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
        this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    function undo(){
        if (this.playStack.length == 1){
            console.log("Can't undo initial state!")
        } else {
            console.log("UNDO THE DO THE TO-DO!")
            this.playStack.pop();
            PrologMsgReceive = '';
            this.waitForCPU = -1;
        }
    }

    function toggle(){
        this.movingCamera = true;
        this.cameraPanCounter = 0;
        this.cameraTiltCounter = 0;
        /*if (!this.topDown){
            this.interface.activeCamera.orbit(CGFcameraAxisID.Y, Math.PI/2);
            this.interface.activeCamera.pan([2,0,1]);
            this.interface.activeCamera.orbit(CGFcameraAxisID.Y, -Math.PI/2);
            this.interface.activeCamera.orbit(CGFcameraAxisID.X, Math.PI/180*50);
            this.topDown = true;
            //@TODO substituir por uma funcao que anima isto
        } else {
            this.interface.activeCamera.orbit(CGFcameraAxisID.X, -Math.PI/180*50);
            this.interface.activeCamera.orbit(CGFcameraAxisID.Y, -Math.PI/2);
            this.interface.activeCamera.pan([2,0,1]);
            this.interface.activeCamera.orbit(CGFcameraAxisID.Y, Math.PI/2);
            this.topDown = false;
        }*/
    }

    function startGame(){
        if (!this.activeGame){
            this.activeGame = true;
            this.startTime =  this.mainTime;
            PrologMsgReceive = '';
            this.waitForCPU = -1;
             this.playStack = [ [[[0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0]], 22, 22, 1]   ];
            //TODO enable picking;
        }
    }

    let funcUndo = undo.bind(this);
    let funcToggle = toggle.bind(this);
    let funcStart = startGame.bind(this);

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);
    this.interface.addSelectablesGroup(this.graph.selectableNodes, this.shaderColor);
    this.interface.addGameOptions(this.difficulties, this.gametypes, this.playStack, this.mainTime, this.graph.ambients,
        funcUndo, funcToggle, funcStart);

    this.moveTimer = INITIAL_TIMER;
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function () {
    this.logPicking();
	this.clearPickRegistration();


    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk) {
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

        // Draw axis
        this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        this.graph.displayScene();

    }
    else {
        // Draw axis
        this.axis.display();
    }


    this.popMatrix();

    // ---- END Background, camera and axis setup

}

XMLscene.prototype.update = function (time) {
    this.mainTime += UPDATE_SCENE;
    if (this.activeGame) {
        this.moveTimer = 50 - (this.mainTime - this.startTime);
    }
    this.shader.setUniformsValues({
        selRed: this.shaderColor[0] / 255,
        selGreen: this.shaderColor[1] / 255,
        selBlue: this.shaderColor[2] / 255,
        timeFactor: this.mainTime
    });
    if(this.waitForProlog === 0){
    	PrologMsgReceive = '';
    }
    else if(PrologMsgReceive !== '') {
    	this.nextMove(PrologMsgReceive);
    	PrologMsgReceive='';
    	this.waitForProlog = 0;
    }

    var currentPlayer = this.playStack[this.playStack.length-1][3];
    if(this.gametype === 'CPU vs CPU' && this.waitForCPU === -1)
    	this.waitForCPU = CPU_MOVE_TIME;
    else if(this.gametype === 'Player vs Player')
    	this.waitForCPU = -1;
    else if(this.gametype === 'Player vs CPU' && currentPlayer === 2 && this.waitForCPU === -1)
    	this.waitForCPU = CPU_MOVE_TIME;
    else if(this.gametype === 'Player vs CPU' && currentPlayer === 1)
    	this.waitForCPU = -1;

    if(this.waitForCPU >= 0)
    	this.waitForCPU += UPDATE_SCENE;

    if(this.waitForCPU>=CPU_MOVE_TIME && this.activeGame){
    	this.waitForCPU = -1;
    	this.makeRequest(1);
    }

    if (this.movingCamera){
        if(!this.topDown){  //going top down
            if (this.cameraPanCounter < CAMERA_PAN){
                this.interface.activeCamera.orbit(CGFcameraAxisID.Y, Math.PI/2);
                this.interface.activeCamera.pan(CAMERA_PAN_INCREMENT_POS);
                this.interface.activeCamera.orbit(CGFcameraAxisID.Y, -Math.PI/2);
                this.cameraPanCounter = this.cameraPanCounter + 1;
            } else if (this.cameraTiltCounter < CAMERA_TILT){
                this.interface.activeCamera.orbit(CGFcameraAxisID.X, CAMERA_TILT_INCREMENT);
                this.cameraTiltCounter = this.cameraTiltCounter + 1;
            } else if (this.cameraPanCounter == CAMERA_PAN && this.cameraTiltCounter == CAMERA_TILT){
                this.topDown = true;
                this.movingCamera = false;
            }
        } else {        //going not-top down
            if (this.cameraTiltCounter < CAMERA_TILT) {
                this.interface.activeCamera.orbit(CGFcameraAxisID.X, -CAMERA_TILT_INCREMENT);
                this.cameraTiltCounter = this.cameraTiltCounter + 1;
            } else if (this.cameraPanCounter < CAMERA_PAN) {
                this.interface.activeCamera.orbit(CGFcameraAxisID.Y, Math.PI / 2);
                this.interface.activeCamera.pan(CAMERA_PAN_INCREMENT_NEG);
                this.interface.activeCamera.orbit(CGFcameraAxisID.Y, -Math.PI / 2);
                this.cameraPanCounter = this.cameraPanCounter + 1;
            } else if (this.cameraPanCounter == CAMERA_PAN && this.cameraTiltCounter == CAMERA_TILT) {
                this.topDown = false;
                this.movingCamera = false;
            }
        }
    }

}

XMLscene.prototype.logPicking = function ()
{
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];
					console.log("Picked object: " + obj + ", with pick id " + customId);
					var currentPlayer = this.playStack[this.playStack.length-1][3];
					var Move;
					if(this.activeGame){
						if((Move = this.convertIDtoMove(customId)) !== -1 && this.waitForProlog === 0){
							if(this.gametype === 'Player vs Player'){
								this.makeRequest(0, Move);
							}
							else if(this.gametype === 'Player vs CPU' && currentPlayer === 1){
								this.makeRequest(0, Move);
							}
							else{
								console.log('Error: It is not your turn');
							}
							}
							else{
							console.log('Error: Non-valid ID');
						}
					}
               /* if (obj) {
                    var customId = this.pickResults[i][1];
                    if (this.currentlyPicked == null) {
                        if ((this.currentPlayer == 1 && customId >= 29 && customId <= 50) ||
                            (this.currentPlayer == 2 && customId >= 51 && customId <= 72)) {
                            console.log("Player " + this.currentPlayer + " picked piece " + ((customId - 29) % 22 + 1));
                            this.currentlyPicked = customId;
                        }
                    } else if (customId >= 1 && customId <= 28) {
                        var side = Math.floor((customId - 1) / 7);
                        switch (side) {
                            case 0: side = "up"; break;
                            case 1: side = "down"; break;
                            case 2: side = "left"; break;
                            case 3: side = "right"; break;
                        }
                        console.log("Player " + this.currentPlayer + " placed the piece in [" + side + ", " +
                            ((customId - 1) % 7 +1) + "].");

                        this.currentlyPicked = null;
                        this.togglePlayer();
                    }

                    if (customId > 0)
					    console.log("Picked object: " + obj + ", with pick id " + customId);
                }*/
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
}


XMLscene.prototype.convertIDtoMove=function(ID){
	if(ID < 0)
		return -1;
	else if(ID <= 7)
		return ['up',ID];
	else if(ID <= 14)
		return ['down',ID-7];
	else if(ID <= 21)
		return ['left',ID-14];
	else if(ID <= 28)
		return ['right',ID-21];
	else
		return -1;

}

/*
Sends Request
*/
XMLscene.prototype.getPrologRequest = function(requestString, onSuccess, onError, port){
			var requestPort = port || 8081
			var request = new XMLHttpRequest();
			request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

			request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
			request.onerror = onError || function(){console.log("Error waiting for response");};

			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			request.send();
}

/*
Composes the message that is going to be sent to PROLOG
*/
XMLscene.prototype.makeRequest = function(cpu, Move)
{
			this.waitForProlog = 1;
			var board = this.playStack[this.playStack.length-1][0];
			var board_string='[';
			for(var i=0;i<board.length;i++){
				board_string=board_string+'[';
				for(var j=0;j<board[i].length;j++){
					if(j === (board[i].length - 1))
						board_string=board_string+board[i][j]
					else
						board_string=board_string+board[i][j]+',';
				}
				if(i === board.length-1)
					board_string=board_string+']';
				else
					board_string=board_string+'],';
			}
			board_string=board_string+']';
			var currentPlayer = this.playStack[this.playStack.length-1][3];
			var currentPieces = this.playStack[this.playStack.length-1][currentPlayer];
			var difficulty;
			if(this.gameDifficulty === "Easy")
				difficulty = 1;
			else if(this.gameDifficulty === "Medium")
				difficulty = 2;
			else if(this.gameDifficulty === "Hard")
				difficulty = 3;

			// Get Parameter Values
			var requestString;
			if(cpu === 1){
				var requestString = 'shiftago(cpu,'+currentPlayer+','+difficulty+','+board_string+','+currentPieces+')';
			}

			else{
				var requestString = 'shiftago(player,'+currentPlayer+','+board_string+','+currentPieces+','+Move[0]+','+Move[1]+')';
			}

			// Make Request
			this.getPrologRequest(requestString, handleReply);
}

//Handles the Reply
function handleReply(data){
		PrologMsgReceive = data.target.response;
}

//After having received a response from PROLOG this function prepares the stack and other paramethers for the next State
XMLscene.prototype.nextMove = function(response){
	var res_sub = response.replace(/[\[\]']+/g, '');
	var array=res_sub.split(',');
	var description = array[0];
	var nextPlayer = parseInt(array[1]);
	var newCurrentPieces = -1;
	var newBoard = -1;
	var MoveEdge = -1;
	var MoveRow = -1;
	var Winner = -1;
	var nextStack = -1;
	var currentStack = this.playStack[this.playStack.length-1]

	if(description === 'Valid' || description === 'GameOver'){
		newBoard = [];
		MoveEdge = parseInt(array[3]);
		MoveRow = parseInt(array[4]);
		for(var i=0;i<7;i++){
			newBoard.push([]);
			for(var j=0;j<7;j++)
				newBoard[newBoard.length-1].push(parseInt(array[5+7*i+j]));
		}
	}
	if(description === 'Valid'){
		newCurrentPieces = parseInt(array[2]);
		if(nextPlayer === 1){
			nextStack = [newBoard, currentStack[1],newCurrentPieces, nextPlayer];

		}
		else if(nextPlayer === 2){
			nextStack = [newBoard, newCurrentPieces,currentStack[2], nextPlayer];

		}
		else{
			console.log('Error: Wrong Player Number');
		}
		this.playStack.push(nextStack);
	}
	else if(description === 'GameOver'){
		Winner = parseInt(array[2]);
		console.log('GameOver. The Winner is Player '+nextPlayer);
		console.log(newBoard);
		this.activeGame = 0;

	}

	console.log(nextStack);
	if(description !== 'GameOver'){
		if(this.gametype === 'CPU vs CPU')
			this.waitForCPU = 0;
		else if(this.gametype === 'Player vs CPU' && nextPlayer === 2)
			this.waitForCPU = 0;
	}

	//TODO : Animations
}


/*XMLscene.prototype.togglePlayer = function () {
    if (this.currentPlayer % 2)
        this.currentPlayer++;
    else
        this.currentPlayer--;
}
*/

XMLscene.prototype.incrementScore = function (player) {
    this.score[player-1]++;
}
