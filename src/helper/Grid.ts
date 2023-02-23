import Road from "../gameobjects/Road";
import Scene2D from "../scene/Scene2D";
import {Direction} from "./Direction";

export class Grid {
  private readonly width: number;
  private readonly height: number;
  private readonly lines: (Road | null)[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.lines = [];
    for (let y = 0; y < this.height; y++) {
      this.lines[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.lines[y][x] = null;
      }
    }
  }

  add(x: number, y: number, road: Road) {
    this.lines[y][x] = road;
  }

  create(scene: Scene2D) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.lines[y][x];
        if (cell !== null) {
          const hasLinkFromUp = this.lines[y - 1][x]?.getDirection() === Direction.SOUTH;
          const hasLinkFromRight = this.lines[y][x + 1]?.getDirection() === Direction.WEST;
          const hasLinkFromBottom = this.lines[y + 1][x]?.getDirection() === Direction.NORTH;
          const hasLinkFromLeft = this.lines[y][x - 1]?.getDirection() === Direction.EAST;
          cell.create(scene, x, y, hasLinkFromUp, hasLinkFromRight, hasLinkFromBottom, hasLinkFromLeft);
        }
      }
    }
  }

  update() {
    this.lines.forEach(line => {
      line.forEach(cell => {
        if (cell !== null) {
          cell.update()
        }
      })
    });
  }

  getRoadDirection(x: number, y: number) {
    return this.lines[y][x]?.getDirection();
  }
}
