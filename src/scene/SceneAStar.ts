import Scene = Phaser.Scene;
import {js} from 'easystarjs';

export default class SceneAStar extends Scene {
  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    var easystar = new js();
    easystar.setGrid([
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    ]);
    easystar.setAcceptableTiles([0]);
    const pathId1 = easystar.findPath(0, 0, 9, 6, (path: { x: number, y: number }[]) => {
      if (path === null) {
        console.log('No path found!');
      } else {
        console.log(pathId1, path);
      }
    });
    const pathId2 = easystar.findPath(0, 0, 0, 6, (path: { x: number, y: number }[]) => {
      if (path === null) {
        console.log('No path found!');
      } else {
        console.log(pathId2, path);
      }
    });
    easystar.enableCornerCutting();
    easystar.calculate();
  }
}