var game = new Phaser.Game(1500, 800, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    initTile: initTile,
    addTile: addTile,
    checkMatch: checkMatch,
    getMatches: getMatches,
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
}

function create() {

    var me = this;

    me.game.stage.backgroundColor = "34495f";
 
    //Declare assets that will be used as tiles
    me.tileTypes = [
        'blue',
        'green'
    ];
 
    //Keep track of the users score
    me.score = 0;
 
    //Keep track of the tiles the user is trying to swap (if any)
    me.activeTile1 = null;
    me.activeTile2 = null;
 
    //Controls whether the player can make a move or not
    me.canMove = false;
 
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

function update() {

    var me = this;
 
    //The user is currently dragging from a tile, so let's see if they have dragged
    //over the top of an adjacent tile
    if(me.activeTile1 && !me.activeTile2){
 
        //Get the location of where the pointer is currently
        var hoverX = me.game.input.x;
        var hoverY = me.game.input.y;

        // console.log("#update me.game.input", me.game.input);
 
        //Figure out what position on the grid that translates to
        var hoverPosX = Math.floor(hoverX/me.tileWidth);
        var hoverPosY = Math.floor(hoverY/me.tileHeight);
 
        //See if the user had dragged over to another position on the grid
        var difX = (hoverPosX - me.startPosX);
        var difY = (hoverPosY - me.startPosY);
 
        //Make sure we are within the bounds of the grid
        if(!(hoverPosY > me.tileGrid[0].length - 1 || hoverPosY < 0) && !(hoverPosX > me.tileGrid.length - 1 || hoverPosX < 0)){
 
            //If the user has dragged an entire tiles width or height in the x or y direction
            //trigger a tile swap
            if((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY ==0)){
 
                //Prevent the player from making more moves whilst checking is in progress
                me.canMove = false;
 
                //Set the second active tile (the one where the user dragged to)
                me.activeTile2 = me.tileGrid[hoverPosX][hoverPosY];
 
                //Swap the two active tiles
                me.swapTiles();
 
                //After the swap has occurred, check the grid for any matches
                me.game.time.events.add(500, function(){
                    me.checkMatch();
                });
            }
 
        }
 
    }

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
 
    // TODO
 
}

function addTile(x, y) {

    // console.log(">> #addTile");
 
    var me = this;
 
    //Choose a random tile to add
    var tileToAdd = me.tileTypes[me.random.integerInRange(0, me.tileTypes.length - 1)];
 
    //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
    var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);
 
    //Animate the tile into the correct vertical position
    // console.log("#addTile type", type);
    me.game.add.tween(tile).to({y:y*me.tileHeight+(me.tileHeight/2)}, 500, Phaser.Easing.Linear.In, true)
 
    //Set the tiles anchor point to the center
    tile.anchor.setTo(0.5, 0.5);
 
    //Enable input on the tile
    tile.inputEnabled = true;
 
    //Keep track of the type of tile that was added
    tile.tileType = tileToAdd;


    return tile;
 
}

function checkMatch(){
 
    var me = this;
 
    //Call the getMatches function to check for spots where there is
    //a run of three or more tiles in a row
    var matches = me.getMatches(me.tileGrid);
 
    console.log("#checkMatch matches", matches.length);
 
}

function getMatches(tileGrid){
    var matches = [];
    
    // TODO


    return matches;
}
