import Game = Phaser.Game;
import GameConfig = Phaser.Types.Core.GameConfig;
import SceneOne from "../scene/SceneOne";

export class BoutestrapeGame extends Game {
  constructor() {
    const gameConfig: GameConfig = {
      width: 800,
      height: 600,
    };
    super(gameConfig);

    this.scene.add(SceneOne.toString(), SceneOne);
  }

  start() {
    super.start();
    this.scene.start(SceneOne.toString());
  }
}
