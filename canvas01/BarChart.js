function draw() {
    canvas = document.getElementById("canvas");
    let revenue = [{ "year": 2010, "Revenue": 2000 },
    { "dimension": 2011, "measure": 2100 },
    { "dimension": 2012, "measure": 2200 },
    { "dimension": 2013, "measure": 2300 },
    { "dimension": 2014, "measure": 2400 },
    { "dimension": 2015, "measure": 2500 }];
    barChart = new BarChart(canvas, revenue);
    barChart.Draw();
}

class BarChart {

    constructor(canvas, data) {
        this.canvas = canvas;
        this.data = data;
        this.context = canvas.getContext('2d');
        this.context.translate(0, this.canvas.height);
        this.context.scale(1, -1);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.leftMargin = 50;
        this.topMargin = 50;
        this.bottomMargin = 50;
        this.rightMargin = 50;
        this.width = this.canvas.width - this.rightMargin - this.leftMargin;
        this.height = this.canvas.height - this.topMargin - this.bottomMargin;
    }
    Draw = function () {
        this.DrawChartAxis();
        this.DrawChartBar();
    }
    DrawChartAxis = function () {
        this.context.stokeStyle = "black";
        this.context.moveTo(this.leftMargin, this.bottomMargin);
        this.context.lineTo(this.leftMargin, this.height);
        this.context.moveTo(this.leftMargin, this.bottomMargin);
        this.context.lineTo(this.width, this.bottomMargin);
        this.context.stroke();
    }
    DrawChartBar = function () {
        let count = this.data.length;
        let maxDimension = undefined;
        for (let i = 0; i < count; i++) {
            if (!maxDimension) {
                maxDimension = this.data[i].measure;
            }
            else if (maxDimension < this.data[i].measure) {
                maxDimension = this.data[i].measure;
            }
        }
        let ratio = this.width/maxDimension;
        debugger;
    }
    DrawBar = function (x, y, w, h, text, foreColor, backColor) {

    }
}