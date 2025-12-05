import fs from "node:fs";
import path from "node:path";

const dirname = import.meta.url.replace("file://", "");

const inputPath = path.join(dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const batteryBanks = input
  .split("\n")
  .map((bank) => bank.split("").map(Number));

const buildNumber = (
  listOfNums: number[],
  currentList: number[] = [],
): number => {
  if (currentList.length === 12) {
    return Number(currentList.join(""));
  }

  if (listOfNums.length + currentList.length < 12) {
    return 0;
  }

  if (listOfNums.length === 0) {
    return 0;
  }

  const end = 11 - currentList.length;

  const subList = end === 0 ? listOfNums : listOfNums.slice(0, -end);

  const maxIndex = subList.reduce(
    ({ index, num }, nextNum, nextIndex) => {
      if (nextNum > num) {
        return { num: nextNum, index: nextIndex };
      }

      return { index, num };
    },
    { index: 0, num: listOfNums[0] },
  );

  const newNums = listOfNums.slice(maxIndex.index + 1);
  const newList = currentList.concat(maxIndex.num);

  return buildNumber(newNums, newList);
};

const totalMaxJoltage = batteryBanks
  .map((bank) => buildNumber(bank))
  .reduce((acc, val) => acc + val, 0);

console.log("Total max joltage:", totalMaxJoltage);
