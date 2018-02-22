var game = new Phaser.Game(1500, 800, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    initTile: initTile,
    addTile: addTile,
});


function preload() {
    // TODO
}

function create() {

    var me = this;

    me.game.stage.backgroundColor = "34495f";
 
    me.tileTypes = [
        // TODO
    ];
    
 
    //Grab the weigh and height of the tiles (assumes same size for all tiles)
    me.tileWidth = me.game.cache.getImage('blue').width;
    me.tileHeight = me.game.cache.getImage('blue').height;
 
    //This will hold all of the tile sprites
    me.tiles = me.game.add.group();
 
    //Initialise tile grid, this array will hold the positions of the tiles
    //Create whatever shape you'd like
    me.tileGrid = [
        // TODO
    ];
 
    //Create a random data generator to use later
    var seed = Date.now();
    me.random = new Phaser.RandomDataGenerator([seed]);

    // TODO
}

function initTile() {
 
    var me = this;
 
    // TODO
}

function addTile(x, y) {
 
    var me = this;
 
    // TODO
 
}
