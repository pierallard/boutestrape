import TileMapHelper from "../gameobjects/TileMapHelper";
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Scene = Phaser.Scene;
import Image = Phaser.GameObjects.Image;
import Key = Phaser.Input.Keyboard.Key;
import Tween = Phaser.Tweens.Tween;
import Point = Phaser.Geom.Point;

enum MOVEMENT { JUST_PRESSED, PRESSED }

export default class PlayerMoveZQSD extends Scene {
  private character: Image;
  private topKey: Key;
  private bottomKey: Key;
  private leftKey: Key;
  private rightKey: Key;
  private tween: Tween = null;
  private movement: MOVEMENT;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    this.movement = MOVEMENT.PRESSED;
  }

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

    if (this.isKeyDown(this.topKey)) {
      this.moveTo(new Point(this.character.x, this.character.y - 8));
    } else if (this.isKeyDown(this.rightKey)) {
      this.moveTo(new Point(this.character.x + 8, this.character.y));
    } else if (this.isKeyDown(this.leftKey)) {
      this.moveTo(new Point(this.character.x - 8, this.character.y));
    } else if (this.isKeyDown(this.bottomKey)) {
      this.moveTo(new Point(this.character.x, this.character.y + 8));
    }
  }

  private moveTo(point: Point) {
    if (TileMapHelper.getNonWalkablePositions().find((element) => {
      return PlayerMoveZQSD.getGridPoint(point).x === element.x && PlayerMoveZQSD.getGridPoint(point).y === element.y;
    })) {
      return;
    }
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

  private isKeyDown(key: Key): boolean {
    switch (this.movement) {
      case MOVEMENT.JUST_PRESSED: return Phaser.Input.Keyboard.JustDown(key);
      case MOVEMENT.PRESSED: return key.isDown;
    }
  };

  private static getGridPoint(point: Point): Point {
    return new Point(Math.floor(point.x / 8), Math.floor(point.y / 8));
  }
}
