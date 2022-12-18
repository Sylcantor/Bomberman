import stage_1_1_map from "./../assests/maps/Stage-1-1.json" assert { type: "json" };
import stage_1_2_map from "./../assests/maps/Stage-1-2.json" assert { type: "json" };
import stage_1_3_map from "./../assests/maps/Stage-1-3.json" assert { type: "json" };
import stage_1_4_map from "./../assests/maps/Stage-1-4.json" assert { type: "json" };
import stage_1_5_map from "./../assests/maps/Stage-1-5.json" assert { type: "json" };


import stage_1_1_tiles from "../assests/tiles/Stage-1.json" assert { type: "json" };

import Level from "./level.js";
import Monster from "./monster.js";

import Sprite from "./sprites.js";


import { addListeners} from "./listerners.js";

import { rectanglesIntersect } from "./collisions.js";


export var GameSolo = function () {
    //canvas
    let canvas = null;
    let ctx = null;
    let currentStage;
    let currentTiles = stage_1_1_tiles;
    let w,h;

    let allStages = [stage_1_1_map,stage_1_2_map,stage_1_3_map,stage_1_4_map,stage_1_5_map];
    let animationFrameId;

    let monsters = [];

    let nbFlames = 0;
    
    const gameOver = function () {
        //wait 0.5 second
        player.direction = playerDirection.DIED;
        setTimeout(() => {
            //stop the animation frame
            cancelAnimationFrame(animationFrameId);
            //clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //draw the game over text
            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
            //draw R to restart
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Press R to restart", canvas.width / 2, canvas.height / 2 + 30);
        }, 500);
    };

    let level;


    const playerDirection = {
        UP: 8,
        DOWN: 10,
        LEFT: 9,
        RIGHT: 11,
        DIED: 20
    }

    const types = {
        wall: 2,
        wallDestroyable: [3,6,7,8],
        
        floor: [1,4,9],
        bomb: {
            frame1: 19,
            frame2: 20,
            frame3: 21,
        },
        fire: {
            big: 34,
        },

        power: {
            bombRange: 73,
            speed: 76,
            bombNumber: 79,
        },
    }

    let player = {

        diedSpriteNumber: 6,

        insideBomb: false,

        position: {
            x: 64,
            y: 64
        },
        direction: playerDirection.RIGHT,

        width: 30,
        height: 50,
        speed: 100,
        vx: 0,
        vy: 0,
        sprites: [],

        powerBombs: 1,
        maxBombs: 1,
        currentBombs: 0,

        alive: true,

        insideBomb: false,

        update: () => {

            if(player.alive == true) {
                
                player.position.x += calcDistanceToMove(delta, player.vx);
                player.position.y += calcDistanceToMove(delta, player.vy);

                if (player.vx > 0) {
                    player.direction = playerDirection.RIGHT;
                } else if (player.vx < 0) {
                    player.direction = playerDirection.LEFT;
                } else if (player.vy > 0) {
                    player.direction = playerDirection.DOWN;
                } else if (player.vy < 0) {
                    player.direction = playerDirection.UP;
                }
            }
        },

        draw: (ctx) => {
            
            //draw the contourn of the player
            //ctx.strokeStyle = "blue";
            //ctx.strokeRect(player.position.x, player.position.y, player.width, player.height);
            

            let sprite = player.sprites[player.direction];
            

            //check if the player direction is died
            if(player.direction == playerDirection.DIED){
                if(player.diedSpriteNumber > 0){
                    sprite.draw(ctx, player.position.x-16, player.position.y-10);
                    player.diedSpriteNumber--;
                }
            }
            else{
                sprite.draw(ctx, player.position.x-16, player.position.y-10);
            }
        },

        placeBomb: () => {

            player.insideBomb = true;
            let cellX ;
            let cellY;
            //get the cell where the player is looking
            let cellX2;
            let cellY2;

            let up = true;
            let down = true;
            let left = true;
            let right = true;

            let drawFire = function () {
                let cell;


                nbFlames++;
                for (let i = 0; i < player.powerBombs; i++) {
                    //up
                    //check if the cell is empty or a destructible block

                    if((types.floor.includes(level.mapData[(cellY2 - i - 1) * level.mapCols + cellX2]) || types.wallDestroyable.includes(level.mapData[(cellY2 - i - 1) * level.mapCols + cellX2])) && up){
                        cell = level.mapData[(cellY2 - i - 1)  * level.mapCols + cellX2]
                        level.mapData[(cellY2 - i - 1)  * level.mapCols + cellX2] = types.fire.big;
                        nbFlames++;
                        clearFire((cellY2 - i - 1)  * level.mapCols + cellX2,cell)
                    }else{ up = false;}
                    //down
                    if((types.floor.includes(level.mapData[(cellY2 + i + 1) * level.mapCols + cellX2])|| types.wallDestroyable.includes(level.mapData[(cellY2 + i + 1) * level.mapCols + cellX2])) && down){
                        cell = level.mapData[(cellY2 + i + 1)  * level.mapCols + cellX2]
                        level.mapData[(cellY2 + i + 1)  * level.mapCols + cellX2] = types.fire.big;
                        nbFlames++;
                        clearFire((cellY2 + i + 1)  * level.mapCols + cellX2,cell)
                    }else{ down = false;}
                    //left
                    if((types.floor.includes(level.mapData[cellY2 * level.mapCols + cellX2 - i - 1]) || types.wallDestroyable.includes(level.mapData[cellY2 * level.mapCols + cellX2 - i - 1])) && left){
                        cell = level.mapData[cellY2 * level.mapCols + cellX2 - i - 1]
                        level.mapData[cellY2 * level.mapCols + cellX2 - i - 1] = types.fire.big;
                        nbFlames++;
                        clearFire(cellY2 * level.mapCols + cellX2 - i - 1,cell)
                    }else{ left = false;}
                    //right
                    if((types.floor.includes((level.mapData[cellY2 * level.mapCols + cellX2 + i + 1])) || types.wallDestroyable.includes(level.mapData[cellY2 * level.mapCols + cellX2 + i + 1])) && right){
                        cell = level.mapData[cellY2 * level.mapCols + cellX2 + i + 1]
                        level.mapData[cellY2 * level.mapCols + cellX2 + i + 1] = types.fire.big;
                        nbFlames++;
                        clearFire(cellY2 * level.mapCols + cellX2 + i + 1,cell)
                    }else{ right = false;}
                }
                level.mapData[cellY2 * level.mapCols + cellX2] = types.fire.big;
                clearFire(cellY2 * level.mapCols + cellX2,4);
            }

            let clearFire = function (tileIndex,cellId) {
                setTimeout(function () {
                    if(types.floor.includes(cellId)){
                        level.mapData[tileIndex] = types.floor[0];
                    }
                    if(cellId == types.wallDestroyable[0]){
                        level.mapData[tileIndex] = types.floor[0];
                    }
                    if(cellId == 6){
                        level.mapData[tileIndex] = types.power.bombRange;
                    }
                    if(cellId == 7){
                        level.mapData[tileIndex] = types.power.speed;
                    }
                    if(cellId == 8){
                        level.mapData[tileIndex] = types.power.bombNumber;
                    }
                    nbFlames--;
                }, 1000);
            }

            if(player.currentBombs < player.maxBombs){
                //get the cell where the player is depending on the direction

                if(player.direction == playerDirection.UP){
                    cellX = Math.floor((player.position.x + player.width/2) / level.tileSize);
                    cellY = Math.floor((player.position.y) / level.tileSize);
                }
                if(player.direction == playerDirection.DOWN){
                    cellX = Math.floor((player.position.x + player.width/2) / level.tileSize);
                    cellY = Math.floor((player.position.y + player.height) / level.tileSize);
                }
                if(player.direction == playerDirection.LEFT){
                    cellX = Math.floor((player.position.x) / level.tileSize);
                    cellY = Math.floor((player.position.y + player.height/2) / level.tileSize);
                }
                if(player.direction == playerDirection.RIGHT){
                    cellX = Math.floor((player.position.x + player.width) / level.tileSize);
                    cellY = Math.floor((player.position.y + player.height/2) / level.tileSize);
                }

                //get the cell where the player is looking
                cellX2 = cellX;
                cellY2 = cellY;
                switch (player.direction) {
                    case playerDirection.UP:
                        cellY2--;
                        break;
                    case playerDirection.DOWN:
                        cellY2++;
                        break;
                    case playerDirection.LEFT:
                        cellX2--;
                        break;
                    case playerDirection.RIGHT:
                        cellX2++;
                        break;
                
                    default:
                        break;
                }


                //console.log("cellX2 : " + cellX2 + " cellY2 : " + cellY2);
                //console.log(level.mapData[cellY2 * level.mapCols + cellX2]);

                if(types.floor.includes(level.mapData[cellY2 * level.mapCols + cellX2])){
                    //console.log("bomb placed");
                    player.currentBombs++;
                    level.mapData[cellY2 * level.mapCols + cellX2] = types.bomb.frame1;
                    
                    setTimeout(() => {
                        level.mapData[cellY2 * level.mapCols + cellX2] = types.bomb.frame2;
                    }, 1000);
                    setTimeout(() => {
                        level.mapData[cellY2 * level.mapCols + cellX2] = types.bomb.frame3;
                    }, 2000);
                    setTimeout(() => {
                        drawFire();
                        player.currentBombs--;
                    }, 3000);
                }
            }

        }
    };


    const loadAssets = function(callback) {
        let playerSpritesheet = "../assests/spritesheets/player-spritesheet.png"
        let SPRITE_WIDTH = 64;
        let SPRITE_HEIGHT = 64;
        let NB_POSTURES=21;

        let NB_FRAMES_PER_POSTURE = [7,7,7,7,8,8,8,8,9,9,9,9,6,6,6,6,13,13,13,13,6]
        // load the spritesheet
        let spritesheet = new Image();
        spritesheet.src = playerSpritesheet;      
      
        // Called when the spritesheet has been loaded
        spritesheet.onload = function() {
               
           // Create player sprites
           for(let i = 0; i < NB_POSTURES; i++) {
              let sprite = new Sprite();
        
              sprite.extractSprites(spritesheet, NB_POSTURES, (i+1), 
                                    NB_FRAMES_PER_POSTURE[i], 
                                    SPRITE_WIDTH, SPRITE_HEIGHT);
              sprite.setNbImagesPerSecond(20);
              player.sprites[i] = sprite;
           }
           // call the callback function passed as a parameter, 
           // we're done with loading assets and building the sprites
           callback();
        };
      };

    const mainloop = function (time){

        animationFrameId = requestAnimationFrame(mainloop);

        //check if the game is alive
        if(player.alive == false){
            gameOver();
        }

        //check if there is still monsters
        if(monsters.length == 0 && player.alive == true && nbFlames == 0 && player.currentBombs == 0){
            //reset the player

            //reset the monsters

            start();
            return;
        }


        //freeze the game if the user is not on the page
        if(!document.hasFocus()){
            return;
        }
        delta = timer(time);

        //clear the canvas
        ctx.clearRect(0,0,w,h);




        level.draw(ctx);
        player.draw(ctx);

        player.update();

        monsters.forEach((monster) => {
            monster.draw(ctx);
            monster.update();
        });

        //on test les collisions avec rectangle intersect

        level.mapTiles.forEach((tile) => {
            if (tile.properties.find((prop) => prop.name === "blocked").value == true) {



                //check for each monster if it's colliding with a wall
                monsters.forEach((monster) => {
                    if (rectanglesIntersect({x:monster.position.x,y:monster.position.y,width:monster.width,height:monster.height},
                                            {x:tile.x,y:tile.y,width:tile.width,height:tile.height}))
                    {
                        //check if wall collision

                        
                        if(tile.value == types.wall - 1 || types.wallDestroyable.includes(tile.value+1)){
                            //console.log("wall collision");
                            monster.position.x -= calcDistanceToMove(delta, monster.vx);
                            monster.position.y -= calcDistanceToMove(delta, monster.vy);

                            monster.vx = -monster.vx;
                            monster.vy = -monster.vy;

                        }

                        //check if bomb collision
                        if(tile.value == types.bomb.frame1 - 1 || tile.value == types.bomb.frame2 - 1 || tile.value == types.bomb.frame3 - 1){
                            //console.log("bomb collision");
                            monster.position.x -= calcDistanceToMove(delta, monster.vx);
                            monster.position.y -= calcDistanceToMove(delta, monster.vy);

                            monster.vx = -monster.vx;
                            monster.vy = -monster.vy;
                        }

                        //check if fire collision
                        if(tile.value == types.fire.big - 1){
                            //console.log("fire collision");
                            monster.alive = false;
                            monsters.splice(monsters.indexOf(monster),1);
                        }                        
                    }
                    //check if the monster is colliding with the player
                    if (rectanglesIntersect({x:monster.position.x,y:monster.position.y,width:monster.width,height:monster.height},
                                            {x:player.position.x,y:player.position.y,width:player.width,height:player.height}))
                    {
                        //console.log("monster collision");
                        player.alive = false;


                    }
                });


                //check for the player if collinding
                if (rectanglesIntersect({x:player.position.x,y:player.position.y,width:player.width,height:player.height},
                                        {x:tile.x,y:tile.y,width:tile.width,height:tile.height}))
                {

                    //check if wall collision
                    //check if the properry wall exist and if it's true
                    if(tile.value == types.wall - 1 || types.wallDestroyable.includes(tile.value+1)){
                        player.position.x -= calcDistanceToMove(delta, player.vx);
                        player.position.y -= calcDistanceToMove(delta, player.vy);
                    }
                    
                    //check if fire collision
                    if(tile.value == types.fire.big - 1){
                        //console.log("fire collision");
                        player.alive = false;


                    }

                    //check if bomb collision
                    if(tile.value == types.bomb.frame1 - 1 || tile.value == types.bomb.frame2 - 1 || tile.value == types.bomb.frame3 - 1){
                        player.position.x -= calcDistanceToMove(delta, player.vx);
                        player.position.y -= calcDistanceToMove(delta, player.vy);
                    }

                    //check if potion collision
                    let index = tile.y/64 * level.mapCols + tile.x/64;
                    switch(tile.value){
                        case types.power.bombRange - 1:
                            //console.log("bomb range potion collision");
                            player.powerBombs++;
                            //get the index of the tile in the mapData
                            level.mapData[index] = types.floor[0];
                            break;
                        case types.power.speed - 1:
                            //console.log("speed potion collision");
                            player.speed *= 1.5;
                            //change the tile to a normal tile
                            level.mapData[index] = types.floor[0];
                            break;
                        case types.power.bombNumber - 1:
                            //console.log("bomb number potion collision");
                            player.maxBombs++;
                            level.mapData[index] = types.floor[0];
                            break;
                    }
                }
            }
        });
    
    }

    const start = function (){

        player.alive = true;
        player.currentBombs = 0;
        player.maxBombs = 1;
        player.powerBombs = 1;
        player.speed = 100;
        player.diedSpriteNumber = 6;
        player.position.x = 64;
        player.position.y = 64;
        
        //console.log('Game started');

        
        let displayStage = document.querySelector("#stage");

        


        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext('2d');
        w = canvas.width;
        h = canvas.height;

        //pop the first stage in the array
        currentStage = allStages.shift();

        displayStage.innerHTML = currentStage.layers[0].name;


        //check if the stage is not empty
        if(currentStage == undefined){
            //console.log("no more stages");
            //draw the end screen
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,w,h);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("You win !", w/2 - 50, h/2);
            return;
        }

        level = new Level(currentStage, currentTiles);
        
        level.draw(ctx);

        //check if the tile is a monster
        for (let i = 0; i < level.mapTiles.length; i++) {
            if (level.mapTiles[i].value == 0) {
                let monster = new Monster(level.mapTiles[i].x, level.mapTiles[i].y, "../assests/spritesheets/monster-spritesheet.png")
                monsters.push(monster);
                monster.vx = -monster.speed;
            }
            if (level.mapTiles[i].value == 8) {
                let monster = new Monster(level.mapTiles[i].x, level.mapTiles[i].y, "../assests/spritesheets/monster-spritesheet.png")
                monsters.push(monster);
                monster.vy = -monster.speed;
            }
        }
        //stock game solo dans une variable
        addListeners(player);

        loadAssets(function() {
            animationFrameId = requestAnimationFrame(mainloop);
        });
    }


    return {
        //return all the functions
        start: start,
    }
}
