// Goal: get the life support rating: life ->  o2 * co2
// o2 rate -> most common bit in numbers as criteria
// co2 rate -> least common bit in numbers as criteria
// Criteria: Condition of the staying elements

// Parsing

const fs = require("fs");
const fileName = "input.txt";

const fileContent = fs.readFileSync(fileName, "utf-8");
const numbers = fileContent.split(/\r?\n/);
const N = 12;

//console.log(lines);

// Calculating the o2 rate
// 100011
// 101111
// 100101

/*
    Returns the most common bit
    Returns null if the bits are equally common.
*/
const mostCommonBit = (list, index) => {
    const count = {
        zero: 0,
        one: 0,
    };

    list.forEach((num) => (num[index] === "0" ? count.zero++ : count.one++));

    if (count.zero === count.one) return null;
    return count.zero > count.one ? "0" : "1";
};

/*
    Keeps the numbers that contain the bit in the index.
*/
const keepNumbers = (list, index, bit) => {
    return list.filter((num) => num[index] === bit);
};

const rate = (mostCommon) => {
    let list = numbers;
    let stats = {};

    for (let i = 0; i < N && list.length !== 1; i++) {
        //console.log(`\nIndex: ${i}:`);
        //console.log(`Most common bit: ${mostCommonBit(list, i)}`);
        let bit = mostCommon
            ? mostCommonBit(list, i)
            : mostCommonBit(list, i) === "0"
            ? "1"
            : "0";

        if (bit === null) bit = mostCommon ? "1" : "0";
        //console.log(`Bit: ${bit}`);

        let l = keepNumbers(list, i, bit);
        if (l.length > 0) list = l;

        //console.log(`Number of numbers: ${list.length}`);
        //if (list.length <= 3) console.log(`Current list: ${list}`);

        stats[i] = {
            ChosenBit: bit,
            Length: list.length,
        };
    }

    return {
        value: parseInt(list[0], 2),
        stats: stats,
    };
};

// Calculating the o2 rate
console.log("O2 rate...");
const o2 = rate(true);
console.table(o2.stats);

// Calculating the co2 rate
console.log("CO2 rate...");
const co2 = rate(false);
console.table(co2.stats);

// Getting the power consumption
// life = o2 * co2

const life = o2.value * co2.value;

console.table({
    Life: life,
    O2: o2.value,
    CO2: co2.value,
});
console.log(`Life is: ${o2.value} * ${co2.value} = ${life}`);
