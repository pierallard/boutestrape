import TileMapHelper from "../gameobjects/TileMapHelper";
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Scene = Phaser.Scene;
import Tree from "../gameobjects/Tree";
import House from "../gameobjects/House";
import Road from "../gameobjects/Road";
import {Direction} from "../helper/Direction";
import Wood, {WoodType} from "../gameobjects/Wood";
import Factory from "../gameobjects/Factory";

export default class Scene2D extends Scene {
  private trees: Tree[];
  private houses: House[];
  private roads: Road[];
  private woods: Wood[];
  private factories: Factory[];

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.trees = [
      new Tree(5, 11),
      new Tree(8, 10),
      new Tree(11, 10),
      new Tree(13, 10),
    ];
    this.houses = [];
    this.roads = [
      new Road(5, 12, Direction.SOUTH),
      new Road(5, 13, Direction.SOUTH),
      new Road(5, 14, Direction.SOUTH),
      new Road(5, 15, Direction.WEST),
      new Road(4, 16, Direction.EAST),
    ]
    this.factories = [
      new Factory(4, 15, Direction.WEST),
    ]
    this.woods = [];
  }

  preload() {
    this.load.spritesheet('8bitset', 'assets/images/8bitset.png', {frameHeight: 8, frameWidth: 8});
    TileMapHelper.preload(this);
  }

  create(settings: SettingsObject) {
    TileMapHelper.create(this, {withObjects: false});

    this.trees.forEach(tree => tree.create(this));
    this.houses.forEach(house => house.create(this));
    this.factories.forEach(factory => factory.create(this));
    this.roads.forEach(road => road.create(this));
  }

  update(time: number, delta: number): void {
    this.trees.forEach(tree => tree.update());
    this.houses.forEach(house => house.update());
    this.roads.forEach(road => road.update());
    this.factories.forEach(factory => factory.update(this));
    this.woods.forEach(wood => wood.update(this));
  }

  addHouse(x: number, y: number) {
    const house = new House(x, y);
    this.houses.push(house);
    house.create(this);
  }

  isFreeFromOtherObjects(x: number, y: number) {
    for (const wood of this.woods) {
      if (wood.getX() === x && wood.getY() === y) {
        return false;
      }
    }
    return true;
  }

  popWood(x: number, y: number, type: WoodType) {
    const wood = new Wood(x, y, type);
    this.woods.push(wood);
    console.log(this.woods.map(wood => `${wood.getX()},${wood.getY()}`));
    wood.create(this);
  }

  getRoadDirection(x: number, y: number) {
    for (const road of this.roads) {
      if (road.getX() === x && road.getY() === y) {
        return road.getDirection();
      }
    }
    for (const house of this.houses) {
      if (house.getX() === x && house.getY() === y) {
        return house.getDirection();
      }
    }
    for (const factory of this.factories) {
      if (factory.getX() === x && factory.getY() === y) {
        return factory.getDirection();
      }
    }
    return null;
  }

  getFactoryWhoCanProcessItemAt(x: number, y: number, type: WoodType) {
    for (const factory of this.factories) {
      if (factory.getX() === x && factory.getY() === y && factory.canProcess(type)) {
        return factory;
      }
    }
    return null;
  }

  removeWood(wood: Wood) {
    const i = this.woods.indexOf(wood);
    this.woods.splice(i, 1);
  }
}
