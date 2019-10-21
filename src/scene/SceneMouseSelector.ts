import Scene = Phaser.Scene;
import Point = Phaser.Geom.Point;
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Car from "../gameobjects/Car";
import Pointer = Phaser.Input.Pointer;

export default class SceneMouseSelector extends Scene {
  private originalPoint: Point = null;
  private graphics;
  private car: Car;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload () {
    this.load.spritesheet('car', 'assets/images/car.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(settings: SettingsObject) {
    this.graphics = this.add.graphics({
      x: 0,
      y: 0,
      lineStyle: {
          width: 1,
          color: 0x00ff00,
          alpha: 1
      },
    });
    this.graphics.depth = 1000;
    this.input.on('pointerdown', (pointer: Pointer) => {
      if (pointer.leftButtonDown()) {
        this.originalPoint = new Point(pointer.x, pointer.y);
      } else if (pointer.rightButtonDown()) {
        this.car.goto(new Point(pointer.x, pointer.y));
      }
    }).on('pointerup', (pointer: Pointer) => {
      this.setSelectionTo(new Point(pointer.x, pointer.y));
    });
    this.car = new Car(this, this.game.renderer.width/2, this.game.renderer.height/2);
    this.add.existing(this.car);
  }

  update(time: number, delta: number): void {
    this.graphics.clear();
    if (this.originalPoint !== null) {
      this.graphics.strokeRect(
        Math.round(this.originalPoint.x) + 0.5,
        Math.round(this.originalPoint.y) + 0.5,
          Math.round(this.input.x - this.originalPoint.x - 1),
            Math.round(this.input.y - this.originalPoint.y - 1)
      );
      if (this.isCarInside(new Point(this.input.activePointer.x, this.input.activePointer.y))) {
        this.car.highlight(true);
      } else {
        this.car.highlight(false);
      }
    }
    this.car.update();
  }

  private setSelectionTo(point: Point) {
    this.originalPoint = null;
  }

  private isCarInside(point: Point) {
    const left = Math.min(this.originalPoint.x, point.x);
    const right = Math.max(this.originalPoint.x, point.x);
    const top = Math.min(this.originalPoint.y, point.y);
    const bottom = Math.max(this.originalPoint.y, point.y);

    const carLeft = this.car.getTopLeft().x;
    const carTop = this.car.getTopLeft().y;
    const carRight = this.car.getBottomRight().x;
    const carBottom = this.car.getBottomRight().y;

    if (bottom < carTop) {
      return false;
    }
    if (top > carBottom) {
      return false;
    }
    if (left > carRight) {
      return false;
    }
    if (right < carLeft) {
      return false;
    }

    return true;
  }
}