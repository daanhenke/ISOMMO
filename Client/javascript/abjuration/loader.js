/*
* The DependencyLoader for the game, loads in all game scripts, jquery and (maybe) images & sound;
* @DaanHenkek
*/

var Loader;

///Loader constructor
var loader = function (jqueryVersion, options, debug)
{
    this.debug = debug === true;
    this.jquery = jqueryVersion != -1;
    this.options = options;
    this.amountLoaded = 0;
    this.maxLoaded = -1;

    this.loadFiles("localhost")
};

///loadScript (script url, callback) //Loads script and executes callback on completion;
loader.prototype.loadScript = function (url, callback)
{
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    script.onload = callback;

    document.head.appendChild(script);
};

///isLocal () Check if we are running in the browser or in a native environment;
loader.prototype.isLocal = function ()
{
    try
    {
        return (typeof require('nw.gui') !== "undefined");
    }
    catch (error)
    {
        return undefined;
    }
};

///loadFiles (url) //Loads all required resources from the server
loader.prototype.loadFiles = function (url)
{
    if (url === "localhost") url = "../../Server/resources/";
    this.url = url;
    this.loadScript(url + "data.js", this.loadStageTwo)
};

//Second stage of loadFiles, didn't need to be its own thing.
loader.prototype.loadStageTwo = function () {
    console.log("You are running version " + downloadData.gameDetails.version.toString() + " made by " + downloadData.gameDetails.developer);
    if (downloadData.gameDetails.inHouse) console.log("!! INHOUSE BUILD !!");

    for (var i = 0; i < downloadData.scripts.length; i++) {
        Loader.maxLoaded = downloadData.scripts.length;
        Loader.loadScript(Loader.url + downloadData.scripts[i], function () {
            Loader.amountLoaded++;
            if (Loader.debug) console.log("Loaded " + Loader.amountLoaded.toString() + " scripts out of " + Loader.maxLoaded.toString() + ", ( " + ((Loader.amountLoaded / Loader.maxLoaded) * 100).toString() + "% )");
            if (Loader.amountLoaded == Loader.maxLoaded)
            {
                console.log("All core files have been loaded.. Loading game");
                runGame(Loader.options);
            }
        });
    }
};