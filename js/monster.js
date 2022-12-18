import Sprite from "./sprites.js";


const DIRECTION = {
    UP: 8,
    DOWN: 10,
    LEFT: 9,
    RIGHT: 11,
    DIED: 20
};

export default class Monster {

    position = {
        x: 0,
        y: 0
    };
    direction = DIRECTION.LEFT;

    width = 30;
    height = 54;
    speed = 100;
    vx = 0;
    vy = 0;
    spritesheetPath = "../assests/spritesheets/monster-spritesheet.png";

    sprites= [];

    alive = true;

    constructor(x, y, spritesheetPath) {
        this.position.x = x;
        this.position.y = y;
        this.spritesheetPath = spritesheetPath;
        this.loadAssets();
    }

    loadAssets() {
        
        let SPRITE_WIDTH = 64;
        let SPRITE_HEIGHT = 64;
        let NB_POSTURES=21;
        let NB_FRAMES_PER_POSTURE = [7,7,7,7,8,8,8,8,9,9,9,9,6,6,6,6,13,13,13,13,6]
        
        // load the spritesheet
        let spritesheet = new Image();
        spritesheet.src = this.spritesheetPath;      
        

        // Called when the spritesheet has been loaded
        spritesheet.onload = () => {
            // Create player sprites
            for(let i = 0; i < NB_POSTURES; i++) {
                let sprite = new Sprite();
        
                sprite.extractSprites(spritesheet, NB_POSTURES, (i+1), 
                                    NB_FRAMES_PER_POSTURE[i], 
                                    SPRITE_WIDTH, SPRITE_HEIGHT);
                sprite.setNbImagesPerSecond(20);
                this.sprites[i] = sprite;
            }
        };
    }
        
    update() {
        if (this.alive) {
            this.position.x += calcDistanceToMove(delta, this.vx);
            this.position.y += calcDistanceToMove(delta, this.vy);

            this.direction = this.vx < 0 ? DIRECTION.LEFT : this.vx > 0 ? DIRECTION.RIGHT : this.vy < 0 ? DIRECTION.UP : this.vy > 0 ? DIRECTION.DOWN : this.direction;
        }
    }
    draw(ctx) {
        //ctx.strokeStyle = "red";
        //ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        if (this.alive) {
            this.sprites[this.direction].draw(ctx, this.position.x-16, this.position.y-10);
        }
    }
}