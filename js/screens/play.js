game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
		// load a level
		me.sys.gravity = 0;
		me.levelDirector.loadLevel("area05");
        // reset the score
        game.data.score = 0;
		me.audio.playTrack("AquaVitae.mp3");
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
		me.audio.stopTrack();
    }
});
