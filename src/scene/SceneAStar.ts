import Scene = Phaser.Scene;
import {js} from 'easystarjs';
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Tile = Phaser.Tilemaps.Tile;

export default class SceneAStar extends Scene {
  private easystar: any;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.easystar = new js();
  }

  preload() {
    this.load.spritesheet('8bitset', 'assets/images/8bitset.png', {frameHeight: 8, frameWidth: 8});
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json');
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
    const pathId = this.easystar.findPath(0, 0, 35, 6, (path: { x: number, y: number }[]) => {
      if (path === null) {
        console.log('No path found!');
      } else {
        console.info('Path found !', pathId, path);
      }
    });
    this.easystar.enableCornerCutting();
    this.easystar.calculate();
  }
}
