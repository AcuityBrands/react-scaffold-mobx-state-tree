import * as React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { IAppStore } from '../models/AppStore'
import { Slider, Row, Col, Divider, DatePicker } from 'antd';
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import Map from '../components/Map';
const { RangePicker } = DatePicker;

interface IDashboardProps {
  appStore: IAppStore
}

@inject("appStore")
@observer
export default class DashboardPage extends React.Component<IDashboardProps, undefined> {

  @observable sliderValue = 1000;

  updateSpeed = (value: number) => {
    this.sliderValue = value;
  }

  render() {
    // TODO: Make spark charts a component

    const { chartStore } = this.props.appStore;
    return (
      <div className="content-wrapper">
        <Row gutter={24}>
          <Col sm={12} lg={6}>
            <div className="card">
              <h3>Writes / Minute</h3>
              <LineChart id="chartA" title="A" updateSpeed={this.sliderValue} height={100}></LineChart>
              <Divider />
              <p><span className="light">Avg Daily Writes:</span> <strong>1,409</strong></p>
            </div>
          </Col>
          <Col sm={12} lg={6}>
            <div className="card">
              <h3>Success Rate</h3>
              <LineChart id="chartB" title="B" updateSpeed={this.sliderValue} height={100}></LineChart>
              <Divider />
              <p><span className="light">Avg Daily Success:</span> <strong>3,456</strong></p>
            </div>
          </Col>
          <Col sm={12} lg={6}>
            <div className="card">
              <h3>Response Time</h3>
              <LineChart id="chartC" title="C" updateSpeed={this.sliderValue} height={100}></LineChart>
              <Divider />
              <p><span className="light">Avg Response Time: </span><strong>14ms</strong></p>
            </div>
          </Col>
          <Col sm={12} lg={6}>
            <div className="card">
              <h3>Chart Render Speed</h3>
              <Slider value={this.sliderValue} min={0} max={2000} onChange={this.updateSpeed} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="card">
              <div className="card-header">
                <h3>Sales Volume</h3>
                <RangePicker />
              </div>
              <Row type="flex" align="middle">
                <Col span={18}>
                  <BarChart id="chartE" title="E" height={80} data={chartStore.salesData} />
                </Col>
                <Col span={5} offset={1}>
                  <h1>$21,271</h1>
                  <p className="mt10"><strong>Total Sales Volume</strong> (14 days)</p>
                  <p className="mt10">
                    Customers spent <span className="highlight">$14,231 more dollars</span> in your
                    store this week than they did last week.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={18}>
            <div className="card">
              <Map height={400}></Map>
            </div>
          </Col>
          <Col span={6}>
            <div className="card">

            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

// <Row>
// <Col span={20}>

// </Col>
// <Col span={4}>
//   
// </Col>
// </Row>