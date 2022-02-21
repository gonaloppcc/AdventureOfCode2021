const fs = require("fs");

/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

Digit -> Number of segments
 0 -> 6
 1 -> 2 ---- Unique number
 2 -> 5
 3 -> 5
 4 -> 4 ----
 5 -> 5
 6 -> 6
 7 -> 3 ----
 8 -> 7 ----
 9 -> 6

 */

const parse = (fileName) => {
    const digits = fs.readFileSync(fileName, "utf-8")
        .split(/\r?\n/).map(str =>
            str.split(' | '))

    //console.log("Digits:", digits);

    let signals = digits.map(digit => digit[0]);

    let output = digits.map(digit => digit[1]);

    signals = signals.map(list => list.split(' ').filter(Boolean));
    output = output.map(list => list.split(' ').filter(Boolean));

    return {
        signals: signals,
        output: output
    }
}

const part1 = () => {
    const fileName = 'input.txt';

    const {signals, output} = parse(fileName)

    console.log("signals:", signals);
    console.log("Output values:", output);

    const segmentsNumbers = [2, 4, 3, 7]
    const result1 = output.map(line => line.filter(digit => segmentsNumbers.includes(digit.length)));
    console.log("Output filtered:", result1);

    console.log("Times that 1, 4, 7 and 8 appear:", result1.map(e => e.length).reduce((acc, len) => acc + len));
}

if (require.main === module) part1();

module.exports.parse = parse;