import Game = Phaser.Game;
import GameConfig = Phaser.Types.Core.GameConfig;
import SceneObjectInstantiationExample from "../scene/SceneObjectInstantiationExample";
import SceneMouseSelector from "../scene/SceneMouseSelector";

export class BoutestrapeGame extends Game {
  constructor() {
    const gameConfig: GameConfig = {
      width: 800,
      height: 600,
    };
    super(gameConfig);

    this.scene.add(SceneObjectInstantiationExample.toString(), SceneObjectInstantiationExample);
    this.scene.add(SceneMouseSelector.toString(), SceneMouseSelector);
  }

  start() {
    super.start();
    this.scene.start(SceneMouseSelector.toString());

    // Deactivate right click
    const canvas = this.canvas;
    canvas.oncontextmenu = () => false;
  }
}
