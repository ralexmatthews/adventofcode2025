import fs from "node:fs";
import path from "node:path";

const dirname = import.meta.url.replace("file://", "");

const inputPath = path.join(dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const ids = input.replaceAll("\n", "").split(",");
const ranges = ids.map((v) => v.split("-").map(Number));

const numbers = ranges.flatMap(([start, end]) =>
  new Array(end - start + 1)
    .fill(0)
    .map((_, i) => start + i)
    .map((v) => `${v}`),
);

const numberIsFake = (num: string) => {
  const len = num.length;

  // if odd, is not fake
  if (len % 2 === 1) {
    return false;
  }

  const firstHalf = num.slice(0, len / 2);
  const secondHalf = num.slice(len / 2);

  return firstHalf === secondHalf;
};

const fakeNumbers = numbers.filter(numberIsFake);

const fakeNumberSum = fakeNumbers.reduce((acc, num) => acc + Number(num), 0);

console.log("Fake number sum:", fakeNumberSum);
