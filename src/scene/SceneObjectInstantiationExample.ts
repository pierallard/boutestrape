import Scene = Phaser.Scene;
import Image = Phaser.GameObjects.Image;
import SettingsObject = Phaser.Types.Scenes.SettingsObject;

export default class SceneObjectInstantiationExample extends Scene {
  private berger: Image;

  preload () {
    this.load.image('berger-allemand', 'assets/images/berger-allemand.jpg');
  }

  create(settings: SettingsObject) {
    this.berger = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'berger-allemand');
    this.berger.setScale(0.5);
  }

  update(time: number, delta: number): void {
  }
}
