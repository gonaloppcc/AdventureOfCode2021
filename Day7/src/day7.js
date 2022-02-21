const fs = require("fs");

class CrabField {
    constructor(positions) {
        this.positions = new Map();
        positions.forEach((pos) => {
            if (this.positions.has(pos)) this.positions.set(pos, this.positions.get(pos) + 1);
            else this.positions.set(pos, 1);
        });
    }

    show() {
        // Sort by key
        console.table([...this.positions.entries()].sort((a, b) => a[0] - b[0]));

        // Sort by value
        //console.table([...this.positions.entries()].sort((a, b) => b[1] - a[1]));
    }

    getFunction(func, file) {
        // sum nI * (abs(x-pI))
        let str = []

        let f = (num, pos) => func(str, num, pos)

        this.positions.forEach(f);

        let expr = str.join(' + ');

        fs.writeFile(file, expr, (err => console.log(err || "Function successfully written to the file.")));
    }

    getMinAndMax() {
        let keyOrdered = [...this.positions.entries()].sort((a, b) => a[0] - b[0]);

        return {
            min: keyOrdered[0][0],
            max: keyOrdered[keyOrdered.length - 1][0]
        };
    }
}

const day7 = () => {
    const fileName = 'input.txt';
    const positions = fs.readFileSync(fileName, "utf-8")
        .split(',')
        .filter(Boolean)
        .map(Number)

    const field = new CrabField(positions);
    console.log("Positions of the crabs:");
    field.show()

    let func1 = (str, num, pos) => str.push(`${num} * (abs(x-${pos}))`); // Expression for part 1

    let func2 = (str, num, pos) => str.push(`${num} * (((abs(x-${pos})) * ((abs(x-${pos})) + 1)) / 2)`); // Expression for part 2

    const exprFile = "expression.txt";

    console.log(`The goal is to minimize the function written to the file ${exprFile}.`);
    field.getFunction(func1, exprFile);

    const {min, max} = field.getMinAndMax();

    console.log(`The minimizer has to been in this interval: [${min}, ${max}].`)
}

if (require.main === module) day7();
