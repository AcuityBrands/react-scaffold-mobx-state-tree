import * as React from "react";
import * as Chart from "chart.js";
import { autorun } from "mobx";
import { observer } from "mobx-react";

interface ILineChartProps {
  id: string,
  title: string,
  height: number,
  data: IChartData
}

interface IChartData {
  labels: Array<string>,
  values: Array<number>
}

@observer
export default class BarChart extends React.Component<ILineChartProps, null> {
  
  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    //Chart globals
    Chart.defaults.global.legend.position = "bottom"
    Chart.defaults.global.elements.rectangle.borderWidth = 1;

    // TODO: Figure out why chart data won't use 
    // props without a clone of the array

    //Initialize Chart
    new Chart(this.props.id, {
      type: 'bar',
      data: {
        labels: this.props.data.labels,
        datasets: [{
          label: this.props.title,
          data: this.props.data.values.slice(),
          backgroundColor: this.getRandomColor(),
          pointRadius: 0,
          borderColor: 'rgba(0,0,0,0)'
        }]
      },
      options: {
        legend: { display: false }
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
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',0.7)';
  }
}