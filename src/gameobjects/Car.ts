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
    const angle = vector.angle();
    [
      [0 * Math.PI/4, 1 * Math.PI/4, 1, 1, 0],
      [1 * Math.PI/4, 3 * Math.PI/4, 1, 1, 1],
      [3 * Math.PI/4, 5 * Math.PI/4, -1, 1, 0],
      [5 * Math.PI/4, 7 * Math.PI/4, 1, -1, 1],
      [7 * Math.PI/4, 8 * Math.PI/4, 1, 1, 0],
    ].forEach((toto) => {
      if (angle >= toto[0] && angle < toto[1]) {
        this.setScale(toto[2], toto[3]);
        this.setFrame(toto[4]);
      }
    });
  }
}