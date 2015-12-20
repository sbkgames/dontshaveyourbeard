/**
* A title screen
**/
game.TitleScreen = me.ScreenObject.extend({
  // reset function
  onResetEvent: function() {
		me.game.world.addChild(
            new me.Sprite(
                0,0, {
                   image: me.loader.getImage("title_screen")
                }
            ),
            1
        );
		me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init : function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
                // font for the  text
                this.font = new me.Font("Arial", "20px", "black", "middle");
            },
         
            update : function (dt) {
                return true;
            },
             
            draw : function (renderer) {
				this.font.draw(renderer, "Press Enter to start\nwhy", 500, 600);
            },
            onDestroyEvent : function() {
                //just in case
            }
        })), 2);
		
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                //me.audio.play("cling");
                me.state.change(me.state.PLAY);
            }
        });
  },
 
  // destroy function
  onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.mouse.LEFT);
        me.event.unsubscribe(this.handler);
  }
});