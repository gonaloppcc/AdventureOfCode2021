const {LanternFish} = require('./LanternFish');
const {LanternFishField} = require('./LanternFishField');

const day6 = () => {
    const fileName = 'input.txt';
    const fs = require("fs");
    const fishDays = fs.readFileSync(fileName, "utf-8")
        .split(',')
        .filter(Boolean)
        .map(Number)

    const field = new LanternFishField(fishDays);

    field.show()

    const days = 256; // Only difference between part one and two.
    for (let i = 0; i < days; i++) {
        console.log('Day:', i);
        field.increaseTime();
        field.show()
    }

    console.log("Final number of fish:", field.totalFish());
}

if (require.main === module) day6();
