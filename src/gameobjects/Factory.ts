import Sprite = Phaser.GameObjects.Sprite;
import TimerEvent = Phaser.Time.TimerEvent;
import Scene2D from "../scene/Scene2D";
import {Direction} from "../helper/Direction";
import {WoodType} from "./Wood";

export default class Factory {
  private static MAX_STOCK = 10;
  private sprite: Sprite;
  private readonly x: number;
  private readonly y: number;
  private timer: TimerEvent | null = null;
  private inputStock: number = 0;
  private outputStock: number = 0;
  private direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  create(scene: Scene2D) {
    this.sprite = scene.add.sprite(this.x * 8, this.y * 8, '8bitset', 13);
    this.sprite.setOrigin(0, 0);
    this.sprite.setInteractive();
  }

  update(scene: Scene2D) {
    this.sprite.update();
    this.createNewObject(scene);
    this.popObject(scene);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getDirection() {
    return Direction.SOUTH;
  }

  addInput() {
    this.inputStock++;
  }

  private createNewObject(scene: Scene2D) {
    if (this.timer !== null) {
      // Another object is processed
      return;
    }
    if (this.outputStock >= Factory.MAX_STOCK) {
      // No more place in the factory
      return;
    }
    if (this.inputStock === 0) {
      // No object to process
      return;
    }

    this.inputStock--;
    this.timer = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.timer = null;
        this.outputStock++;
      },
      loop: false
    });
  }

  private popObject(scene: Scene2D) {
    if (this.outputStock === 0) {
      return;
    }
    if (scene.isFreeFromOtherObjects(this.x, this.y)) {
      this.outputStock--;
      scene.popWood(this.x, this.y, WoodType.PLANK);
    }
  }

  canProcess(type: WoodType) {
    return type === WoodType.WOOD;
  }
}
