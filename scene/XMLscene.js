var DEGREE_TO_RAD = Math.PI / 180; // Conversion between degrees and radians
var UPDATE_SCENE = 0.1; // Time in seconds that it takes for an update
var RELATIVE_ANIMATION = 1; // If set to 1, then the Animations in this program are made relative
var PrologMsgReceive = ''; // Message received by PROLOG
var INITIAL_TIMER = 45; // Maximum time allowed for the player to make a Move
var CPU_MOVE_TIME = 1; // Time that it takes the CPU to make a move
var CAMERA_TILT = 5;
var CAMERA_PAN = 20;
var CAMERA_TILT_INCREMENT = Math.PI/180*10;
var CAMERA_PAN_INCREMENT_POS = [0.1,0,1];
var CAMERA_PAN_INCREMENT_NEG = [-0.1,0,1];




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
    this.playStack = [ [[[0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0]], 22, 22, 1]   ];//each member of the stack contains the following element [Board, CurrentPiecesPlayer1, CurrentPiecesPlayer2, nextPlayer]

    this.boardStack =  [ [[[0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0]], [], [] ]  ];


    this.score=[0,0];
    this.moveTimer = INITIAL_TIMER;
    this.currentPlayer = 1;

    this.currentlyPicked = null;
    this.currentSelectable = "none";
    this.currentAmbient="wood";
    this.shaderColor = [255, 215, 0];

    this.Animations = [];
    this.pickableIDtoNode=[];
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

    function undo(){//It's not possible to undo after a game is over
    	if(this.activeGame){
        	if (this.playStack.length == 1){
            	console.log("Can't undo initial state!")
        	} else {
            	console.log("UNDO THE DO THE TO-DO!")
           		this.playStack.pop();
            	this.currentPlayer = this.playStack[this.playStack.length-1][3];
            	PrologMsgReceive = '';
            	this.waitForCPU = -1;
            	this.moveTimer = INITIAL_TIMER;

            	var lastPiecesMoved = this.boardStack[this.boardStack.length-1][1];
            	this.boardStack.pop();
            	for(var i=0;i<lastPiecesMoved.length;i++){
            		this.pickableIDtoNode[lastPiecesMoved[i]].undoAnimation();
            	}
        	}
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
             this.currentPlayer = 1;
             this.moveTimer = INITIAL_TIMER;
             
             this.boardStack =  [ [[[0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0]],[], [] ]  ];
             for(var i=1;i<this.pickableIDtoNode.length;i++){
             	this.pickableIDtoNode[i].clearAnimations();
             }
             this.currentlyPicked = null;            

            //TODO enable picking;
        }
    }

    function movie(){
        if (!this.activeGame && !this.movieOngoing && this.Animations.length > 0){
            this.movieOngoing = true;
            this.mainTime = this.startTime;
            //percorrer this.Animations
        }
    }

    let funcUndo = undo.bind(this);
    let funcToggle = toggle.bind(this);
    let funcStart = startGame.bind(this);
    let funcMovie = movie.bind(this);

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);
    this.interface.addSelectablesGroup(this.graph.selectableNodes, this.shaderColor);
    this.interface.addGameOptions(this.difficulties, this.gametypes, this.playStack, this.mainTime, this.graph.ambients,
        funcUndo, funcToggle, funcStart, funcMovie);

    this.moveTimer = INITIAL_TIMER;
}

/**
*display
*@brief - displays the scene
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

/**
*update
*@brief - updates the scene
*@param time - time of the scene
*/
XMLscene.prototype.update = function (time) {
    this.mainTime += UPDATE_SCENE;
    if (this.activeGame) {
        this.moveTimer -= UPDATE_SCENE;
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
    	this.nextStage(PrologMsgReceive);
    	PrologMsgReceive='';
    	this.waitForProlog = 0;
    }

    if(this.moveTimer < 0 && this.activeGame){
    	var winnerPlayer = 1+ this.currentPlayer%2;
    	this.incrementScore(winnerPlayer);
    	this.activeGame = false;
    }
    if(this.gametype === 'CPU vs CPU' && this.waitForCPU === -1)
    	this.waitForCPU = CPU_MOVE_TIME;
    else if(this.gametype === 'Player vs Player')
    	this.waitForCPU = -1;
    else if(this.gametype === 'Player vs CPU' && this.currentPlayer === 2 && this.waitForCPU === -1)
    	this.waitForCPU = CPU_MOVE_TIME;
    else if(this.gametype === 'Player vs CPU' && this.currentPlayer === 1)
    	this.waitForCPU = -1;

    if(this.waitForCPU >= 0)
    	this.waitForCPU += UPDATE_SCENE;

    if(this.waitForCPU>=CPU_MOVE_TIME && this.activeGame && this.waitForProlog === 0){
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
					if (customId > 0)
					    //console.log("Picked object: " + obj + ", with pick id " + customId);

					var validSelected = true;
					var currentBoard=this.boardStack[this.boardStack.length-1][0];
					for(var j=0;j<currentBoard.length;j++){
						for(var k = 0;k<7;k++){
							if(currentBoard[j][k] == customId)
								validSelected=false;
						}
					}
                	if (this.activeGame && validSelected) {
                    var Move;
                    if (this.currentlyPicked == null && this.waitForProlog === 0) {
                        if ((this.currentPlayer == 1 && customId >= 29 && customId <= 50 && this.gametype !== 'CPU vs CPU') ||
                            (this.currentPlayer == 2 && customId >= 51 && customId <= 72 && this.gametype === 'Player vs Player')) {
                            console.log("Player " + this.currentPlayer + " picked piece " + customId);
                            this.currentlyPicked = customId;
                        }
                    } else if ((Move = this.convertIDtoMove(customId)) !== -1 && this.waitForProlog === 0) {
                        console.log("Player " + this.currentPlayer + " placed the piece in [" + Move[0] + ", " +
                            Move[1] + "].");

                      	this.makeRequest(0, Move);


                    }
                    else
                    	console.log('Error: The object you picked is not valid');
                	}
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
}

/**
*convertIDtoMove
*@brief - converts an ID of a pickable object to the corresponding Move
*@param ID - ID of the pickable object
*/
XMLscene.prototype.convertIDtoMove=function(ID){
	if(ID <= 0)
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

/**
*makeRequest
*@brief - Sends a message to Prolog
*@param requestString -Message that is going to be sent to PROLOG
*@param Move - Move in the form [Edge, Row] that the user intends to make
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

/**
*makeRequest
*@brief - Makes a Request to Prolog with the paramethers of a Move that the user intends to make
*@param cpu - 1 if this move corresponds to a cpu move, false otherwise
*@param Move - Move in the form [Edge, Row] that the user intends to make
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

/**
*handleReply
*@brief - Updates the variable PrologMsgReceive after receiving a message from PROLOG
*@param data - data received by PROLOG
*/
function handleReply(data){
		PrologMsgReceive = data.target.response;
}


/**
*nextStage
*@brief - Prepares the next stage of the game after receiving a function from PROLOG
*@param response - string that is the response given by PROLOG
*/
XMLscene.prototype.nextStage = function(response){
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
		MoveEdge = array[3];
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
		this.moveTimer = INITIAL_TIMER;
	}
	else if(description === 'GameOver'){
		Winner = parseInt(array[2]);
		console.log('GameOver. The Winner is Player '+nextPlayer);
		this.activeGame = 0;
		this.incrementScore(nextPlayer);

	}

	if(description !== 'GameOver'){
		if(this.gametype === 'CPU vs CPU')
			this.waitForCPU = 0;
		else if(this.gametype === 'Player vs CPU' && nextPlayer === 2)
			this.waitForCPU = 0;
	}

	if(description != 'Invalid'){
		if(this.currentlyPicked != null)
			this.Animation(MoveEdge, MoveRow,this.currentlyPicked);
		else{
			var ballID=0;
			var selectedPieces = [];
			var size = 73;
			while(size != 0){
				selectedPieces.push(0);
				size--;
			}
		
			var board =this.boardStack[this.boardStack.length-1][0];
			for(var i=0;i<7;i++){
				for(var j=0;j<7;j++){
					selectedPieces[board[i][j]]=1;
				}
			}
			if(this.currentPlayer == 1){
				for(var i=50; i>=29 && ballID == 0;i--)
					if(selectedPieces[i] == 0)
						ballID = i;
									
			}
			else{
				for(var i=72; i>= 51 && ballID == 0; i--)
					if(selectedPieces[i] == 0)
						ballID = i;

			}	
			this.Animation(MoveEdge, MoveRow, ballID);
		}	
	}
	this.currentPlayer =nextPlayer;
	this.currentlyPicked = null;



}


/**
*incrementScore
*@brief - increments the score of the player passed as paramether
*@param player - player whose score we intend to increment
*/
XMLscene.prototype.incrementScore = function (player) {
    this.score[player-1]++;
}


XMLscene.prototype.Animation = function (MoveEdge, MoveRow, ballID){
	

	if(MoveEdge !== -1 && MoveRow !== -1){
		
		var ballCoordinates=this.ballCoordinates(ballID);
		var cellCoordinates=this.cellCoordinates(MoveEdge, MoveRow);
		var delta;
		if(ballID<=50) 
			delta=[cellCoordinates[0] - ballCoordinates[0], cellCoordinates[1] - ballCoordinates[1], cellCoordinates[2] - ballCoordinates[2]];
		else
			delta=[ballCoordinates[0]-cellCoordinates[0], cellCoordinates[1]-ballCoordinates[1], ballCoordinates[2]-cellCoordinates[2]];


		var controlPoints = [
								[0, 0, 0],
								[delta[0]/3.0,15,delta[2]/3.0],
								[2*delta[0]/3.0,15,2*delta[2]/3.0],
								delta
							]
		var newAnimation = new BezierAnimation(this, 70, controlPoints, this.mainTime);
		this.pickableIDtoNode[ballID].addAnimation(newAnimation);
		this.LinearAnimation(MoveEdge, MoveRow, ballID);
	}
	
}

XMLscene.prototype.ballCoordinates = function(ballID){
	if(ballID < 29 || ballID > 72)
		return -1;

	
	var tempID = JSON.parse(JSON.stringify(ballID));;

	if(ballID>= 51)
		tempID = ballID - 22;

	var delta;
	if(tempID<=38)
		delta=[0,0,3*(tempID-29)];
	else if(tempID<=47)
		delta=[2.65,0,1.5+3*(tempID-39)]
	else
		delta=[5.3, 0,3*(tempID-48)]
	
	if(ballID <= 50)
		return [2.5+delta[0],1.5+delta[1],2+delta[2]];
	else
		return [47.7-delta[0],1.5+delta[1],29-delta[2]];	
}

XMLscene.prototype.cellCoordinates = function(MoveEdge, MoveRow){
	if(MoveEdge == 'left')
		return [8.35+1*4.15,4.5,-1.15+MoveRow*4.15];
	else if(MoveEdge == 'right')
		return [8.35+7*4.15,4.5,-1.15+MoveRow*4.15];	
	else if(MoveEdge == 'up')
		return [8.35+MoveRow*4.15,4.5,-1.15+1*4.15];	
	else if(MoveEdge == 'down')
		return [8.35+MoveRow*4.15,4.5,-1.15+7*4.15];
	else
		return -1;				
}

XMLscene.prototype.LinearAnimation = function(MoveEdge, MoveRow, ballID){
	var AnimationSpeed = 10;
	var board = this.boardStack[this.boardStack.length-1][0];
	var newBoard = [];
	for(var i=0; i<7;i++){
		newBoard[i]=board[i].slice();
	}

	var piecesToBeMoved = [];


	var controlPoint;			

	if(MoveEdge === 'left'){
		var Line = board[MoveRow-1];
		var i =0;
		newBoard[MoveRow-1][i]=ballID;
		while(Line[i] !== 0 && i<7){
			piecesToBeMoved.push(Line[i]);
			if(i !== 0)
				newBoard[MoveRow-1][i]=Line[i-1];
			i++;
		}
		if(i>0)
			newBoard[MoveRow-1][i]=Line[i-1];

		
		controlPoint = [4.15,0,0];
		


	}
	else if(MoveEdge === 'right'){
		var Line = board[MoveRow-1];
		var i =6;
		newBoard[MoveRow-1][i]=ballID;
		while(Line[i] !== 0 && i>=0){
			piecesToBeMoved.push(Line[i]);
			if(i !== 6)
				newBoard[MoveRow-1][i]=Line[i+1];
			i--;
		}
		if(i<6)
			newBoard[MoveRow-1][i]=Line[i+1];
		controlPoint = [-4.15,0,0];
	}
	else if(MoveEdge === 'up'){
		var i = 0;
		newBoard[i][MoveRow-1]=ballID;
		while(board[i][MoveRow-1] !== 0 && i<7){
			piecesToBeMoved.push(board[i][MoveRow-1]);
			if(i !== 0)
				newBoard[i][MoveRow-1]=board[i-1][MoveRow-1];
			i++;
		}
		if(i>0)
			newBoard[i][MoveRow-1]=board[i-1][MoveRow-1];

		
		controlPoint= [0,0,4.15];

	}
	else if(MoveEdge === 'down'){
		var i = 6;
		newBoard[i][MoveRow-1]=ballID;
		while(board[i][MoveRow-1] !== 0 && i>=0){
			piecesToBeMoved.push(board[i][MoveRow-1]);
			if(i !== 6)
				newBoard[i][MoveRow-1]=board[i+1][MoveRow-1];
			i--;
		}

		if(i<6)
			newBoard[i][MoveRow-1]=board[i+1][MoveRow-1];

		
		controlPoint = 	[0,0,-4.15];

	}
	
	var animationPieces = [];
	animationPieces.push(ballID);

	for(var i=0;i<piecesToBeMoved.length;i++)
		animationPieces.push(piecesToBeMoved[i]);

	this.boardStack.push([newBoard, animationPieces]);
	

	for(var i=0; i<piecesToBeMoved.length;i++){
		var controlPoint2;
		if(piecesToBeMoved[i]<=50)
			controlPoint2 = [controlPoint[0],controlPoint[1],controlPoint[2]];
		else
			controlPoint2 = [-controlPoint[0],controlPoint[1],-controlPoint[2]];
		
		 	
		var newAnimation = new LinearAnimation(this, AnimationSpeed, [[0,0,0],controlPoint2], this.mainTime);
		this.pickableIDtoNode[piecesToBeMoved[i]].addAnimation(newAnimation);
	}
}