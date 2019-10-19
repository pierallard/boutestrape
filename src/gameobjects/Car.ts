import Sprite = Phaser.GameObjects.Sprite;
import Graphics = Phaser.GameObjects.Graphics;
import Point = Phaser.Geom.Point;

export default class Car extends Sprite {
  private graphics: Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string | number) {
    super(scene, x, y, texture, frame);
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

  highlight(b: boolean) {
    this.graphics.alpha = b ? 1: 0;
  }

  goto(point: Point) {
    const dist = Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    this.scene.tweens.add({
      targets: this,
      x: point.x,
      y: point.y,
      duration: dist * 5,
      repeat: 0,
      yoyo: false
    });
  }
}