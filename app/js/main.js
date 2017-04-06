var panel = document.getElementById("main-panel");
var ctx = panel.getContext('2d');
var width = panel.width = window.innerWidth;
var height = panel.height = window.innerHeight;
var backgroundColor = "rgba(0,0,0,1)";
var starArr = [];
var star = (function () {
    function star() {
        this.pointQuantity = Math.floor(Math.random() * 40) + 2;
        this.point = new Array();
        this.drawArc = function (points) {
            if (points === void 0) { points = this.point; }
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                ctx.beginPath();
                ctx.arc(point[0], point[1], this.r, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fillStyle = this.color;
                //ctx.shadowColor="white";
                //ctx.shadowBlur=10;
                ctx.fill();
            }
        };
        this.animate = function () {
            for (var i = 0; i < this.point.length; i++) {
                this.point[i][0] += 0.1;
                this.point[i][1] += (i + 1) * 0.5;
            }
            this.drawArc(this.point);
        };
        for (var i = 0; i < this.pointQuantity; i++) {
            this.point[this.point.length] = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
        }
        this.color = "rgb(" + (Math.floor(Math.random() * 155) + 100) + "," + (Math.floor(Math.random() * 155) + 100) + "," + (Math.floor(Math.random() * 155) + 100) + ")";
        this.r = Math.random() * 2;
    }
    return star;
}());
setInterval(function () {
    var Star = new star();
    starArr.push(Star);
    if (starArr.length > 20) {
        starArr.shift();
    }
}, 200);
setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    (function () {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.lineTo(width, height);
        ctx.lineTo(width, 0);
        ctx.fillStyle = backgroundColor;
        ctx.fill();
    })();
    for (var _i = 0, starArr_1 = starArr; _i < starArr_1.length; _i++) {
        var star_1 = starArr_1[_i];
        star_1.animate();
    }
}, 20);
