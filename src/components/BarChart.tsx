/**
 * Bar Chart Component
 * 
 * Renders input dataset as basic bar chart
 */

import * as React from "react";
import * as Chart from 'chart.js/dist/Chart.js'

interface IBarChartProps {
  id: string,
  label: string,
  height: number,
  data: IChartData
}

interface IChartData {
  labels: Array<string>,
  values: Array<number>
}

export class BarChart extends React.Component<IBarChartProps, null> {
  
  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    //Chart globals
    Chart.defaults.global.legend.position = "bottom"

    // TODO: Figure out why chart data won't use 
    // props without a clone of the array

    //Initialize Chart
    new Chart(this.props.id, {
      type: 'bar',
      data: {
        labels: this.props.data.labels,
        datasets: [{
          label: this.props.label,
          data: this.props.data.values.slice(),
          backgroundColor: this.getRandomColor(),
          pointRadius: 0,
          borderColor: 'rgba(0,0,0,0)'
        }]
      },
      options: {
        legend: { display: false },
        scales: {
          xAxes: [{
              gridLines: {
                  display: false
              }
          }],
          yAxes: [{
            gridLines: {
                borderDash: [2,2]
            }
          }]
        },
        tooltips: {
          xPadding: 10,
          yPadding: 10,
          titleMarginBottom: 8
        }
      }
    });
  }

  // Create canvas to render chart
  render() {
    return (
      <canvas id={this.props.id} height={this.props.height}></canvas>
    );
  }

  // Randomizes the color of the chart - hardcoded opacity level
  getRandomColor() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',0.7)';
  }
}