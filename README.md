# Advent of Code 2025

My solutions for [Advent of Code 2025](https://adventofcode.com/2025) written in TypeScript.

## Structure

Each day's solutions are organized in separate directories:

```
days/
├── day1/
│   ├── challenge1/
│   │   ├── index.ts
│   │   └── input.txt
│   └── challenge2/
│       ├── index.ts
│       └── input.txt
├── day2/
│   ├── challenge1/
│   │   ├── index.ts
│   │   └── input.txt
│   └── challenge2/
│       ├── index.ts
│       └── input.txt
// ...
```

## Setup

Install dependencies:

```bash
pnpm install
```

## Running Solutions

Using Node 24, simply run the file you want to execute with `pnpm`:

```bash
pnpm solve <day> <challenge>
```

so for example when running day 3, challenge 2:

```bash
pnpm solve 3 2
```

## Requirements

- Node.js v24+
- pnpm 10.20.0
