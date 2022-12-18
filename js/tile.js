

export default class Tile {

    x;y;
    width;height;
    value;

    traverseable;

    constructor(x,y,w,h,value) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.value = value;
    }

    
}