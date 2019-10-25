import Scene = Phaser.Scene;
import Point = Phaser.Geom.Point;
import Tile = Phaser.Tilemaps.Tile;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import Tileset = Phaser.Tilemaps.Tileset;
import Tilemap = Phaser.Tilemaps.Tilemap;

export default class TileMapHelper {
  public static tilemap: Tilemap;
  public static tileset: Tileset;
  public static ground: StaticTilemapLayer;
  public static objects: StaticTilemapLayer;

  static preload(scene: Scene) {
    scene.load.spritesheet('8bitset', 'assets/images/8bitset.png', {frameHeight: 8, frameWidth: 8});
    scene.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json');
  }

  static create(scene: Scene) {
    this.tilemap = scene.add.tilemap('map');
    this.tileset = this.tilemap.addTilesetImage(
      '8bitset',  // The name of the tileset in Tiled
      '8bitset'         // The key of the spritesheet in PhaserJS
    );
    this.ground = this.tilemap.createStaticLayer(
      'ground',       // The name of the layer in Tiled
      this.tileset
    );
    this.objects = this.tilemap.createStaticLayer(
      'objects',      // The name of the layer in Tiled
      this.tileset
    );
  }

  static getNonWalkablePositions(): Point[] {
    let result = [];
    this.objects.forEachTile((tile: Tile) => {
      if (tile.index !== -1) {
        result.push(new Point(tile.x, tile.y));
      }
    });

    return result;
  }
}