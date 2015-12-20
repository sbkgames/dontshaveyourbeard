/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(15, 80));
		this.addChild(new game.HUD.MessageItem(15,765));
    }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 20, 20]);
		//var bgimage = new Image("txtbg");
		this.font= new me.Font("Arial", "24px", "black", "left");
		//this.font.set("right");
        // local copy of the global score
        //this.score = -1;
		this.time = me.timer.getTime();
		this.income = 0;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.time + 4000 < me.timer.getTime() && !game.isDead) {
            this.time = me.timer.getTime();
			this.income += 1;
			game.score = this.income;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (context) {
		//this.bgimage.draw(context, this.pos.x, this.pos.y);
        this.font.draw (context, String.concat("You earned ",this.income, " £"), this.pos.x, this.pos.y);
    }

});

/**
 * a basic HUD item to display messages
 */
 
game.HUD.MessageItem = me.Renderable.extend({
    /**
     * constructor
     */
	 
	 init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 20, 20]);
		//var bgimage = new Image("txtbg");
		this.font= new me.Font("Arial", "18px", "black", "left");
		//this.font.set("right");
        // local copy of the global score
        //this.score = -1;
		this.time = me.timer.getTime();
		
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        /*if (this.time + 4000 < me.timer.getTime()) {
            this.time = me.timer.getTime();
			this.income += 1;
			game.score = this.income;
            return true;
        }*/
        return true;
    },

    /**
     * draw the text
     */
    draw : function (context) {
		if (game.message != null){
			this.font.draw (context, game.message, this.pos.x, this.pos.y);		
		}
		else {
			this.font.draw (context, "Press B to buy scissors, S to shave your beard", this.pos.x, this.pos.y);		
		}
    }
});

/**
 * a basic HUD item to display inventory items
 */
 
game.HUD.InvItem = me.Renderable.extend({
    /**
     * constructor
     */
	 
	 init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 20, 20]);
		//var bgimage = new Image("txtbg");
		this.font= new me.Font("Arial", "18px", "black", "left");
		//this.font.set("right");
        // local copy of the global score
        //this.score = -1;
		this.time = me.timer.getTime();
		
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        /*if (this.time + 4000 < me.timer.getTime()) {
            this.time = me.timer.getTime();
			this.income += 1;
			game.score = this.income;
            return true;
        }*/
        return true;
    },

    /**
     * draw the text
     */
    draw : function (context) {
		if (game.message != null){
			this.font.draw (context, game.message, this.pos.x, this.pos.y);		
		}
		else {
			this.font.draw (context, "Press B to buy scissors, S to shave your beard", this.pos.x, this.pos.y);		
		}
    }
});