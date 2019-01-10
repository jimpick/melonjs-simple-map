/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // define a default maximum acceleration, initial force and friction
        this.body.gravity.set(0, 0);
        this.body.force.set(0, 0);
        this.body.friction.set(0.4, 0.4);
        this.body.setMaxVelocity(3, 3);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("to-bottom", [0, 1, 2]);
        this.renderable.addAnimation("to-left", [12, 13, 14]);
        this.renderable.addAnimation("to-right", [24, 25, 26]);
        this.renderable.addAnimation("to-top", [36, 37, 38]);

        // define a standing animation (using the first frame)
        this.renderable.addAnimation("start", [0]);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("start");
    },

    /**
     * update the entity
     */
    update: function (dt) {
        if (me.input.isKeyPressed('left')) {
            this.body.force.x = -this.body.maxVel.x;
            this.body.vel.y = 0;
            if (!this.renderable.isCurrentAnimation("to-left")) {
                this.renderable.setCurrentAnimation("to-left");
            }
            this.renderable.animationpause = false;
        }
        else if (me.input.isKeyPressed('right')) {
            this.body.force.x = this.body.maxVel.x;
            this.body.force.y = 0;
            if (!this.renderable.isCurrentAnimation("to-right")) {
                this.renderable.setCurrentAnimation("to-right");
            }
            this.renderable.animationpause = false;
        } else if (me.input.isKeyPressed('up')) {
            this.body.force.x = 0;
            this.body.force.y = -this.body.maxVel.y;
            if (!this.renderable.isCurrentAnimation("to-top")) {
                this.renderable.setCurrentAnimation("to-top");
            }
            this.renderable.animationpause = false;
        } else if (me.input.isKeyPressed('down')) {
            this.body.force.x = 0;
            this.body.force.y = this.body.maxVel.y;
            if (!this.renderable.isCurrentAnimation("to-bottom")) {
                this.renderable.setCurrentAnimation("to-bottom");
            }
            this.renderable.animationpause = false;
        }
        else {
            this.body.force.x = 0;
            this.body.force.y = 0;
            this.renderable.animationpause = true;
        }

        // apply physics to the body (this moves the entity)
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
        // Make all other objects solid
        return true;
    }
});
