import Game = Phaser.Game;
import GameConfig = Phaser.Types.Core.GameConfig;
import SceneObjectInstantiationExample from "../scene/SceneObjectInstantiationExample";
import SceneMouseSelector from "../scene/SceneMouseSelector";
import SceneAStar from "../scene/SceneAStar";

export class BoutestrapeGame extends Game {
  constructor() {
    const REAL_WIDTH = 1200;
    const REAL_HEIGHT = 800;
    const PIXEL_ART_ZOOM = 4;
    const gameConfig: GameConfig = {
      type: Phaser.WEBGL,
      width: REAL_WIDTH / PIXEL_ART_ZOOM,
      height: REAL_HEIGHT / PIXEL_ART_ZOOM,
      render: {
        antialias: false,
        pixelArt: true,
        roundPixels: false,
      },
      backgroundColor: '#1b2632',
      zoom: PIXEL_ART_ZOOM,
    };
    super(gameConfig);

    this.scene.add(SceneObjectInstantiationExample.toString(), SceneObjectInstantiationExample);
    this.scene.add(SceneMouseSelector.toString(), SceneMouseSelector);
    this.scene.add(SceneAStar.toString(), SceneAStar);
  }

  start() {
    super.start();
    this.scene.start(SceneAStar.toString());

    // Deactivate right click
    const canvas = this.canvas;
    canvas.oncontextmenu = () => false;
  }
}
