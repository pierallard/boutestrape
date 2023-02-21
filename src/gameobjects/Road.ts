import Sprite = Phaser.GameObjects.Sprite;
import Scene2D from "../scene/Scene2D";
import {Direction} from "../helper/Direction";

export default class Road {
  private sprite: Sprite;
  private readonly x: number;
  private readonly y: number;
  private direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  create(scene: Scene2D) {
    let frame = 16;
    switch (this.direction) {
      case Direction.WEST:
      case Direction.EAST: frame = 17;
    }
    this.sprite = scene.add.sprite(this.x * 8, this.y * 8, '8bitset', frame);
    this.sprite.setOrigin(0, 0);
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
    return this.direction;
  }
}
