const {parse} = require("../part1/part1");

const includes = (digit1, digit2) => {
    const set = new Set([...digit1]);
    return [...digit2].every(d => set.has(d));
}

const findRemove = (signals, predicate) => {
    const index = signals.findIndex(predicate);
    console.log(index);
    const r = signals[index];
    signals.splice(index, 1);

    return r;
}

const searchExclusiveElements = (digit1, digit2) => {
    const d2 = [...digit2];
    return [...digit1].filter(d => d2.includes(d2));
}

const deduceDigits = (signals) => {
    let digits = Array(10);

    // Digits that are easy to deduce
    digits[1] = findRemove(signals,s => s.length === 2)
    digits[4] = findRemove(signals,s => s.length === 4)
    digits[7] = findRemove(signals,s => s.length === 3)
    digits[8] = findRemove(signals,s => s.length === 7)

    digits[9] = findRemove(signals, s => includes(s, digits[4]))
    //digits[5] = findRemove(signals, s => includes(s, digits[9]))
    //digits[3] = findRemove(signals, s => includes(digits[9], s))
    const c =
    digits[6] = findRemove(signals, s => s.length === 6 && !includes(s, c))
    /*
    digits[2]
    digits[6]
    digits[0]

     */


    console.log("Deduced digits:")
    console.table(digits)


    console.log("Left to be deduced:")
    console.log(signals)
}

function part2() {
    const fileName = 'test.txt';

    const {signals, output} = parse(fileName)

    deduceDigits(signals[0])
}

if (require.main === module) part2();
