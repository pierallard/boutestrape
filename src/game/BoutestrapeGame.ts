import Game = Phaser.Game;
import GameConfig = Phaser.Types.Core.GameConfig;
import SceneObjectInstantiationExample from "../scene/SceneObjectInstantiationExample";
import SceneMouseSelector from "../scene/SceneMouseSelector";
import PlayerMoveOnClick from "../scene/PlayerMoveOnClick";
import PlayerMoveZQSD from "../scene/PlayerMoveZQSD";
import ScenePhysicsAngle from "../scene/ScenePhysicsAngle";
import ScenePhysics from "../scene/ScenePhysics";
import Scene2D from "../scene/Scene2D";

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
      physics: {
        default: 'arcade',
        arcade: {
          debug: true
        }
      }
    };
    super(gameConfig);

    this.scene.add(SceneObjectInstantiationExample.toString(), SceneObjectInstantiationExample);
    this.scene.add(SceneMouseSelector.toString(), SceneMouseSelector);
    this.scene.add(PlayerMoveOnClick.toString(), PlayerMoveOnClick);
    this.scene.add(PlayerMoveZQSD.toString(), PlayerMoveZQSD);
    this.scene.add(ScenePhysicsAngle.toString(), ScenePhysicsAngle);
    this.scene.add(ScenePhysics.toString(), ScenePhysics);
    this.scene.add(Scene2D.toString(), Scene2D);
  }

  start() {
    super.start();
    // this.scene.start(PlayerMoveOnClick.toString());
    // this.scene.start(PlayerMoveZQSD.toString());
    // this.scene.start(SceneMouseSelector.toString());
    // this.scene.start(ScenePhysicsAngle.toString());
    this.scene.start(Scene2D.toString());

    // Deactivate right click
    const canvas = this.canvas;
    canvas.oncontextmenu = () => false;
  }
}
