// Goal: get the Power value: Power -> Gamma * Epsilon
// Gamma rate -> most common bit in numbers
// Epsilon rate -> least common bit in numbers

// Parsing
// 00010 -> arr[0].zero++; arr[1].zero++; arr[2].zero++; arr[3].one++; arr[4].zero++;

const fs = require("fs");
const fileName = "input.txt";

const fileContent = fs.readFileSync(fileName, "utf-8");
const lines = fileContent.split(/\r?\n/);

const N = 12;
const positions = [];

lines.forEach((line) => {
    //console.log(`Line: ${line}`);
});

for (let i = 0; i < N; i++) {
    positions.push({
        zero: 0,
        one: 0,
    });
}

lines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
        if (line[i] === "1") positions[i].one++;
        else positions[i].zero++;
    }
});

console.log(positions);

// Calculating the Gamma rate
// 1. number in base 2: base2 = arr.map(pos => {pos.zero > pos.one ? '0' : '1'})
// 2. Concat the array of number: base2 = base2.join();
// 3. Convert the number in base 2 to base 10: gamma = parseInt(base2, 10);

/*
    Rate function.
*/
const rate = (mostCommon) => {
    const criteria = (pos) =>
        mostCommon ? pos.zero > pos.one : pos.zero <= pos.one;

    let base2 = positions.map((pos) => (criteria(pos) ? "0" : "1"));
    //console.log(base2);

    base2 = base2.join("");
    console.log(base2);

    const rate = parseInt(base2, 2);
    console.log(rate);

    return rate;
};

const gamma = rate(true);

// Calculating the Epsilon rate
const epsilon = rate(false);

// Getting the power consumption
// power = Gamma * Epsilon

const power = gamma * epsilon;

console.log(`Power is: ${gamma} * ${epsilon} = ${power}`);
