import Scene = Phaser.Scene;
import Image = Phaser.GameObjects.Image;

export default class SceneOne extends Scene {
  private berger: Image;

  preload () {
    this.load.image('berger-allemand', 'assets/berger-allemand.jpg');
  }

  create() {
    this.berger = this.add.image(0, 0, 'berger-allemand');
  }

  update(time: number, delta: number) {
    this.berger.x += 0.2;
    this.berger.y += 0.2;
  }
}
