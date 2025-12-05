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

const getDivisors = (number: number) => {
  const allNumbers = new Array(number - 1).fill(0).map((_, i) => i + 1);

  return allNumbers.filter((i) => number % i === 0);
};

const numberIsFake = (num: string) => {
  const len = num.length;

  const divisors = getDivisors(len);

  return divisors.reduce((numIsFake, divisor) => {
    if (numIsFake) {
      return true;
    }

    const subStringLength = len / divisor;

    const subStrings = new Array(subStringLength)
      .fill(0)
      .map((_, i) => num.slice(i * divisor, (i + 1) * divisor));

    return subStrings.every((sub) => sub === subStrings[0]);
  }, false);
};

const fakeNumbers = numbers.filter(numberIsFake);

const fakeNumberSum = fakeNumbers.reduce((acc, num) => acc + Number(num), 0);

console.log("Fake number sum:", fakeNumberSum);
