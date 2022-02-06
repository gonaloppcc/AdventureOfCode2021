const part1 = require("../part1/part1");

const fileName = "input.txt";
let {numbers, boards} = part1.parse(fileName);

console.log("-----------------------------------------------------------")
console.log("Boards: ");
boards.forEach(part1.printBoard);
console.log("-----------------------------------------------------------")

// Drawing the numbers
let i;
for (i = 0; i < numbers.length; i++) {
    const winners = part1.drawNumber(boards, numbers[i]);
    if (winners.length !== 0) {
        if (boards.length === 1) break;
        //console.log("Winners:", winners);
        boards = boards.filter((_, index) => !(winners.includes(index)));
    }
}


console.log("Last board:");
part1.printBoard(boards[0]);
const lastNumber = numbers[i];
const sumUnmaked = part1.sumUnmarkedNumbers(boards[0]);

console.log(
    `Score: ${lastNumber} * ${sumUnmaked} = ${lastNumber * sumUnmaked}`
);
