import Scene = Phaser.Scene;
import {js as EasyStar} from 'easystarjs';
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Tile = Phaser.Tilemaps.Tile;
import Image = Phaser.GameObjects.Image;
import Pointer = Phaser.Input.Pointer;
import Point = Phaser.Geom.Point;
import Tween = Phaser.Tweens.Tween;
import Graphics = Phaser.GameObjects.Graphics;

export default class SceneAStar extends Scene {
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
    this.load.spritesheet('8bitset', 'assets/images/8bitset.png', {frameHeight: 8, frameWidth: 8});
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json');
    this.load.image('character', 'assets/images/character.png');
  }

  create(settings: SettingsObject) {
    const tilemap = this.add.tilemap('map');
    const tileset = tilemap.addTilesetImage(
      '8bitset', // The name of the tileset in Tiled
      '8bitset' // The key of the spritesheet in PhaserJS
    );
    const ground = tilemap.createStaticLayer(
      'ground', // The name of the layer in Tiled
      tileset
    );
    const objects = tilemap.createStaticLayer(
      'objects', // The name of the layer in Tiled
      tileset
    );

    this.character = this.add.image(0, 0, 'character');
    this.character.setOrigin(0, 0);
    this.input.on('pointerdown', (pointer: Pointer) => {
      this.moveCharacterTo(new Point(pointer.x, pointer.y));
    });

    const grid = [];
    for (let y = 0; y < tilemap.height; y++) {
      grid[y] = [];
      for (let x = 0; x < tilemap.width; x++) {
        grid[y][x] = 0;
      }
    }
    objects.forEachTile((tile: Tile) => {
      if (tile.index !== -1) {
        grid[tile.y][tile.x] = 1; // It's not 0, so it's a wall.
      }
    });
    this.easystar.setGrid(grid);
    this.easystar.setAcceptableTiles([0]);
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
    let characterPosition = new Point(this.character.x, this.character.y);
    if (this.tween) {
      // Character is moving ; we will use the next position as first step of path finder
      const data = this.tween.data;
      const x = data.find((target) => {
        return target.key === 'x';
      });
      const y = data.find((target) => {
        return target.key === 'y';
      });
      if (x.elapsed === 0) {
        // There is a tween, but it has not began. Stop the character here.
        this.tween.stop();
        this.tween = null;
      } else {
        characterPosition = new Point(x.end, y.end);
      }
    }
    const charPos = SceneAStar.getGridPoint(characterPosition);
    const newPos = SceneAStar.getGridPoint(point);
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
