class LanternFish {
    constructor() {
        this.number = 0;
    }

    addFish() {
        this.number++;
    }

    addNumber(num) {
        this.number += num;
    }
}

module.exports.LanternFish = LanternFish;