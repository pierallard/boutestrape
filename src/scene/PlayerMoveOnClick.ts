import Scene = Phaser.Scene;
import {js as EasyStar} from 'easystarjs';
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Image = Phaser.GameObjects.Image;
import Pointer = Phaser.Input.Pointer;
import Point = Phaser.Geom.Point;
import Tween = Phaser.Tweens.Tween;
import Graphics = Phaser.GameObjects.Graphics;
import TileMapHelper from "../gameobjects/TileMapHelper";

const GRID_WALKABLE = 0;
const GRID_NOT_WALKABLE = 1;

export default class PlayerMoveOnClick extends Scene {
  private easystar: EasyStar;
  private character: Image;
  private path: { x: number; y: number }[] = [];
  private tween: Tween = null;
  private debug: Graphics;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.easystar = new EasyStar();
  }

  preload() {
    TileMapHelper.preload(this);
    this.load.image('character', 'assets/images/character.png');
  }

  create(settings: SettingsObject) {
    TileMapHelper.create(this);

    this.character = this.add.image(0, 0, 'character');
    this.character.setOrigin(0, 0);
    this.input.on('pointerdown', (pointer: Pointer) => {
      this.moveCharacterTo(new Point(pointer.x, pointer.y));
    });

    const grid = [];
    for (let y = 0; y < TileMapHelper.tilemap.height; y++) {
      grid[y] = [];
      for (let x = 0; x < TileMapHelper.tilemap.width; x++) {
        grid[y][x] = GRID_WALKABLE;
      }
    }
    TileMapHelper.getNonWalkablePositions().forEach((point: Point) => {
      grid[point.y][point.x] = GRID_NOT_WALKABLE;
    });
    this.easystar.setGrid(grid);
    this.easystar.setAcceptableTiles([GRID_WALKABLE]);
    this.easystar.enableCornerCutting();
    this.easystar.setIterationsPerCalculation(10000);

    this.debug = this.add.graphics({
      x: 0,
      y: 0,
      lineStyle: {
        color: 0x00ff00,
        width: 2
      }
    });
  }

  update(time: number, delta: number): void {
    if (this.path.length && this.tween === null) {
      const point = this.path[0];
      this.tween = this.tweens.add({
        targets: this.character,
        x: point.x * 8,
        y: point.y * 8,
        duration: 200,
        repeat: 0,
        yoyo: false,
        onComplete: () => {
          this.tween = null;
        }
      });
      this.path.shift();
    }
    this.debug.clear();
    this.debug.beginPath();
    this.path.forEach((point:  { x: number; y: number}) => {
      this.debug.lineTo((point.x + 0.5) * 8, (point.y + 0.5) * 8);
    });
    this.debug.strokePath();
  }

  private moveCharacterTo(point: Phaser.Geom.Point) {
    let characterStartPosition = new Point(this.character.x, this.character.y);
    if (this.tween) {
      // Character is moving ; we will use the next position as first step of path finder
      const data = this.tween.data;
      const tweenX = data.find((target) => {
        return target.key === 'x';
      });
      const tweenY = data.find((target) => {
        return target.key === 'y';
      });
      if (tweenX.elapsed === 0) {
        // There is a tween, but it has not began. Stop the character here.
        this.tween.stop();
        this.tween = null;
      } else {
        characterStartPosition = new Point(tweenX.end, tweenY.end);
      }
    }
    const charPos = PlayerMoveOnClick.getGridPoint(characterStartPosition);
    const newPos = PlayerMoveOnClick.getGridPoint(point);
    this.easystar.findPath(charPos.x, charPos.y, newPos.x, newPos.y, (path: { x: number, y: number }[]) => {
      if (path !== null) {
        path.shift();
        this.path = path || [];
      }
    });
    this.easystar.calculate();
  }

  private static getGridPoint(point: Point): Point {
    return new Point(Math.floor(point.x / 8), Math.floor(point.y / 8));
  }
}
