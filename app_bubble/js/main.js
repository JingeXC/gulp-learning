var canvas = document.getElementById('main-panel');
var ctx = canvas.getContext('2d');
var panelWidth = canvas.width = window.innerWidth;
var panelHeight = canvas.height = window.innerHeight;
var ballR = 100;
var ballArr = [];
var xPosition;
var outPanel = document.querySelector("body");
outPanel.onmousemove = function (e) {
    xPosition = e.clientX;
};
var balls = (function () {
    function balls() {
        this.r = Math.floor(Math.random() * 50);
        this.red = Math.floor(Math.random() * 155) + 100;
        this.green = Math.floor(Math.random() * 155) + 100;
        this.blue = Math.floor(Math.random() * 155) + 100;
        this.opacity = Math.floor(Math.random() * 10) / 10;
        this.positionX = Math.floor(Math.random() * panelWidth);
        //positionX=xPosition?xPosition:Math.floor(Math.random()*panelWidth);
        //positionY = Math.floor(Math.random()*panelHeight);
        this.positionY = panelHeight;
        this.drawBall = function () {
            var color = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.opacity + ")";
            var Y = this.positionY;
            ctx.beginPath();
            ctx.arc(this.positionX, Y, this.r, 0, 2 * Math.PI, true);
            ctx.fillStyle = color;
            ctx.closePath();
            ctx.fill();
        };
    }
    return balls;
}());
setInterval(function () {
    var ball = new balls();
    ballArr.push(ball);
    if (ballArr.length >= 100) {
        ballArr.shift();
    }
}, 100);
setInterval(function () {
    ctx.clearRect(0, 0, panelWidth, panelHeight);
    for (var _i = 0, ballArr_1 = ballArr; _i < ballArr_1.length; _i++) {
        var ball = ballArr_1[_i];
        if (ball.opacity > 0) {
            ball.opacity -= 0.005;
        }
        else {
            ball.opacity = 0;
        }
        ball.r += 0.6;
        ball.positionY -= 3;
        ball.drawBall();
    }
}, 20);
