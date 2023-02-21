import Sprite = Phaser.GameObjects.Sprite;
import Tween = Phaser.Tweens.Tween;
import Scene2D from "../scene/Scene2D";
import {getNextX, getNextY} from "../helper/Direction";

export enum WoodType {
  WOOD,
  PLANK,
}

export default class Wood {
  private sprite: Sprite;
  private x: number;
  private y: number;
  private tween: Tween = null;
  private type: WoodType;

  constructor(x: number, y: number, type: WoodType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  create(scene: Scene2D) {
    let frame = 10;
    switch (this.type) {
      case WoodType.PLANK: frame = 15;
    }
    this.sprite = scene.add.sprite(this.x * 8, this.y * 8, '8bitset', frame);
    this.sprite.setOrigin(0, 0);
  }

  move(scene: Scene2D) {
    if (null !== this.tween) {
      // Still moving
      return;
    }
    const factory = scene.getFactoryWhoCanProcessItemAt(this.x, this.y, this.type);
    if (null !== factory) {
      factory.addInput();
      scene.removeWood(this);
      this.sprite.destroy(true);
    }
    const direction = scene.getRoadDirection(this.x, this.y);
    if (null === direction) {
      // Not in a road, do nothing
      return;
    }
    if (!scene.isFreeFromOtherObjects(getNextX(this.x, direction), getNextY(this.y, direction))) {
      // A tree is already in the path
      return;
    }
    this.tween = scene.tweens.add({
      targets: this.sprite,
      x: getNextX(this.x, direction) * 8,
      y: getNextY(this.y, direction) * 8,
      duration: 100,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.x = getNextX(this.x, direction);
        this.y = getNextY(this.y, direction);
        this.tween = null;
        this.move(scene);
      }
    });
  }

  update(scene: Scene2D) {
    this.sprite.update();
    this.move(scene);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}
