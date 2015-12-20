
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,
		mssg : "",
		hasScissors : false,
		isDead : false
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(1024, 800, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
		// set a global fading transition for the screen
		//me.state.transition("fade", "#FFFFFF", 250);
		this.mssg = "LOL";
        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
		//ADD FUCKING BUTTERFLIES
		me.pool.register("ButterflyEntity", game.ButterflyEntity);
		//ADD A SEXY LADY
		me.pool.register("SpectatorEntity", game.SpectatorEntity);
		//DUCKS 
		me.pool.register("Entety", game.Entety);
		me.pool.register("InvItemEnt", game.InvItemEnt);
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.S, "s");
		me.input.bindKey(me.input.KEY.B, "b");
        // Start the game.
        me.state.change(me.state.MENU);
    }
};
