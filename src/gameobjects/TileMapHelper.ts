import Scene = Phaser.Scene;
import Point = Phaser.Geom.Point;
import Tile = Phaser.Tilemaps.Tile;
import TilemapLayer = Phaser.Tilemaps.TilemapLayer;
import Tileset = Phaser.Tilemaps.Tileset;
import Tilemap = Phaser.Tilemaps.Tilemap;

export default class TileMapHelper {
  public static tilemap: Tilemap;
  public static tileset: Tileset;
  public static ground: TilemapLayer;
  public static objects: TilemapLayer;

  static preload(scene: Scene) {
    scene.load.spritesheet('8bitset', 'assets/images/8bitset.png', {frameHeight: 8, frameWidth: 8});
    scene.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json');
  }

  static create(scene: Scene, params: {withObjects: boolean} = {withObjects: true}) {
    this.tilemap = scene.add.tilemap('map');
    this.tileset = this.tilemap.addTilesetImage(
      '8bitset',  // The name of the tileset in Tiled
      '8bitset'         // The key of the spritesheet in PhaserJS
    );
    this.ground = this.tilemap.createLayer(
      'ground',       // The name of the layer in Tiled
      this.tileset
    );
    if (params.withObjects) {
      this.objects = this.tilemap.createLayer(
        'objects',      // The name of the layer in Tiled
        this.tileset
      );
    }
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
