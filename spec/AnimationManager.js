/* global AnimationManager, describe, it, expect, should */

describe('AnimationManager()', function () {
  'use strict';

  it('exists', function () {
    expect(AnimationManager).to.be.a('function');

  });

    it('when rotating 20 degrees using animator the animation angle is at 20 degrees', function () {
        //    constructor(image, sourceRect, destRect, atlasX, atlasY, atlasTotal = atlasX * atlasY)
        var image = new Image();
        var srcRect = new AnimationRectangle(200, 200, 200, 200);
        var destRect = new AnimationRectangle(100, 100, 100, 100);
        var imagesX = 5;
        var imagesY = 5;

        var animation = new Animation(image, srcRect, destRect, imagesX, imagesY);
        var animator = new AnimationManager();
        animator.addAnimation("idle",animation);
        animator.setRotation("idle", 20);
        expect(animation.getAngle()).to.equal(20);
    });

  // Add more assertions here
});
