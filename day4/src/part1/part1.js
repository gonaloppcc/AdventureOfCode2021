// Goal: Get the winner's board and the number that was called when the board won.

// Parsing
const boardSize = 5;

const parseBoardsAndNumbers = (fileName) => {
    const fs = require("fs");
    const fileContent = fs.readFileSync(fileName, "utf-8");
    const lines = fileContent.split(/\r?\n/);

    let numbers = lines[0].split(",").map((num) => parseInt(num, 10));
    //console.log(`Numbers: ${numbers}`);
    console.table(numbers);

    const parseBoard = (lines) => {
        const board = [];
        //console.log(`Lines from parseBoard: ${lines}`);
        for (let i = 0; i < boardSize; i++) {
            let row = lines[i]
                .split(" ")
                .filter((str) => str !== "")
                .map((num) => parseInt(num, 10))
                .map((num) => {
                    return {
                        value: num,
                        marked: false,
                    };
                });
            //console.log(`Row: ${row.map((num) => num.marked)}`);

            board.push(row);
        }
        return board;
    };

    const boards = [];

    for (let i = 0; 2 + 6 * (i + 1) < lines.length; i++) {
        const startIndex = 2 + 6 * i;
        const boardLines = lines.slice(startIndex, startIndex + boardSize + 1);
        //console.log(`Board: ${boardLines}`);

        boards.push(parseBoard(boardLines));
    }
    return {
        numbers: numbers,
        boards: boards,
    };
};

const printBoard = (board) => {
    console.table(board.map(row => row.map(e => (e.marked && ".") + e.value + (e.marked && "."))));
}

const checkWin = (board) => {
    const rowMarked = board.some((row) => row.every((num) => num.marked));
    if (rowMarked) {
        //console.log("Winner's board");
        //printBoard(board);
        return true;
    }

    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            if (!(board[i][j].marked)) {
                break;
            } else if (i === boardSize - 1) {
                //console.log("Winner's board");
                //printBoard(board);
                return true;
            }
        }
    }

    return false;
};

//console.log(boards.some(checkWin));

const markNumber = (board, number) => {
    const boardFlatted = board.flat();
    const index = boardFlatted.findIndex((num) => num.value === number);
    //console.log("Index:", index);

    if (index !== -1) {
        //console.log("FlattedBoard:", boardFlatted);
        boardFlatted[index].marked = true;
    }
};

const drawNumber = (boards, num) => {
    boards.forEach((board) => markNumber(board, num));

    return boards.map(checkWin).map((bool, index) => {
        return {
            index: index,
            bool: bool
        }
    }).filter(obj => obj.bool).map(obj => obj.index);
};

const sumUnmarkedNumbers = (board) => {
    //console.log("Sum's Board:");
    //printBoard(board)
    const numbers = board.flat();
    const sum = numbers
        .filter((num) => !num.marked)
        .map((num) => num.value)
        .reduce((acc, num) => acc + num);

    console.log("Sum:", sum);

    return sum;
};

const part1 = () => {
    const fileName = "test.txt";
    const {numbers, boards} = parseBoardsAndNumbers(fileName);

    console.log("Boards:");
    boards.forEach(printBoard);

    // Drawing the numbers
    let winnerFound = false;
    for (let i = 0; i < numbers.length; i++) {
        const winnerIndex = drawNumber(boards, numbers[i]);
        //if (numbers[i] === 24) printBoard(boards[1]);
        console.log("Winners:", winnerIndex);
        if (winnerIndex.length !== 0) {
            console.log("Win, boards:");
            boards.forEach(printBoard);

            winnerFound = true;
            const lastNumber = numbers[i];
            const winner = winnerIndex[0];
            const sumUnmaked = sumUnmarkedNumbers(boards[winner]);
            console.log(
                `Score: {lastNumber:${lastNumber}} * {sum:${sumUnmaked}} = ${
                    lastNumber * sumUnmaked
                }`
            );
            break;
        }
    }

    if (winnerFound === false) console.log("No winners!");
};

module.exports.parse = parseBoardsAndNumbers;
module.exports.drawNumber = drawNumber;
module.exports.sumUnmarkedNumbers = sumUnmarkedNumbers;
module.exports.printBoard = printBoard;

if (require.main === module) part1();
