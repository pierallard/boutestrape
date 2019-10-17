import Phaser from 'phaser';
import GameConfig = Phaser.Types.Core.GameConfig;

export class BoutestrapeGame extends Phaser.Game {
  constructor() {
    const gameConfig: GameConfig = {
      width: 800,
      height: 600,
    };
    super(gameConfig);
  }
}
