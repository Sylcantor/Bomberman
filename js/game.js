
window.onload = init;

function init() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
    var game = new Game(context);
    game.start();
}

//game class

function Game(context) {

    this.context = context;
    this.gameState = new GameState();
    this.gameState.init();
    this.gameState.start();
}











Game.prototype.start = function() {
    this.gameState.start();
}

//game state class

function GameState() {
    this.gameObjects = [];
}

GameState.prototype.init = function() {
    this.gameObjects.push(new Player());
}

GameState.prototype.start = function() {
    this.gameObjects.forEach(function(gameObject) {
        gameObject.start();
    });
}

//player class

function Player() {
    this.x = 0;
    this.y = 0;
}

Player.prototype.start = function() {
    console.log("player started");
}


