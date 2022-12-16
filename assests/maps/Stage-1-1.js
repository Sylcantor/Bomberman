(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("Stage-1-1",
{ "compressionlevel":-1,
 "height":13,
 "infinite":false,
 "layers":[
        {
         "data":[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 4, 4, 4, 4, 3, 4, 4, 4, 3, 4, 4, 4, 4, 2,
            2, 4, 2, 3, 2, 3, 2, 4, 2, 4, 2, 4, 2, 4, 2,
            2, 4, 4, 4, 4, 3, 3, 3, 4, 3, 4, 3, 3, 3, 2,
            2, 3, 2, 4, 2, 4, 2, 3, 2, 4, 2, 3, 2, 4, 2,
            2, 3, 4, 3, 4, 3, 3, 3, 4, 4, 4, 3, 4, 3, 2,
            2, 3, 2, 4, 2, 3, 2, 4, 2, 4, 2, 4, 2, 3, 2,
            2, 3, 4, 4, 4, 3, 4, 3, 4, 3, 4, 4, 4, 3, 2,
            2, 3, 2, 3, 2, 4, 2, 4, 2, 3, 2, 4, 2, 3, 2,
            2, 4, 4, 3, 4, 3, 3, 3, 4, 3, 3, 3, 4, 3, 2,
            2, 4, 2, 3, 2, 4, 2, 4, 2, 3, 2, 3, 2, 4, 2,
            2, 4, 4, 3, 3, 3, 3, 3, 4, 3, 4, 3, 4, 4, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
         "height":13,
         "id":1,
         "name":"Calque de Tuiles 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.8.4",
 "tileheight":16,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/tiles\/Stage-1-1.tsx"
        }],
 "tilewidth":16,
 "type":"map",
 "version":"1.8",
 "width":15
});