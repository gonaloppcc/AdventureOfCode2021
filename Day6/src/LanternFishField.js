const {LanternFish} = require("./LanternFish");

class LanternFishField {
    static maxDays = 8;

    // [()]
    constructor(fishDays) {
        this.day = 0;
        this.fish = Array(LanternFishField.maxDays + 1);
        for (let i = 0; i <= LanternFishField.maxDays; i++) {
            this.fish[i] = new LanternFish();
        }

        console.table(fishDays)
        console.log("fish[days]:", this.fish[fishDays[0]]);
        fishDays.forEach(days => this.fish[days].addFish());
    }

    increaseTime() {
        this.day++;

        const temp = this.fish[0].number;

        for (let i = 1; i < this.fish.length; i++) {
            this.fish[i - 1].number = this.fish[i].number;
        }


        console.log("Length:", this.fish.length);
        this.fish[6].addNumber(temp);
        this.fish[8].number = temp;

    }

    show() {
        console.table({
            day: this.day,
            fish: this.fish.map(f => `${f.number}`)
        })
    }

    totalFish() {
        return this.fish.map(f => f.number).reduce((acc, num) => acc + num);
    }
}

module.exports.LanternFishField = LanternFishField;
