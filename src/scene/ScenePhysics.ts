import Scene = Phaser.Scene;
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Image = Phaser.GameObjects.Image;
import Key = Phaser.Input.Keyboard.Key;

const ACCELERATION = 50;
const DECELERATION = 1;

export default class ScenePhysics extends Scene {
  private car: Image;
  private topKey: Key;
  private bottomKey: Key;
  private leftKey: Key;
  private rightKey: Key;

  preload () {
    this.load.spritesheet('car', 'assets/images/car2.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(settings: SettingsObject) {
    this.car =  this.add.image(50, 50, 'car');
    this.physics.add.existing(this.car);

    this.topKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.bottomKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update () {
    const body = this.car.body as Phaser.Physics.Arcade.Body;
    body.debugShowBody = true;
    body.setMaxSpeed(100);
    body.setMass(1000);
    body.setFriction(10,10);
    body.setAcceleration(0, 0);
    if (this.topKey.isDown) {
      body.setAccelerationY(-ACCELERATION);
    } else if (this.bottomKey.isDown) {
      body.setAccelerationY(ACCELERATION);
    } else {
      body.setVelocityY(body.velocity.y > 0 ? Math.max(body.velocity.y - DECELERATION, 0) : Math.min(body.velocity.y + DECELERATION, 0));
    }

    if (this.rightKey.isDown) {
      body.setAccelerationX(ACCELERATION);
    } else if (this.leftKey.isDown) {
      body.setAccelerationX(-ACCELERATION);
    } else {
      body.setVelocityX(body.velocity.x > 0 ? Math.max(body.velocity.x - DECELERATION, 0) : Math.min(body.velocity.x + DECELERATION, 0));
    }
  }
}
