var sineWaves = [];
var colors = [
    'red',
    'blue',
    'green',
    'yellow'
];
function Draw() {
    canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 50;
    sineWave = new SineWave(0,0, 'black', canvas);
    sineWave.Draw();
    sineWaves.push(sineWave);
    for (i = 0; i < 5; i++) {
        //sineWave = new SineWave(Math.random() * 50 + 50, 2, colors[i%4], canvas);
        sineWave = new SineWave(i * 50 + 50, Math.random() * 2 + 1, colors[i % 4], canvas);
        sineWave.Draw();
        sineWaves.push(sineWave);
    }
    Animate();
}
class SineWave {
    constructor(amplitude, dAmplitude, color, canvas) {
        this.canvas = canvas;
        this.amplitude = amplitude;
        this.dx = dAmplitude;
        this.color = color;
        console.log(color);
        this.context = canvas.getContext("2d");
    }
    Draw = function () {
        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.context.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            this.context.lineTo(i, this.canvas.height / 2 + Math.sin((i + this.dx) * 0.01) * this.amplitude);
        }
        this.context.stroke();
    }
    Update = function () {
        this.context.strokeStyle = this.color;
        this.dx += 2;
        this.context.beginPath();
        this.context.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            this.context.lineTo(i, this.canvas.height / 2 + Math.sin((i + this.dx) * 0.01) * this.amplitude);
        }
        this.context.stroke();
    }
}
function Animate() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    sineWaves.forEach(element => {
        element.Update();
    });
    requestAnimationFrame(Animate);
}