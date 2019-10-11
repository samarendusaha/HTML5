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
    constructor(x, y, dx, dy, radius, color, canvas, index) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.innerWidth = canvas.width;
        this.innerHeight = canvas.height;
        this.radius = radius;
        this.oriRadius = radius;
        this.color = color;
        this.canvas = canvas;
        this.Collided = false;
        this.ChildCircle = false;
        this.id = index;
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
        if (!this.ChildCircle) {
            if (this.x >= this.innerWidth - this.radius || this.x <= this.radius) {
                this.dx = -1 * this.dx;
            }
            if (this.y >= this.innerHeight - this.radius || this.y <= this.radius) {
                this.dy = -1 * this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
        }
        this.Draw();
    };
}

function Animate() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(element1 => {
        circles.forEach(element2 => {
            if (element1.id != element2.id) {
                if (GetDistance(element1.x, element1.y, element2.x, element2.y) < element1.radius + element2.radius) {
                    element1.Collided = true;
                    element2.Collided = true;
                }
            }
        })
    });
 
     removedCircles = circles.filter(item => item.Collided == true);
    // // //console.log(removedCircles.length);
    circles = circles.filter(item => item.Collided == false);
    removedCircles.forEach(element => {
        c = SplitAndCloneCircle(element, 4);
        c.forEach(e => {
            e.Draw();
            circles.push(e);
        });
    });

    circles.forEach(element => {
        element.Update();
    });
    requestAnimationFrame(Animate)
}
var circles = [];
function Draw(event) {
    let canvas = document.getElementById('canvas');
    let radius = 40;
    let colors = [
        '#2185C5',
        '#7ECEFD',
        '#FFF6E5',
        '#FF7F66'
    ];
    for (i = 0; i < 6; i++) {
        var x = Math.random() * (canvas.width - radius);
        var y = Math.random() * (canvas.height - radius);
        if (x < radius) {
            x += radius;
        }
        if (y < radius) {
            y += radius;
        }
        var dx = getRandomArbitrary(1, 2);
        var dy = getRandomArbitrary(1, 2);
        var color = colors[i % 4];
        circles.push(new Circle(x, y, dx, dy, radius, color, canvas, i));
    }
    circles.forEach(element => {
        Animate();
    });
}

function GetDistance(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;
    x = x * x;
    y = y * y;
    let d = x + y;
    d = Math.sqrt(d)
    return d;
}

function SplitAndCloneCircle(circle, noOfCircle) {
    let newCircles = [];
    for (let i = 0; i < noOfCircle; i++) {
        c = new Circle(circle.x, circle.y, 0, 0, 0, circle.color, circle.canvas);
        c.radius = circle.radius * 0.8;
        //c.id = '' + Circle.id + i;
        //c.Collided = false;
        // debugger;
        // console.log( c.radius);
        c.x = circle.x;
        c.y = circle.y;
        c.color = circle.color;
        if (i % noOfCircle == 0) {
            c.dx = -1;
            c.dy = -1;
        }
        if (i % noOfCircle == 1) {
            c.dx = -1;
            c.dy = 1;
        }
        if (i % noOfCircle == 2) {
            c.dx = 1;
            c.dy = -1;
        }
        if (i % noOfCircle == 3) {
            c.dx = 1;
            c.dy = 1;
        }
        newCircles.push(c);
    }
    return newCircles;
}

function getRandomArbitrary(min, max) {
    var ran = Math.round(Math.random()) * (max - min) + min;
    return ran;
}
