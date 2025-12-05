import fs from "node:fs";
import path from "node:path";

const dirname = import.meta.url.replace("file://", "");

const inputPath = path.join(dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

type Roll = "@";
type Empty = ".";
type Space = Roll | Empty;

const ROLL: Roll = "@";
const EMPTY: Empty = ".";

type Grid = Space[][];

const grid: Grid = input
  .split("\n")
  .map((line) => line.split("").map((v): Space => (v === ROLL ? ROLL : EMPTY)));

const topIsRoll = (row: number, col: number, grid: Grid) => {
  if (row === 0) {
    return false;
  }
  return grid[row - 1][col] === ROLL;
};
const topLeftIsRoll = (row: number, col: number, grid: Grid) => {
  if (row === 0 || col === 0) {
    return false;
  }
  return grid[row - 1][col - 1] === ROLL;
};
const leftIsRoll = (row: number, col: number, grid: Grid) => {
  if (col === 0) {
    return false;
  }
  return grid[row][col - 1] === ROLL;
};
const bottomLeftIsRoll = (row: number, col: number, grid: Grid) => {
  if (row === grid.length - 1 || col === 0) {
    return false;
  }
  return grid[row + 1][col - 1] === ROLL;
};
const bottomIsRoll = (row: number, col: number, grid: Grid) => {
  if (row === grid.length - 1) {
    return false;
  }
  return grid[row + 1][col] === ROLL;
};
const bottomRightIsRoll = (row: number, col: number, grid: Grid) => {
  if (row === grid.length - 1 || col === grid[0].length - 1) {
    return false;
  }
  return grid[row + 1][col + 1] === ROLL;
};
const rightIsRoll = (row: number, col: number, grid: Grid) => {
  if (col === grid[0].length - 1) {
    return false;
  }
  return grid[row][col + 1] === ROLL;
};
const topRightIsRoll = (row: number, col: number, grid: Grid) => {
  if (row === 0 || col === grid[0].length - 1) {
    return false;
  }
  return grid[row - 1][col + 1] === ROLL;
};

const removeRolls = (grid: Grid): [Grid, number] => {
  const resultingGrid: Grid = grid.map((row) => [...row]);
  let accessibleRolls = 0;

  for (let row = 0; row <= grid.length - 1; row++) {
    for (let col = 0; col <= grid[0].length - 1; col++) {
      const space = grid[row][col];
      if (space === EMPTY) {
        continue;
      }

      const numberOfAdjacentRolls = [
        topIsRoll,
        topLeftIsRoll,
        leftIsRoll,
        bottomLeftIsRoll,
        bottomIsRoll,
        bottomRightIsRoll,
        rightIsRoll,
        topRightIsRoll,
      ].reduce((acc, fn) => acc + (fn(row, col, grid) ? 1 : 0), 0);

      if (numberOfAdjacentRolls < 4) {
        accessibleRolls++;
        resultingGrid[row][col] = EMPTY;
      }
    }
  }

  return [resultingGrid, accessibleRolls];
};

let removedRolls = 0;
let currentGrid = grid;
while (true) {
  const [newGrid, accessibleRolls] = removeRolls(currentGrid);

  if (accessibleRolls === 0) {
    break;
  }

  removedRolls += accessibleRolls;
  currentGrid = newGrid;
}

console.log("Total accessible rolls removed:", removedRolls);
