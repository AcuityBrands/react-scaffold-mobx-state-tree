import * as React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { IAppStore } from '../models/AppStore'
import { Slider, Row, Col, Card, Divider, DatePicker } from 'antd';
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
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Row type="flex" align="middle">
                <Col span={4}>Chart Render Speed</Col>
                <Col span={20}><Slider value={this.sliderValue} min={0} max={2000} onChange={this.updateSpeed} /></Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col sm={12} lg={6}>
            <Card bordered={false}>
              <h3>Writes / Minute</h3>
              <LineChart id="chartA" title="A" updateSpeed={this.sliderValue} height={100}></LineChart>
              <Divider />
              <p><span className="light">Avg Daily Writes:</span> <strong>1,409</strong></p>
            </Card>
          </Col>
          <Col sm={12} lg={6}>
            <Card bordered={false}>
              <h3>Success Rate</h3>
              <LineChart id="chartB" title="B" updateSpeed={this.sliderValue} height={100}></LineChart>
              <Divider />
              <p><span className="light">Avg Daily Success:</span> <strong>3,456</strong></p>
            </Card>
          </Col>
          <Col sm={12} lg={6}>
            <Card bordered={false}>
              <h3>Response Time</h3>
              <LineChart id="chartC" title="C" updateSpeed={this.sliderValue} height={100}></LineChart>
              <Divider />
              <p><span className="light">Avg Response Time: </span><strong>14ms</strong></p>
            </Card>
          </Col>
          <Col sm={12} lg={6}>
            <Card bordered={false}>
              <h3>Failures</h3>
              <LineChart id="chartD" title="D" updateSpeed={this.sliderValue} height={100}></LineChart>
              <Divider />
              <p><span className="light">Avg Daily Failures: </span><strong>45</strong></p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card loading={chartStore.loading} bordered={false} title="Sales Volume" extra={<RangePicker />}>
              <Row type="flex" align="middle">
                <Col span={18}>
                  <BarChart id="chartE" title="E" height={80} data={chartStore.salesData} />
                </Col>
                <Col span={5} offset={1}>
                  <h1>$21,271</h1>
                  <p><strong>Total Sales Volume</strong> (14 days)</p>
                  <p className="mt10">
                    Customers spent <span className="highlight">$14,231 more dollars</span> in your
                    store this week than they did last week.
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={18}>
            <Card bordered={false}>
              <Map height={400}></Map>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>

            </Card>
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