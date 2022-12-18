import Monster from "./monster.js";

export default class Level {
    
    name;
    tileSize;
    tileOutputSize;
    updatedTileSize;
    atlasCol;

    tileAtlas;

    mapCols;
    mapRows;
    mapData;


    mapTiles = [];
    tiles;

    constructor(map,tiles) {
        this.mapCols = map.layers[0].width
        this.mapRows = map.layers[0].height

    
        this.mapData = [...map.layers[0].data];

        this.name = map.layers[0].name;
        
        this.tileSize = 64;
        this.tileOutputSize = 1;
        this.updatedTileSize = this.tileSize * this.tileOutputSize;
        this.atlasCol = 9;
        this.tiles = tiles.tiles;

        this.loadAssessts();
    };

    
    loadAssessts() {
        this.tileAtlas = new Image();
        this.tileAtlas.src = '../assests/spritesheets/map-spritesheet-64px.png';
        //callback();


    }

    draw(ctx) {
        //draw a rectangle for the background
        for (let row = 0; row < this.mapRows; row++) {
            for (let col = 0; col < this.mapCols; col++) {
                let tileIndex = row * this.mapCols + col;
                let tile = this.mapData[tileIndex] - 1;
                //console.log(tile);
                let tileX = (tile % this.atlasCol) * this.tileSize;
                let tileY = Math.floor(tile / this.atlasCol) * this.tileSize;
                let x = col * this.updatedTileSize;
                let y = row * this.updatedTileSize;

                ctx.drawImage(this.tileAtlas, tileX, tileY, this.tileSize, this.tileSize, x, y, this.updatedTileSize, this.updatedTileSize);

                this.mapTiles[tileIndex] = {x:x, y:y, width:this.updatedTileSize, height:this.updatedTileSize, value:tile, properties:this.tiles[tile].properties};

                if(this.tiles[tile].properties.find(prop => prop.name == "blocked").value == true) {
                    
                    //draw an invisible rectangle over the tile
                    //ctx.fillStyle = "rgba(0,0,0,0)";
                    //ctx.fillRect(x, y, this.updatedTileSize, this.updatedTileSize);

                    //draw for debugging contour of the tile
                    //ctx.strokeStyle = "rgba(255,0,0,1)";
                    //ctx.strokeRect(x, y, this.updatedTileSize, this.updatedTileSize);
                }
                

            }
        }  
    };
}
