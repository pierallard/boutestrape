import TileMapHelper from "../gameobjects/TileMapHelper";
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Scene = Phaser.Scene;
import Image = Phaser.GameObjects.Image;
import Key = Phaser.Input.Keyboard.Key;
import Tween = Phaser.Tweens.Tween;
import Point = Phaser.Geom.Point;

export default class PlayerMoveZQSD extends Scene {
  private character: Image;
  private topKey: Key;
  private bottomKey: Key;
  private leftKey: Key;
  private rightKey: Key;
  private tween: Tween = null;

  preload() {
    TileMapHelper.preload(this);
    this.load.image('character', 'assets/images/character.png');
  }

  create(settings: SettingsObject) {
    TileMapHelper.create(this);
    this.character = this.add.image(0, 0, 'character');
    this.character.setOrigin(0, 0);

    this.topKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.bottomKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update () {
    if (this.tween !== null) {
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(this.topKey)) {
      this.moveTo(new Point(this.character.x, this.character.y - 8));
    } else if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
      this.moveTo(new Point(this.character.x + 8, this.character.y));
    } else if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {
      this.moveTo(new Point(this.character.x - 8, this.character.y));
    } else if (Phaser.Input.Keyboard.JustDown(this.bottomKey)) {
      this.moveTo(new Point(this.character.x, this.character.y + 8));
    }
  }

  private moveTo(point: Point) {
    this.tween = this.add.tween({
      targets: this.character,
      x: point.x,
      y: point.y,
      duration: 200,
      onComplete: () => {
        this.tween = null;
      }
    })
  }
}