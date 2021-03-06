import Scene = Phaser.Scene;
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Key = Phaser.Input.Keyboard.Key;
import Sprite = Phaser.GameObjects.Sprite;

const ACCELERATION = 100;
const DECELERATION = 0.99;
const BRAKE = 0.95;

export default class ScenePhysics extends Scene {
  private car: Sprite;
  private topKey: Key;
  private bottomKey: Key;
  private leftKey: Key;
  private rightKey: Key;
  private spaceKey: Key;

  preload () {
    this.load.spritesheet('car', 'assets/images/car2.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(settings: SettingsObject) {
    this.car =  this.add.sprite(50, 50, 'car');
    this.physics.add.existing(this.car);

    this.topKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.bottomKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update (time:number, delta:number) {
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
      body.setVelocityY(body.velocity.y * DECELERATION);
    }

    if (this.rightKey.isDown) {
      body.setAccelerationX(ACCELERATION);
    } else if (this.leftKey.isDown) {
      body.setAccelerationX(-ACCELERATION);
    } else {
      body.setVelocityX(body.velocity.x * DECELERATION);
    }

    if (this.spaceKey.isDown) {
      body.setVelocity(
        body.velocity.x * BRAKE,
        body.velocity.y * BRAKE
      );
    }

    const RENDERED_ANGLES = 16;
    const frame = (Math.floor((body.velocity.angle() + Math.PI/RENDERED_ANGLES) / (Math.PI * 2) * RENDERED_ANGLES) % RENDERED_ANGLES);
    this.car.setFrame(frame);
  }
}
