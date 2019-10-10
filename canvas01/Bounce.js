function Bounce(canvas) {
    // if(!canvas)
    // {
    //     throw "Wrong parameter";
    // }
    this.canvas = canvas;
    this.context = null;

    this.Animate = function () {
        this.context = this.canvas.getContext('2d');
        this.context = canvas.getContext("2d");
        this.context.fillStyle = 'rgb(200, 0, 0)';
        this.context.fillRect(30, 30, 50, 50);
        //this.context.clearRect(0, 0, canvas.width, canvas.height);
        // circles.forEach(element => {
        //     element.Update();
        // });
        // requestAnimationFrame(Animate)
    }
}
function Draw() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    context.fillStyle = 'rgb(200, 0, 0)';
    context.fillRect(10, 10, 50, 50);
    var bounce = new Bounce(canvas);
    bounce.Animate();
}