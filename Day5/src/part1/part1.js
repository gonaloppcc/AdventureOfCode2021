// Lines: x1, y1 -> x2, y2
// Lines -> Points
// Ignore the not horizontal or vertical lines, for now!
// Implement a grid that contains the number of points in each position


class Line {
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }

    isVertical() {
        return (this.point1.y - this.point2.y) === 0;
    }

    isHorizontal() {
        return (this.point1.x - this.point2.x) === 0;
    }

    generatePoints() {
        let points = [];

        // 2,2 -> 2,1 --> (2, [2, 1])
        // (x1,y1) -> (x2,y2) --> dX = (x1-x2); dY = (y1-y2);
        let dX = (this.point1.x - this.point2.x);
        let dY = (this.point1.y - this.point2.y);
        //console.debug("dX:", dX, "dY:", dY);

        let sigX = dX === 0 ? 0 : Math.abs(dX) / dX;
        let sigY = dY === 0 ? 0 : Math.abs(dY) / dY;
        //console.debug("sigX:", sigX, "sigY:", sigY);

        for (let i = 0; i <= Math.max(Math.abs(dX), Math.abs(dY)); i++) {
            points.push(this.point2.addPoint(sigX * i, sigY * i));
        }

        return points;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addPoint(x, y) {
        return new Point(this.x + x, this.y + y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

const parse = (fileName) => {
    const fs = require("fs");
    const fileContent = fs.readFileSync(fileName, "utf-8")
        .replace(/\r/g, "")
        .split('\n')
        .filter(Boolean);

    //const re = /\d+,\d+\s->\s\d+,\d+/g;

    //const lines = fileContent.map(str => str.match(re));

    //console.log(lines);

    return fileContent.map((line) => {
        const [p1, p2] = line.split("->").map((point) => {
            const [x, y] = point.split(',').map(Number);
            return new Point(x, y);
        });

        return new Line(p1, p2);
    });
}

class Grid {
    constructor(gridLength) {
        this.grid = Array(gridLength);
        for (let i = 0; i < gridLength; i++) {
            this.grid[i] = Array(gridLength).fill(0);
        }
    }

    addPoint(point) {
        //console.log("Point:", point);
        this.grid[point.x][point.y]++;
    }

    countOverlapped() {
        return this.grid.map(row => row.filter(num => num > 1).length).reduce((acc, sum) => acc + sum);
    }

    show() {
        console.table(this.transpose());
    }

    transpose() {
        return this.grid[0].map((_, colIndex) => this.grid.map(row => row[colIndex]));
    }
}

const part1 = () => {
    const fileName = "input.txt";
    const lines = parse(fileName);

    const gridLength = 1000;
    const grid = new Grid(gridLength);

    const linesGrid = lines.filter(line => (line.isVertical() || line.isHorizontal()));
    console.log("Lines to be added to the grid:");
    console.table(linesGrid);

    linesGrid.forEach(line => line.generatePoints().forEach(point => grid.addPoint(point)));

    //console.log("Final grid:");
    //grid.show();

    console.log("Number of points overlapped:", grid.countOverlapped());
}

module.exports.parse = parse;
module.exports.Point = Point;
module.exports.Line = Line;
module.exports.Grid = Grid;

if (require.main === module) part1();
