import Sprite = Phaser.GameObjects.Sprite;
import TimerEvent = Phaser.Time.TimerEvent;
import Pointer = Phaser.Input.Pointer;
import Scene2D from "../scene/Scene2D";
import {Direction} from "../helper/Direction";
import {WoodType} from "./Wood";

export default class House {
  private static MAX_STOCK = 10;
  private sprite: Sprite;
  private readonly x: number;
  private readonly y: number;
  private timer: TimerEvent;
  private stock: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.stock = 0;
  }

  create(scene: Scene2D) {
    this.sprite = scene.add.sprite(this.x * 8, this.y * 8, '8bitset', 12);
    this.sprite.setOrigin(0, 0);
    this.sprite.setInteractive();

    this.timer = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        if (scene.isFreeFromOtherObjects(this.x, this.y)) {
          scene.popWood(this.x, this.y, WoodType.WOOD);
        }
        this.stock++;
        if (this.stock >= House.MAX_STOCK) {
          this.timer.paused = true;
        }
      },
      loop: true
    });

    this.sprite.on('pointerdown', (pointer: Pointer) => {
      this.stock--;
      this.timer.paused = false;
    });
  }

  update() {
    this.sprite.update();
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
}
