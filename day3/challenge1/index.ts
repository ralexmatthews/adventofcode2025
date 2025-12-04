import fs from "node:fs";
import path from "node:path";

const dirname = import.meta.url.replace("file://", "");

const inputPath = path.join(dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const batteryBanks = input
  .split("\n")
  .map((bank) => bank.split("").map(Number));

const getMaxJoltage = (bank: number[]) =>
  bank.reduce((currentMaxNumber, num, i) => {
    const subArray = bank.slice(i + 1);

    let currentBiggestNumber = currentMaxNumber;

    for (const subNum of subArray) {
      const combinedNum = Number(`${num}${subNum}`);

      if (combinedNum > currentBiggestNumber) {
        currentBiggestNumber = combinedNum;
      }
    }

    return currentBiggestNumber;
  }, 0);

const totalMaxJoltage = batteryBanks.reduce((acc, bank) => {
  const bankMaxJoltage = getMaxJoltage(bank);
  return acc + bankMaxJoltage;
}, 0);

console.log("Total max joltage:", totalMaxJoltage);
