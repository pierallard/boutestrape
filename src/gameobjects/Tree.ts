import Sprite = Phaser.GameObjects.Sprite;
import Pointer = Phaser.Input.Pointer;
import Scene2D from "../scene/Scene2D";

export default class Tree {
  private sprite: Sprite;
  private readonly x: number;
  private readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  create(scene: Scene2D) {
    this.sprite = scene.add.sprite(this.x * 8, this.y * 8, '8bitset', 8);
    this.sprite.setOrigin(0, 0);
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', (pointer: Pointer) => {
      this.sprite.destroy(true);
      scene.addHouse(this.x, this.y);
    });
  }

  update() {
    this.sprite.update();
  }
}
