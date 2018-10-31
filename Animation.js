/**
 *  Sprite Manager class, allows for drawing of sprites onto a 2D canvas
 * @class
 * @classdesc Creates a Sprite Manager object that upon initialisation can be updated and drawn to a 2d canvas.
 * The component requires the programer to know the size of the source rectangle positions and size. The component will calculate
 * all of the nessecery rectangles at runtime and therefore does not require the programmer to give an array of all rectangles
 */
class Animation
{
    /**
     * 
     * @param {HTMLImageElement} image The sprite texture that the programmer wishes to animate.
     * @param {AnimationRectangle} sourceRect The source rectangle for the sprite. x,y are positions on sprite texture and width and height are the sizes of the source rectangle.
     * @param {AnimationRectangle} destRect The destination rectangle, it determins where the sprite is to be drawn and how big it should be.
     * @param {Number} atlasX Defines amount of images that the texture has horizontally.
     * @param {Number} atlasY Defines the amount of images that the texture has vertically.
     * @param {Number} atlasTotal Defines total number of images in the texture. Defaults to atlasX * atlasY. To be set ONLY if the last row of images is not the same as the others. (e.g all rows have 4 images but last has 2)
     */
    constructor(image, sourceRect, destRect, atlasX, atlasY, atlasTotal = atlasX * atlasY)
    {
        this.image = image;
        this.atlasX = atlasX - 1; //minus so we start at 0, let user put in the number without accounting for 0
        this.atlasY = atlasY - 1;
        this.atlasTotal = atlasTotal;
        this.source = new AnimationRectangle(sourceRect.posX, sourceRect.posY, sourceRect.width, sourceRect.height);
        this.destination = new AnimationRectangle(destRect.posX, destRect.posY, destRect.width, destRect.height);
        this.rotation = 0;
        this.sx = 0; //index * width
        this.sy = 0; //index * height
        this.indexX = 0;
        this.indexY = 0;
        this.fps = 60;
        this.ticksPerFrame = 0;
        this.tickCount = 0;
        this.angle = 0;
        this.currentFrame = 0;

    }

    /**
     * This function will update the animation logic
     * @param {Number} deltaTime time since last update in milliseconds.
     */
    update(deltaTime)
    {
        this.tickCount += deltaTime;
        this.ticksPerFrame = 1000 / this.fps;
        if (this.tickCount > this.ticksPerFrame)
        {
            if (this.indexX !== this.atlasX)
            {
                this.indexX++;
            }
            else if (this.indexY !== this.atlasY)
            {
                this.indexY++;
                this.indexX = 0;
            }
            this.currentFrame++;
            if (this.currentFrame === this.atlasTotal)
            {
                this.indexX = 1;
                this.indexY = 0;
                this.currentFrame = 1;
            }
            this.tickCount = 0;
        }
        //calculates the position of the current source rectangle
        this.sx = this.indexX * this.source.width;
        this.sy = this.indexY * this.source.height;

    }

    /**
     * A setter function for the rotation of the sprite.
     * @param {Number} angle Angle of rotation in degrees
     */
    setAngle(angle)
    {
        this.angle = angle;
    }

    getAngle()
    {
        return this.angle;
    }

    /**
     * Setter for the position of the sprite on the screen.
     * @param {Number} posX X position in pixels on the canvas
     * @param {Number} posY Y position in pixels on the canvas
     */
    setPosition(posX, posY) {
        this.destination.posX = posX;
        this.destination.posY = posY;
    }

    /**
     * Function draws the animation in the defined position and rotation.
     * @param {CanvasRenderingContext2D} context this is the documents 2d context canvas
     */
    draw(context)
    {

        context.save();

        // Next, we'll translate (move the origin) to the center
        // of where we'll be drawing the rectangle
        context.translate(this.destination.posX + (this.destination.width * 0.5), this.destination.posY + (this.destination.height * 0.5));
        // Any transformations applied from here on out will be
        // relative to the origin of the destination rectangle
        // Note that we're using radians, not degrees to specify rotation therefore we must convert the angle to radians
        context.rotate( this.angle * Math.PI / 180);

        context.translate(-this.destination.width * 0.5, -this.destination.height * 0.5);

        context.drawImage(
            this.image
            , this.sx
            , this.sy
            , this.source.width
            , this.source.height
            , 0
            , 0
            , this.destination.width
            , this.destination.height);


        context.restore();
    }

}
