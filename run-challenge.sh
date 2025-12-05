#!/bin/bash

DAY=$1
CHALLENGE=$2

node days/day${DAY}/challenge${CHALLENGE}/index.ts
