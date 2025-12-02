import fs from "node:fs";
import path from "node:path";

const dirname = import.meta.url.replace("file://", "");

const inputPath = path.join(dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const instructions = input.split("\n").map((line) => {
  const direction = line[0];

  if (direction !== "L" && direction !== "R") {
    throw new Error(`Invalid direction: ${direction}`);
  }

  const number = parseInt(line.slice(1), 10);

  if (Number.isNaN(number)) {
    throw new Error(`Invalid number in instruction: ${line}`);
  }

  return direction === "L" ? -number : number;
});

const start = 50;

const result = instructions.reduce(
  (acc, instruction) => {
    const instructionToUse =
      instruction > 100
        ? instruction % 100
        : instruction < -100
          ? -(Math.abs(instruction) % 100)
          : instruction;

    const newPosition = acc.position + instructionToUse;

    const position =
      newPosition < 0
        ? 100 + newPosition
        : newPosition > 99
          ? newPosition - 100
          : newPosition;

    return {
      position,
      zeros: position === 0 ? acc.zeros + 1 : acc.zeros,
    };
  },
  { position: start, zeros: 0 },
);

console.log(result);
