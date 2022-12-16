export default class Level{
    
    constructor(map) {
        this.map = map;
    }

    draw(ctx) {
        const map = this.map;
        let tileAtlas = new Image();
        tileAtlas.src = "../assests/spritesheets/Stage-1.png";
        let tileSize = 16;
        let tileOutputSize = 2 // can set to 1 for 32px or higher
        let updatedTileSize = tileSize * tileOutputSize;
        let atlasCol = 8;
        let mapCols = map.layers[0].width
        let mapRows = map.layers[0].height
        let level = map.layers[0].data;
        
        tileAtlas.onload = () => {
            for (let row = 0; row < mapRows; row++) {
                for (let col = 0; col < mapCols; col++) {
                    let tile = level[row * mapCols + col] - 1;
                    //console.log(tile);
                    let tileX = (tile % atlasCol) * tileSize;
                    let tileY = Math.floor(tile / atlasCol) * tileSize;
                    let x = col * updatedTileSize;
                    let y = row * updatedTileSize;
                    //console.log("yo");
                    ctx.drawImage(tileAtlas, tileX, tileY, tileSize, tileSize, x, y, updatedTileSize, updatedTileSize);
                }
            }
        }
    }
}