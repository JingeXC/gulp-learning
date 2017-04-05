var panel = document.getElementById("main-panel");
var ctx = panel.getContext('2d');
var width = panel.width = window.innerWidth;
var height = panel.height = window.innerHeight;
var lineWidth = 0.3;
var backgroundColor = "rgba(0,0,0,1)";
var linePoints = 30;
var lineAmount = 30;
var createTime = 500;
var blurWidth = 10;
var lineArr = [];
var line = (function () {
    function line() {
        this.pointQuantity = Math.floor(Math.random() * linePoints) + 2;
        this.startPointX = Math.floor(Math.random() * width);
        this.startPointY = Math.floor(Math.random() * height);
        this.point = new Array();
        this.drawLine = function (startX, startY, point) {
            if (startX === void 0) { startX = this.startPointX; }
            if (startY === void 0) { startY = this.startPointY; }
            if (point === void 0) { point = this.point; }
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            for (var i = 0; i < this.pointQuantity; i++) {
                ctx.lineTo(point[i][0], point[i][1]);
            }
            ctx.closePath();
            ctx.strokeStyle = this.color;
            ctx.shadowColor = "white";
            ctx.shadowBlur = blurWidth;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        };
        this.animate = function () {
            for (var i = 0; i < this.point.length; i++) {
                switch (i % 4) {
                    case 0:
                        this.point[i][0] += 1;
                        this.point[i][1] += 1;
                        break;
                    case 1:
                        this.point[i][0] -= 1;
                        this.point[i][1] += 1;
                        break;
                    case 2:
                        this.point[i][0] += 1;
                        this.point[i][1] -= 1;
                        break;
                    case 3:
                        this.point[i][0] -= 1;
                        this.point[i][1] -= 1;
                        break;
                }
            }
            if (this.startPointX > width / 2) {
                this.startPointX++;
            }
            else {
                this.startPointX--;
            }
            if (this.startPointY > height / 2) {
                this.startPointY++;
            }
            else {
                this.startPointY--;
            }
            this.drawLine(this.startPointX, this.startPointY, this.point);
        };
        for (var i = 0; i < this.pointQuantity; i++) {
            this.point[this.point.length] = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
        }
        this.color = "rgb(" + (Math.floor(Math.random() * 55) + 200) + "," + (Math.floor(Math.random() * 55) + 200) + "," + (Math.floor(Math.random() * 55) + 200) + ")";
    }
    return line;
}());
setInterval(function () {
    var Line = new line();
    lineArr.push(Line);
    if (lineArr.length > lineAmount) {
        lineArr.shift();
    }
}, createTime);
setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    (function () {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.lineTo(width, height);
        ctx.lineTo(width, 0);
        ctx.strokeStyle = backgroundColor;
        ctx.fill();
    })();
    for (var _i = 0, lineArr_1 = lineArr; _i < lineArr_1.length; _i++) {
        var line_1 = lineArr_1[_i];
        line_1.animate();
    }
}, 20);
