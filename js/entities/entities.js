/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
		//Setting the shape a bit smaller because reasons
		//settings.shapes[0] = new me.Rect(0, 0, settings.framewidth-9, settings.frameheight);
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
		// set the default horizontal & vertical speed (accel vector)
		this.body.setVelocity(3, 3);
		// ensure the player is updated even when outside of the viewport
		this.alwaysUpdate = true;
		// define a basic walking animation (using all frames)
		this.renderable.addAnimation("walk",  [0, 1, 2, 3]);
		// define a standing animation (using the first frame)
		this.renderable.addAnimation("stand",  [1]);
		// define a reading animation
		this.renderable.addAnimation("read",  [4]);
		this.renderable.addAnimation("shaved",[5]);
		// set the standing animation as default
		this.renderable.setCurrentAnimation("stand");
		var idletime = 0;
		this.isAlive = true;
    },

    /**
     *update the player pos
     */
	 
    update : function (dt) {
		if (this.isAlive){
			if (me.input.isKeyPressed('left')) 
			{
				this.idletime = 0;
				// unflip the sprite on horizontal axis
				this.renderable.flipX(false);
				// update the entity velocity
				this.body.vel.x -= this.body.accel.x * me.timer.tick;
				// change to the walking animation
				if (!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
				}
			}else if (me.input.isKeyPressed('right'))
			{
				this.idletime = 0;
				// flip the sprite
				this.renderable.flipX(true);
				// update the entity velocity
				this.body.vel.x += this.body.accel.x * me.timer.tick;
				// change to the walking animation
				if (!this.renderable.isCurrentAnimation("walk")) 
				{
					this.renderable.setCurrentAnimation("walk");
				}
			}
			else if (me.input.isKeyPressed('up')){
				this.idletime = 0;
				//update the entity velocity
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
				// change to the walking animation
				if (!this.renderable.isCurrentAnimation("walk")) 
				{
					this.renderable.setCurrentAnimation("walk");
				}
			}
			else if (me.input.isKeyPressed('down')){
				this.idletime = 0;
				//update the entity velocity
				this.body.vel.y += this.body.accel.y * me.timer.tick;
				// change to the walking animation
				if (!this.renderable.isCurrentAnimation("walk")) 
				{
					this.renderable.setCurrentAnimation("walk");
				}
			}
			else
			{
				this.idletime += 1;
				this.body.vel.x = 0;
				this.body.vel.y = 0;
					// change to the standing animation
					if(this.idletime < 250)
					{
						this.renderable.setCurrentAnimation("stand");
					} else {
						this.renderable.setCurrentAnimation("read");
					}
			}
			if (me.input.isKeyPressed('s')){
					if(game.hasScissors)
					{
						game.message = "Game over";
						this.isAlive = false;		
						game.isDead = true;
						this.renderable.setCurrentAnimation("shaved");
					}
					else {
						game.message = "You don't have scissors";
					}
					
			}
			if (me.input.isKeyPressed('b')){
				if (game.score < 5 || game.score == null){
					game.message = "You don't have enough money. You need 5 £";
				}
				else {
					game.message = "You bought scissors";
					//me.Container ("InvItemEnt").renderable.setCurrentAnimation("solid");
					/*if	(me.pool.exists("InvItemEnt")){
						var invItem = me.pool.("InvItemEnt");
						invItem.renderable.setCurrentAnimation("solid");
					}*/
					var invItem = me.game.world.getChildByName("InvItemEnt")[0]; 
						invItem.renderable.setCurrentAnimation("solid");
					game.hasScissors = true;
					//game.score -= 5;
					
				}
			}
			// apply physics to the body (this moves the entity)
			this.body.update(dt);

			// handle collisions against other shapes
			me.collision.check(this);
		}
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
	},

	/**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});
/*----------------
  a butterfly entity
 ----------------- */
game.ButterflyEntity = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
 
  },
 
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
	if (me.pool.exists("player"))
	{
		var player = me.pool.pull("player");
		this.x += (this.x - me.player.x);
		this.y += (this.y - me.player.y);	
    }
	// make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
 
    // remove it
    //me.game.world.removeChild(this);
 
    return false
  }
});
/*----------------
  a inventory item entity
 ----------------- */
game.InvItemEnt = me.Entity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    settings.image = "scissors";
    var width = settings.width;
    var height = settings.height;
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 96;
    settings.frameheight = settings.height = 96;
	
    this._super(me.Entity, 'init', [x, y , settings]);
     this.body.setCollisionMask(me.collision.types.NO_OBJECT);
	this.renderable.addAnimation("trans", [0]);	
	this.renderable.addAnimation("solid", [1]);
	this.renderable.setCurrentAnimation("trans");
  },
	update: function(dt) {
		if(this.renderable.isCurrentAnimation("trans") && me.game.hasScissors){
			this.renderable.setCurrentAnimation("solid");
		}
 },
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
	// make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
 
    // remove it
    //me.game.world.removeChild(this);
 
    return false
  }
});
/* --------------------------
an spectator Entity
------------------------ */
game.SpectatorEntity = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "ente";
	//this.alwaysUpdate = true;
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;
	//defines wheter the spec is walking or watching
	var isWatching = false;
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 90;
    settings.frameheight = settings.height = 48;
 
    // redefine the default shape (used to define path) with a shape matching the renderable
    settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);
	
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y -settings.frameheight , settings]);
	
	// define a basic walking animation (using all frames)
	this.renderable.addAnimation("walk",  [0, 1]);
	this.renderable.anim["walk"].speed  = 1;
	// define a standing animation (using the first frame)
	this.renderable.addAnimation("stand",  [0]);
	// set the standing animation as default
	this.renderable.setCurrentAnimation("stand");
	
 
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.framewidth
    this.pos.x  = x + width - settings.framewidth;
 
    // to remember which side we were walking
    this.walkLeft = false;
 
    // walking & jumping speed
    this.body.setVelocity(1, 0.5);
 
  },
 
  // manage the enemy movement
  update: function(dt) {
    if (this.alive && !this.isWatching) 
	{
	
		if (!this.renderable.isCurrentAnimation("walk"))
		{	
			this.renderable.setCurrentAnimation("walk");
		}
		if (this.walkLeft && this.pos.x <= this.startX) 
		{
			this.walkLeft = false;
			//this.isWatching = true;
		} 	
		else if (!this.walkLeft && this.pos.x >= this.endX) {
			this.walkLeft = true;
			//this.isWatching = true;
		}
		// make it walk
		this.renderable.flipX(this.walkLeft);
		this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
 
	} else 
	{
		this.body.vel.x = 0;
		this.body.vel.y = 0;
		if (this.isWatching)
		{
			if (!this.renderable.isCurrentAnimation("watch"))
			{
				this.renderable.setCurrentAnimation("walk");
			}
		}
	}
    // update the body movement
    this.body.update(dt);
 
    // handle collisions against other shapes
    me.collision.check(this);
 
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
 
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
	  //do nothing
    return false;
  }
});
/* --------------------------
a DUCK ENTITY
GET IT
ENTETY
ENTE TY
HAHA
HA
FUCK MY LIFE
------------------------ */
game.Entety = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "ente";
	//this.alwaysUpdate = true;
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 90;
    settings.frameheight = settings.height = 48;
 
    // redefine the default shape (used to define path) with a shape matching the renderable
    settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y -settings.frameheight , settings]);
	
	// define a basic walking animation (using all frames)
	this.renderable.addAnimation("walk",  [0, 1]);
	this.renderable.anim["walk"].speed  = 1;
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.framewidth
    this.pos.x  = x + width - settings.framewidth;
 
    // to remember which side we were walking
    this.walkLeft = false;
 
    // walking & jumping speed
    this.body.setVelocity(0.5,0.5);
     this.body.setCollisionMask(me.collision.types.NO_OBJECT);
  },
 
  // manage the duck movement
  update: function(dt) {
    if (this.alive) 
	{
		
		if (!this.renderable.isCurrentAnimation("walk"))
		{	
			this.renderable.setCurrentAnimation("walk");
		}
		if (this.walkLeft && this.pos.x <= this.startX) 
		{
			this.walkLeft = false;
		} 	
		else if (!this.walkLeft && this.pos.x >= this.endX) {
			this.walkLeft = true;
		}
		// make it walk
		//this.renderable.flipX(!this.walkLeft);
		this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
		this.body.vel.y += (this.walkLeft) ? -this.body.accel.y * me.timer.tick : this.body.accel.y * me.timer.tick;
		//this.body.vel.y += -this.body.accel.y * me.timer.tick;
 
	} else 
	{
		this.body.vel.x = 0;
		this.body.vel.y = 0;
	}
    // update the body movement
    this.body.update(dt);
 
    // handle collisions against other shapes
    me.collision.check(this);
 
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
 
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
	  //do nothing
    return false;
  }
});