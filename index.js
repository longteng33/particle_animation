var myCanvas = document.getElementById("canvas");
var ctx = myCanvas.getContext("2d");
var w = canvas.width = canvas.offsetWidth;
var h = canvas.height = canvas.offsetHeight;
var circleArr = [];

window.requestAnimationFrame
    = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;


class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 10;
        this.mx = Math.random();
        this.my = Math.random();
    }
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(134,103,103,0.3)"
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        ctx.fill();
    }
    drawLine(ctx, _circle) {
        var dx = this.x - _circle.x;
        var dy = this.y - _circle.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(104,204,204,0.3)";
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(_circle.x, _circle.y);
            // ctx.closePath();
            ctx.stroke();
        }

    }
    move(w, h) {
        this.mx = (this.x + this.mx / 2 < w && this.x + this.mx / 2 > 0) ? this.mx : -this.mx;
        this.my = (this.y + this.my / 2 < h && this.y + this.my / 2 > 0) ? this.my : -this.my;
        this.x = this.x + this.mx / 2;
        this.y = this.y + this.my / 2;
    }
}

class currentCircle extends Circle {
    constructor(x, y) {
        super(x, y);
        this.r = 0.1;
    }
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(216, 10, 10, 0.3)"
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        ctx.fill();
    }
}

let current_circle = new currentCircle(0, 0);

function draw() {
    ctx.clearRect(0, 0, w, h);
    var len = circleArr.length;
    for (var i = 0; i < len - 1; i++) {
        circleArr[i].move(w, h);
        circleArr[i].drawCircle(ctx);
        for (var j = i + 1; j < len; j++) {
            circleArr[i].drawLine(ctx, circleArr[j])
        }
    }
    if (current_circle.x) {
        current_circle.drawCircle(ctx);
        for (k = 0; k < len; k++) {
            current_circle.drawLine(ctx, circleArr[k])
        }
    }
    requestAnimationFrame(draw)
}


function init(num) {
    for (var i = 0; i < num; i++) {
        circleArr[i] = (new Circle(Math.random() * w, Math.random() * h));
    }
    draw()
}

window.onload = init(100)
window.onmousemove = function (e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
}

window.onmouseout = function (e) {
    e = e || window.event;
    current_circle.x = null;
    current_circle.y = null;
}




