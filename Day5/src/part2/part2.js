const {parse, Grid} = require('../part1/part1');

const part2 = () => {
    const fileName = "input.txt";
    const lines = parse(fileName);
    //const lines = [new Line(new Point(0, 6), new Point(6, 0))];

    const gridLength = 1000;
    const grid = new Grid(gridLength);

    console.log("Lines to be added to the grid:");
    console.table(lines);

    //console.table(lines.map(line => line.generatePoints()));
    lines.forEach(line => line.generatePoints().forEach(point => grid.addPoint(point)));

    //console.log("Final grid:");
    //grid.show();

    console.log("Number of points overlapped:", grid.countOverlapped());
}

if (require.main === module) part2();
