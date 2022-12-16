import { calcDistanceToMove } from "./timeBasedAnim.js";
import { inputStates } from "./listerners.js";

import stage_1_map from "./../assests/maps/Stage-1-1.json" assert { type: "json" };
import stage_1_tiles from "./../assests/tiles/Stage-1-1.json" assert { type: "json" };


var PLAYER_DIRECTION = {
    UP: 4,
    DOWN: 0,
    LEFT: 2,
    RIGHT: 6
}

export default class Player {
    x;
    y;
    playerSize = 32;
    canvaswidth;
    canvasheight;
    vx = 0;
    vy = 0;
    speed = 320;
    direction = PLAYER_DIRECTION.RIGHT;



    constructor(x,y,canvaswidth,canvasheight) {
        this.x = x;
        this.y = y;
        this.canvaswidth = canvaswidth;
        this.canvasheight = canvasheight;
    }


    /*
    draw(ctx){
        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.restore();

    }
    */

    getCellPosition(){
        return {
            x: Math.floor(this.x / 32),
            y: Math.floor(this.y / 32)
        }
    }

    getCellProperties(map,cellPosition){
        let cell = map.layers[0].data[cellPosition.y * map.layers[0].width + cellPosition.x];
        //console.log("cell : " + cell);
        //catch the case where the player is on a tile with no instance properties
        return stage_1_tiles.tiles.find(t => t.id === cell - 1).properties;

    }

    updatePosition(delta){
        if(inputStates.left){
            this.vx = -1;
            this.vy = 0;
            this.direction = PLAYER_DIRECTION.LEFT;
        }
        if(inputStates.right){
            this.vx = 1;
            this.vy = 0;
            this.direction = PLAYER_DIRECTION.RIGHT;
        }
        if(inputStates.up){
            this.vx = 0;
            this.vy = -1;
            this.direction = PLAYER_DIRECTION.UP;
        }
        if(inputStates.down){
            this.vx = 0;
            this.vy = 1;
            this.direction = PLAYER_DIRECTION.DOWN;
        }

        //check input states reset
        if(!inputStates.left && !inputStates.right){
            this.vx = 0;
        }
        if(!inputStates.up && !inputStates.down){
            this.vy = 0;
        }

        //collision detection

        
        
        //console.log(this.canvaswidth + " " + this.canvasheight)
        //console.log(this.x + " " + this.y)

        
         //get the tile at the player's position
         var tile = stage_1_map.layers[0].data[0] - 1;
         //console.log(tile);
         //console.log(stage_1_tiles.tiles.find(t => t.id === tile))
         //check if the tile is blocked

        let cellPosition = this.getCellPosition();
        let cellProperties = this.getCellProperties(stage_1_map,cellPosition);
        let oldx = this.x;
        let oldy= this.y;

        

        //console.log(cellProperties.find(property => property.name === "blocked").value)
        if(cellProperties.find(property => property.name === "blocked").value){
            this.vx = 0;
            this.vy = 0;
        }
        
            
        
        this.x += calcDistanceToMove(delta, this.vx * this.speed);
        this.y += calcDistanceToMove(delta, this.vy * this.speed);
        
        console.log(cellPosition)
        console.log(calcDistanceToMove(delta, this.vx * this.speed))
    }



   checkCollisions() {
    // Bounding rect position and size for the player. We need to translate
    // it to half the player's size
    var playerSize = player.boundingCircleRadius;
    var playerXBoundingRect = player.x - playerSize / 2;
    var playerYBoundingRect = player.y - playerSize / 2;
    // Same with the monster bounding rect
    var monsterXBoundingRect = monster.x - monster.width / 2;
    var monsterYBoundingRect = monster.y - monster.height / 2;
   
     if (rectsOverlap(playerXBoundingRect, playerYBoundingRect,
                     playerSize, playerSize,
                     monsterXBoundingRect, monsterYBoundingRect,
                     monster.width, monster.height)) {
       ctx.fillText("Collision", 150, 20);
       ctx.strokeStyle = ctx.fillStyle = 'red';
     } else {
       ctx.fillText("No collision", 150, 20);
       ctx.strokeStyle = ctx.fillStyle = 'black';
    }
  }
   
  // Collisions between aligned rectangles
  rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
   
    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
       return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
       return false; // No vertical axis projection overlap
    return true; // If previous tests failed, then both axis projections
                 // overlap and the rectangles intersect
  }


}