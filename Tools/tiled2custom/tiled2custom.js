var fs = require("fs");

var inf = "input.json";
var ouf = "output.json";

var input = JSON.parse( fs.readFileSync(__dirname + "\\" + inf));
var output = {tiles: null, sprites: []};

var tileTable =
{
    0: 0,
    1: 1,
    77: 2
};

//Tiles
var mapWidth = input.layers[0].width;
var mapHeight = input.layers[0].height;
var totalMap = input.layers[0].data.length;

output.tiles = new Array(mapHeight);

for (var h = 0; h < mapHeight; h++)
{
    output.tiles[h] = new Array(mapWidth);
    for (var w = 0; w < mapWidth; w++)
    {
        var current = (h * mapWidth + w);
        var tile = input.layers[0].data[current] - 1;

        if (!tileTable.hasOwnProperty(tile))
        {
            console.log("Undefined tile: ", tile, " at location: ", current)
            tile = -1;
        }
        else
        {
            tile = tileTable[tile];
        }

        output.tiles[h][w] = tile;
    }
}

console.log(output);