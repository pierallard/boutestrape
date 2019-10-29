import Scene = Phaser.Scene;
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Key = Phaser.Input.Keyboard.Key;
import Sprite = Phaser.GameObjects.Sprite;
import Vector2 = Phaser.Math.Vector2;

const ACCELERATION = 100;
const DECELERATION = 0.99;
const ROTATION = 0.01;
const BRAKE = 0.95;

export default class ScenePhysicsAngle extends Scene {
  private car: Sprite;
  private topKey: Key;
  private bottomKey: Key;
  private leftKey: Key;
  private rightKey: Key;
  private spaceKey: Key;
  private angle: number = 0;

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

    const rotatedVector = new Vector2(
      Math.cos(this.angle),
      Math.sin(this.angle),
    );
    const normalizedVector = new Vector2(
      rotatedVector.x * ACCELERATION,
      rotatedVector.y * ACCELERATION
    );

    if (this.topKey.isDown) {
      body.setVelocity(normalizedVector.x, normalizedVector.y);
    } else if (this.bottomKey.isDown) {
      body.setVelocity(- normalizedVector.x, - normalizedVector.y);
    } else {
      // body.setVelocityY(body.velocity.y * DECELERATION);
    }

    if (this.rightKey.isDown) {
      this.angle += ROTATION;
    } else if (this.leftKey.isDown) {
      this.angle -= ROTATION;
    } else {
      // body.setVelocityX(body.velocity.x * DECELERATION);
    }

    if (this.spaceKey.isDown) {
      body.setVelocity(
        body.velocity.x * BRAKE,
        body.velocity.y * BRAKE
      );
    }

    const RENDERED_ANGLES = 16;
    const frame = (Math.floor((this.angle + Math.PI/RENDERED_ANGLES) / (Math.PI * 2) * RENDERED_ANGLES) % RENDERED_ANGLES);
    this.car.setFrame(frame);
  }
}
