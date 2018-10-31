/**
 * Simple rectangle class which holds rectangle data to be used in conjunction with the Sprite Manager class
 * @class
 * @classdesc Constructs a rectangle object that should be used wit hthe Sprite Manager class
 */
class AnimationRectangle {
    /**
     * constructor for a sprite rectangle
     * @constructor
     * @param {Number} posX X position of the top left corner. (defaults to 0)
     * @param {Number} posY Y position of the rop left corner. (defaults to 0)
     * @param {Number} width Width of the rectangle. (defaults to 0)
     * @param {Number} height Height of the rectangle. (defaults to 0)
     */
    constructor(posX = 0, posY = 0, width = 0, height = 0) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
}