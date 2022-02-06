const fileName = "input.txt";
const fs = require("fs");
const fileContent = fs.readFileSync(fileName, "utf-8");
const lines = fileContent.split(/\r?\n/);

const numbers = lines.map(Number);
console.log(numbers);

let increased = 0;

numbers.map((num, index, array) => {
    if (index > 0 && num > array[index - 1]) increased++;
});

/*
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > numbers[i - 1]) increased++;
}
*/

console.log("Increased:", increased);
