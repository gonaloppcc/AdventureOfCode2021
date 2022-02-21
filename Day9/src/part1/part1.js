const fs = require('fs')

const parse = (fileName) => {
    const rows = fs.readFileSync(fileName, "utf-8")
        .split(/\r?\n/)

    return rows.map(heights => {
        let row = []
        for (const height of heights) {
            row.push(+height)
        }
        return row
    })
}

const getLowPoints = (map) => {
    const generateAdjacentPoints = (rowIndex, colIndex) => {
        let adj = Array()
        if (rowIndex - 1 >= 0) adj.push(map[rowIndex - 1][colIndex])
        if (rowIndex + 1 < map.length) adj.push(map[rowIndex + 1][colIndex])
        if (colIndex - 1 >= 0) adj.push(map[rowIndex][colIndex - 1])
        if (colIndex + 1 < map[rowIndex].length) adj.push(map[rowIndex][colIndex + 1])
        return adj
    }

    const isLowPoint = (height, rowIndex, colIndex) => {
        return generateAdjacentPoints(rowIndex, colIndex).every((adj) => adj > height);
    }

    return map.map((row, rowIndex) => {
        return row.filter((point, colIndex) => isLowPoint(point, rowIndex, colIndex))
    })
}

const getRisk = (height) => {
    return height + 1;
}


const part1 = () => {
    const fileName = "input.txt"

    const map = parse(fileName);

    //console.log('Map of heights:');
    //console.table(map)

    const lowPoints = getLowPoints(map);

    console.log('Map of low Points:')
    console.table(lowPoints)

    const sumRisk = lowPoints.flat().map(getRisk).reduce((total, risk) => total + risk)

    console.log(`Sum of the risk levels: ${sumRisk}`)
}

if (require.main === module) part1();
