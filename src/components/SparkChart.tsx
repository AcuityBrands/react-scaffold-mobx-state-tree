import * as React from "react";
import * as Chart from "chart.js";
import { autorun } from "mobx";
import { observer } from "mobx-react";

interface ILineChartProps {
  id: string,
  label: string,
  height: number,
  renderSpeed:number,
}

// WARNING: This is a contrived example with limited utility

@observer
export default class SparkChart extends React.Component<ILineChartProps, null> {
  
  chartData: Array<number> = [
    12, 19, 3, 5, 2, 3, 8, 5, 4, 
    9, 1, 12, 3, 5, 0
  ];
  labels: Array<string> = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "11", "12", "13", "14", "15"
  ];
  interval:any = -1;
  chart:any;
  disposer:any;
  
  componentDidMount() {
    this.renderChart();

    //Randomize the data, update if the rendering speed changes
    this.disposer = autorun(() => this.randomizeData(this.props.renderSpeed));
  }

  componentWillUnmount() {
    this.disposer();
  }

  renderChart() {
    //Chart globals
    Chart.defaults.global.legend.position = "bottom"
    Chart.defaults.global.elements.rectangle.borderWidth = 1;

    //Initialize Chart
    this.chart = new Chart(this.props.id, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.props.label,
          data: this.chartData,
          backgroundColor: this.getRandomColor(),
          pointRadius: 0,
          borderColor: 'rgba(0,0,0,0)'
        }]
      },
      options: {
        legend: { display: false },
        layout: {
          padding: {
            left: -10
          }
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            ticks: { display: false },
            gridLines: {
                borderDash: [2,2],
                drawBorder: false
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <canvas id={this.props.id} height={this.props.height}></canvas>
    );
  }

  getRandomColor() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',0.5)';
  }

  randomizeData(value:number) {
    clearInterval(this.interval);

    if(value > 300) {
      this.chart.options.animation.duration = value;
    } else {
      this.chart.options.animation.duration = 0;
    }

    // Randomly update Chart
    this.interval = setInterval(() => {
      this.chartData.push(Math.floor(Math.random() * 10));
      this.chartData.shift();
      this.labels.push(Math.floor(Math.random() * 10).toString());
      this.labels.shift();
      this.chart.data.datasets[0].data = this.chartData;
      this.chart.update();
    }, value);
  }
}