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

const getTimesPastZero = (start: number, instruction: number) => {
  const normalStart = instruction < 0 ? 100 - start : start;
  const normalInstruction = Math.abs(instruction);

  if (Math.round(normalInstruction / 100) === normalInstruction / 100) {
    return normalInstruction / 100;
  }

  if (start === 0 && normalInstruction < 100) {
    return 0;
  }

  if (start === 0) {
    return Math.ceil(normalInstruction / 100) - 1;
  }

  return Math.floor((normalStart + normalInstruction) / 100);
};

const result = instructions.reduce(
  (acc, instruction) => {
    const currentPosition = acc.position;

    if (instruction > 0) {
      const final = (currentPosition + instruction) % 100;

      const timesPastZero = getTimesPastZero(currentPosition, instruction);

      return {
        position: final,
        zeros: acc.zeros + timesPastZero,
      };
    }

    if (instruction < 0) {
      const intermediatePosition = currentPosition + instruction;
      const final =
        (intermediatePosition < 0
          ? 100 - (Math.abs(intermediatePosition) % 100)
          : intermediatePosition) % 100;

      const timesPastZero = getTimesPastZero(currentPosition, instruction);

      return {
        position: final,
        zeros: acc.zeros + timesPastZero,
      };
    }

    return acc;
  },
  { position: start, zeros: 0 },
);

console.log(result);
