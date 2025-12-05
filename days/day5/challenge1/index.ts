import fs from "node:fs";
import path from "node:path";

const dirname = import.meta.url.replace("file://", "");

const inputPath = path.join(dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const [rangesInput, ingredientsInput] = input.split("\n\n");

const ranges = rangesInput.split("\n").map((line) => {
  const [start, end] = line.split("-").map(Number);
  return [start, end] as const;
});

const ingredients = ingredientsInput.split("\n").map(Number);

const freshIngredientsCount = ingredients.filter((ingredient) =>
  ranges.some(([start, end]) => start <= ingredient && ingredient <= end),
).length;

console.log(freshIngredientsCount);
