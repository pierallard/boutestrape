export enum Direction {
  EAST,
  WEST,
  NORTH,
  SOUTH,
}

export const getNextX = (x: number, direction: Direction) => {
  switch (direction) {
    case Direction.EAST: return x + 1;
    case Direction.WEST: return x - 1;
    default: return x;
  }
}

export const getNextY = (y: number, direction: Direction) => {
  switch (direction) {
    case Direction.NORTH: return y - 1;
    case Direction.SOUTH: return y + 1;
    default: return y;
  }
}
