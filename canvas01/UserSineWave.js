var sineWaves = [];
var colors = [
    'red',
    'blue',
    'green',
    'yellow'
];

function onLoad()
{
    resizeCanvas();
}
function resizeCanvas()
{
    canvas = document.getElementById("myCanvas");
    table = document.getElementById("tableUserInput");
    canvas.width = window.innerWidth - 70;
    canvas.height = window.innerHeight - table.clientHeight - 10;
}

function Draw() {
    resizeCanvas();
    let txt = document.getElementById('txtMaxAmplitude');
    for (i = sineWaves.length - 1; i >= 0; i--) {
        sineWaves.splice(i, 1);
    }

    canvas = document.getElementById("myCanvas");
 
    sineWave = new SineWave(0, 0, 1, 'black', canvas);
    sineWave.Draw();
    sineWaves.push(sineWave);
    for (i = 0; i < 5; i++) {
    //sineWave = new SineWave(Math.random() * 50 + 50, 2, colors[i%4], canvas);
    let amplitude = Math.random() * 50 + 20;
    let dAmplitude = Math.random() * 300 + 20;
    let rate = Math.random() * 0.1 + 0.01 ;  
    sineWave = new SineWave(amplitude, dAmplitude, rate, colors[i%4], canvas);
    sineWave.Draw();
    sineWaves.push(sineWave);

    // sineWave = new SineWave(20, 300, 0.02, colors[1], canvas);
    // sineWave.Draw();
    // sineWaves.push(sineWave);
    }

    DrawFinal();

    console.log(sineWaves);
    //Animate();
}
class SineWave {
    constructor(amplitude, dAmplitude, rate, color, canvas) {
        this.canvas = canvas;
        this.amplitude = amplitude;
        this.dx = dAmplitude;
        this.color = color;
        this.rate = rate;
        console.log(color);
        this.context = canvas.getContext("2d");
    }
    Draw = function () {
        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.context.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            this.context.lineTo(i, this.canvas.height / 2 + Math.sin((i + this.dx) * this.rate) * this.amplitude);
        }
        this.context.stroke();
    }
    Update = function () {
        this.context.strokeStyle = this.color;
        this.dx += 2;
        this.context.beginPath();
        this.context.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            this.context.lineTo(i, this.canvas.height / 2 + Math.sin((i + this.dx) * this.rate) * this.amplitude);
        }
        this.context.stroke();
    }
}
function UpdateFinal() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    this.context.strokeStyle = "red";
    this.context.lineWidth = 5;
    this.context.beginPath();
    this.context.moveTo(0, canvas.height / 2);
    let y = 0;
    for (let i = 0; i < canvas.width; i++) {
        y = canvas.height / 2;
        sineWaves.forEach(element => {
            y += Math.sin((i + element.dx) * element.rate) * element.amplitude;
        });
        let rs = "x = " + i + " y = " + y;
        this.context.lineTo(i, y);
    }
    this.context.stroke();
}

DrawFinal = function () {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    this.context.strokeStyle = "red";
    this.context.lineWidth = 5;
    this.context.beginPath();
    this.context.moveTo(0, canvas.height / 2);
    let y = 0;
    for (let i = 0; i < canvas.width; i++) {
        y = canvas.height / 2;
        sineWaves.forEach(element => {
            y += Math.sin((i + element.dx) * element.rate) * element.amplitude;
        });
        let rs = "x = " + i + " y = " + y;
        this.context.lineTo(i, y);
    }
    this.context.stroke();
}

function Animate() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    sineWaves.forEach(element => {
        element.Update();
    });
    Update();
    requestAnimationFrame(Animate);
}