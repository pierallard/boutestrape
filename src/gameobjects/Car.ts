import Sprite = Phaser.GameObjects.Sprite;
import Graphics = Phaser.GameObjects.Graphics;
import Point = Phaser.Geom.Point;
import Tween = Phaser.Tweens.Tween;
import Vector2 = Phaser.Math.Vector2;

export default class Car extends Sprite {
  private graphics: Graphics;
  private tween: Tween = null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'car', 0);
    this.graphics = scene.add.graphics({
      x,
      y,
      lineStyle: {
        width: 1,
        color: 0x00ff00,
        alpha: 1
      }
    });
    this.graphics.strokeRect(-this.width/2 + 0.5, -this.height/2 + 0.5, this.width, this.height);
    this.highlight(false);
  }

  update(): void {
    this.graphics.x = Math.round(this.x);
    this.graphics.y = Math.round(this.y);
  }

  highlight(b: boolean): void {
    this.graphics.alpha = b ? 1: 0;
  }

  goto(point: Point): void {
    const vector = new Vector2(point.x - this.x, point.y - this.y);
    if (null !== this.tween) {
      this.tween.stop();
    }
    this.tween = this.scene.tweens.add({
      targets: this,
      x: point.x,
      y: point.y,
      duration: vector.length() * 10,
      repeat: 0,
      yoyo: false
    });
    const RENDERED_ANGLES = 16;
    const frame = (Math.floor((vector.angle() + Math.PI/RENDERED_ANGLES) / (Math.PI * 2) * RENDERED_ANGLES) % RENDERED_ANGLES);
    this.setFrame(frame);
  }
}
