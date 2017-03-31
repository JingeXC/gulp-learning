var drive = (function () {
    function drive() {
        this["do"] = function () {
            return this.kilometres / this.speed;
        };
    }
    return drive;
}());
var buyOrNot = function (car) {
    if (car.price > 16) {
        return false;
    }
    else {
        return true;
    }
};
console.log(buyOrNot({ price: 15 }));
