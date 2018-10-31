/**
 *  Animator class, controls all animations added into it and allows for control over them
 * @class
 * @classdesc The animator holds multiple animations. The animations can then be manipulated using this class. 
 * All animations should be updated and drawn using this class.
 */
class AnimationManager {
    constructor() {
        this.animations = new Map();
        /**
        * @type {Animation}
        */
        this.currentAnimation;
    }

    /**
     * Method to add an animation to the map of animations.
     * @param {string} animName A string representing the animation
     * @param {Animation} animation The animation object to add to the animator
     */
    addAnimation(animName, animation) {
        if (!this.animations.has(animName)) {
            this.animations.set(animName, animation);
            this.currentAnimation = animation;
        }
        else {
            console.log("Animation " + animName + " is already in the animator");
        }
    }

    /**
     * Updates the current animation.
     * @param {Number} deltaTime time passed since last cycle in milliseconds
     */
    update(deltaTime) {
        this.currentAnimation.update(deltaTime);
    }

    /**
     * Draws the current animation.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        this.currentAnimation.draw(context);
    }

    /**
     * Allows for setting of rotation of the animation.
     * @param {string} animName Name of the animation to rotate
     * @param {Number} degrees angle in degrees by which to rotate the animation
     */
    setRotation(animName, degrees) {
        if (this.animations.has(animName)) {
            var anim = this.animations.get(animName);
            anim.setAngle(degrees);
        }
        else {
            console.log("Animation " + animName + "could not be found in the animator");
        }
    }
}