import Sprite = Phaser.GameObjects.Sprite;
import Scene2D from "../scene/Scene2D";
import {Direction} from "../helper/Direction";

export default class Road {
  private sprite: Sprite;
  private direction: Direction;

  constructor(direction: Direction) {
    this.direction = direction;
  }

  create(
    scene: Scene2D,
    x: number,
    y: number,
    hasLinkFromUp: boolean,
    hasLinkFromRight: boolean,
    hasLinkFromBottom: boolean,
    hasLinkFromLeft: boolean
  ) {
    let frame = 16;
    let rotation = 0;
    let connections = [false, false, false];
    switch (this.direction) {
      case Direction.NORTH: {
        rotation = 0;
        connections = [hasLinkFromRight, hasLinkFromBottom, hasLinkFromLeft];
        break;
      }
      case Direction.EAST: {
        rotation = 1;
        connections = [hasLinkFromBottom, hasLinkFromLeft, hasLinkFromUp];
        break;
      }
      case Direction.SOUTH: {
        rotation = 2;
        connections = [hasLinkFromLeft, hasLinkFromUp, hasLinkFromRight];
        break;
      }
      case Direction.WEST: {
        rotation = 3;
        connections = [hasLinkFromUp, hasLinkFromRight, hasLinkFromBottom];
        break;
      }
    }
    switch (JSON.stringify(connections)) {
      case '[false,false,false]':
        frame = 16;
        break;
      case '[false,true,false]':
        frame = 16;
        break;
      case '[true,false,false]':
        frame = 18;
        break;
      default:
        throw new Error('Unknown connection ' + JSON.stringify(connections));
    }

    this.sprite = scene.add.sprite(x * 8 + 4, y * 8 + 4, '8bitset', frame);
    // this.sprite.setOrigin(0, 0);
    this.sprite.setRotation(Math.PI * rotation / 2);
  }

  update() {
    this.sprite.update();
  }

  getDirection() {
    return this.direction;
  }
}
