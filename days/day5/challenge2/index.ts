import fs from "node:fs";
import path from "node:path";

const dirname = import.meta.url.replace("file://", "");

const inputPath = path.join(dirname, "../input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const [rangesInput] = input.split("\n\n");

const ranges = rangesInput.split("\n").map((line): [number, number] => {
  const [start, end] = line.split("-").map(Number);
  return [start, end];
});

const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

const mergedRanges = sortedRanges.reduce(
  (merged, current) => {
    const last = merged[merged.length - 1];
    if (!last || last[1] < current[0]) {
      merged.push(current);
    } else {
      last[1] = Math.max(last[1], current[1]);
    }
    return merged;
  },
  [] as [number, number][],
);

const totalCount = mergedRanges.reduce(
  (sum, [start, end]) => sum + (end - start + 1),
  0,
);

console.log(totalCount);
