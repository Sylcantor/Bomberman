
import stage_1 from "./../assests/maps/Stage-1-1.json" assert { type: "json" };
import Level from "./level.js";
import Sprite from "./sprites.js";
import Player from "./player.js";
import { addListeners } from "./listerners.js";

import { delta, timer } from "./timeBasedAnim.js";

export var GF = function(){
    // Vars relative to the canvas
    var gameCanvas,backgroundCanvas,ctxGame, ctxBackground, w, h;

    // vars for counting frames/s, used by the measureFPS function
    var frameCount = 0;
    var lastTime;
    var fpsContainer;
    var fps; 

    var player1;


     // clears the canvas content
     function clearCanvas(ctx) {
       ctx.clearRect(0, 0, w, h);
     }
  
     // Functions for drawing the monster and maybe other objects
     function drawMyMonster(x, y) {
       // draw a monster !
    }


    var playerSprites = []
  
    var mainLoop = function(time){
        //main function, called each frame 
        //measureFPS(time);
            
        timer(time);
        clearCanvas(ctxGame);

        //player.draw(ctxGame);

        playerSprites[player1.direction].draw(ctxGame,player1.x,player1.y);
        //draw player border
        ctxGame.strokeStyle = "red";
        ctxGame.strokeRect(player1.x,player1.y,48,92);
        

        player1.updatePosition(delta);

        //console.log(player1.x + " " + player1.y);
        requestAnimationFrame(mainLoop);
    };

    var loadAssets = function(callback) {
        let SPRITESHEET_URL = "../assests/test.png";
        let SPRITE_WIDTH = 48;
        let SPRITE_HEIGHT = 92;
        let NB_POSTURES=8;
        let NB_FRAMES_PER_POSTURE = 13;
        
        // load the spritesheet
        let spritesheet = new Image();
        spritesheet.src = SPRITESHEET_URL;      
      
        // Called when the spritesheet has been loaded
        spritesheet.onload = function() {
               
           // Create player sprites
           for(var i = 0; i < NB_POSTURES; i++) {
              var sprite = new Sprite();
        
              sprite.extractSprites(spritesheet, NB_POSTURES, (i+1), 
                                    NB_FRAMES_PER_POSTURE, 
                                    SPRITE_WIDTH, SPRITE_HEIGHT);
              sprite.setNbImagesPerSecond(20);
              playerSprites[i] = sprite;
           }
           // call the callback function passed as a parameter, 
           // we're done with loading assets and building the sprites
           callback();
        };
      };

    var start = function(){
        // adds a div for displaying the fps value
        //fpsContainer = document.createElement('div');
        //document.body.appendChild(fpsContainer);
        // Canvas, context etc.
        backgroundCanvas = document.querySelector("#backgroundCanvas");
        // important, we will draw with this object
        ctxBackground = backgroundCanvas.getContext('2d');

        const level = new Level(stage_1);
        level.draw(ctxBackground);
        // start the animation


       

        gameCanvas = document.querySelector("#gameCanvas");
        ctxGame = gameCanvas.getContext('2d');

        w = gameCanvas.width;
        h = gameCanvas.height;
        player1 = new Player(32,32,w,h);

        console.log(gameCanvas.width,gameCanvas.height)
        addListeners(gameCanvas);
        // Load sounds and images, then when this is done, start the mainLoop
        loadAssets(function() {
            // when enter here only when all assets have been loaded
            requestAnimationFrame(mainLoop);
        });
    };

    //our GameFramework returns a public API visible from outside its scope
    return {
        start: start
    };
};

