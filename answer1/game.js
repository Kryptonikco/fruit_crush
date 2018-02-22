var game = new Phaser.Game(1500, 800, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    initTile: initTile,
    addTile: addTile,
});


function preload() {
    this.game.load.image('blue', 'assets/fruitRaisin.png');
    this.game.load.image('green', 'assets/fruitAvocado.png');
    this.game.load.image('red', 'assets/fruitApple.png');
    this.game.load.image('red2', 'assets/fruitWatermelon.png');
    this.game.load.image('red3', 'assets/fruitCherry.png');
    this.game.load.image('yellow', 'assets/fruitPear.png');
    this.game.load.image('yellow2', 'assets/fruitBanana.png');
    this.game.load.image('orange', 'assets/fruitOrange.png');
    this.game.load.image('pink', 'assets/fruitStrawberry.png');
    this.game.load.image('candy', 'assets/gemYellow.png');
}

function create() {

    var me = this;

    me.game.stage.backgroundColor = "34495f";
 
    //Declare assets that will be used as tiles
    me.tileTypes = [
        'blue',
        'green',
        'red',
        'yellow',
    ];
 
    //Grab the weigh and height of the tiles (assumes same size for all tiles)
    me.tileWidth = me.game.cache.getImage('blue').width;
    me.tileHeight = me.game.cache.getImage('blue').height;
 
    //This will hold all of the tile sprites
    me.tiles = me.game.add.group();
 
    //Initialise tile grid, this array will hold the positions of the tiles
    //Create whatever shape you'd like
    me.tileGrid = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
 
    //Create a random data generator to use later
    var seed = Date.now();
    me.random = new Phaser.RandomDataGenerator([seed]);

    me.initTile();
}

function initTile() {
 
    var me = this;
 
    //Loop through each column in the grid
    for(var i = 0; i < me.tileGrid.length; i++){
 
        //Loop through each position in a specific column, starting from the top
        for(var j = 0; j < me.tileGrid.length; j++){
 
            //Add the tile to the game at this grid position
            var tile = me.addTile(i, j);
 
            //Keep a track of the tiles position in our tileGrid
            me.tileGrid[i][j] = tile;
 
        }
    }
}

function addTile(x, y) {
 
    var me = this;
 
    //Choose a random tile to add
    var tileToAdd = me.tileTypes[me.random.integerInRange(0, me.tileTypes.length - 1)];
 
    //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
    var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, y*me.tileHeight+(me.tileHeight/2), tileToAdd);
 
    //Set the tiles anchor point to the center
    tile.anchor.setTo(0.5, 0.5);

    return tile;
 
}
