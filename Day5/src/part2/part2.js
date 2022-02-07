const {parse, Grid, Line, Point} = require('../part1/part1');

const part2 = () => {
    const fileName = "test.txt";
    const lines = parse(fileName);

    const gridLength = 1000;
    const grid = new Grid(gridLength);

    console.log("Lines to be added to the grid:");
    console.table(lines);

    lines.forEach(line => line.generatePoints().forEach(point => grid.addPoint(point)));
    console.log("Number of points overlapped:", grid.countOverlapped());
}

if (require.main === module) part2();
