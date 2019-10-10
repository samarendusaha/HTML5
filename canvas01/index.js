// function draw() {
//     var canvas = document.getElementById('canvas');
//     if (canvas.getContext) {
//       var ctx = canvas.getContext('2d');

//       ctx.beginPath();
//       ctx.moveTo(75, 50);
//       ctx.lineTo(100, 75);
//       ctx.lineTo(100, 25);
//       ctx.fill();
//     }
//   }

// function draw() {
//     var canvas = document.getElementById('canvas');
//     if (canvas.getContext) {
//       var ctx = canvas.getContext('2d');

//       ctx.fillStyle = 'rgb(200, 0, 0)';
//       ctx.fillRect(10, 10, 50, 50);

//       ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
//       ctx.fillRect(30, 30, 50, 50);
//     }
//   }

// function draw() {
//     var canvas = document.getElementById('canvas');
//     if (canvas.getContext) {
//       var ctx = canvas.getContext('2d');

//       ctx.fillRect(25, 25, 100, 100);
//       ctx.clearRect(45, 45, 60, 60);
//       ctx.strokeRect(50, 50, 50, 50);
//     }
//   }

// var canvas = document.getElementById('canvas');
// var c = canvas.getContext('2d');
// var innerWidth = window.innerWidth;
// var innerHeight = window.innerWidth;
// c.beginPath();
// c.arc(200,200,40,0,Math.PI * 2)
// c.stroke();
var mousePostion =
{
    x: null,
    y: null
}
window.addEventListener('mousemove', function (event) {
    mousePostion.x = event.x;
    mousePostion.y = event.y;
});
class Circle {
    constructor(x, y, dx, dy, radius, color, canvas) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.innerWidth = canvas.width;
        this.innerHeight = canvas.height;
        this.radius = radius;
        this.oriRadius = radius;
        this.color = color;
        this.context = canvas.getContext('2d');
    }
    Draw = function () {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.shadowOffsetX = 15;
        this.context.fillStyle = this.color;
        this.context.shadowOffsetX = 10;
        this.context.shadowOffsetY = 10;
        this.context.fill();
        this.context.stroke();
    };
    Update = function () {
        if (this.x >= this.innerWidth - this.radius || this.x <= this.radius) {
            this.dx = -1 * this.dx;
        }
        if (this.y >= this.innerHeight - this.radius || this.y <= this.radius) {
            this.dy = -1 * this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.Draw();
    };
}

function Animate() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'rgba(255,255,255,0.25)'
    // context.fillRect(0, 0, canvas.width, canvas.height);
    circles.forEach(element => {
        if (mousePostion.x) {
            if (Math.abs(element.x - mousePostion.x) < 30) {
                if (element.radius < 2 * element.oriRadius)
                    element.radius += 1;
            }
            else {
                if (element.radius > element.oriRadius) {
                    element.radius -= 1;
                }
            }
        }
        element.Update();
    });
    requestAnimationFrame(Animate)
}
var circles = [];
function draw(event) {
    var canvas = document.getElementById('canvas');
    var radius = 10;
    var colors = [
        '#2185C5',
        '#7ECEFD',
        '#FFF6E5',
        '#FF7F66'
    ];
    console.log(event)
    for (i = 0; i < 100; i++) {
        var x = Math.random() * (canvas.width - radius);
        var y = Math.random() * (canvas.height - radius);
        if (x < radius) {
            x += radius;
        }
        if (y < radius) {
            y += radius;
        }
        var dx = getRandomArbitrary(2, 5);
        var dy = getRandomArbitrary(2, 5);
        var color = colors[i % 4];
        circles.push(new Circle(x, y, dx, dy, radius, color, canvas));
    }
    circles.forEach(element => {
        element.Draw();
    });
    Animate();
}

function getRandomArbitrary(min, max) {
    var ran = Math.round(Math.random()) * (max - min) + min;
    return ran;
}
