var GameObject;

var Game = Game || function (options)
    {
        console.log("Started game.");
        this.options = options;
        this.renderManager = new RenderManager(this, options.canvas);
    };

function runGame (options)
{
    GameObject = new Game(options);
}