import * as React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { IAppStore } from '../stores'
import { Slider, Row, Col, Divider, DatePicker, Icon, Button} from 'antd';
import {SparkChart, BarChart, Map} from '../components'
const { RangePicker } = DatePicker;

interface IDashboardProps {
  appStore: IAppStore
}

@inject("appStore")
@observer
export default class DashboardPage extends React.Component<IDashboardProps, undefined> {

  @observable sliderValue = 1000;
  private mapComponent:Map;

  updateSpeed = (value: number) => {
    this.sliderValue = value;
  }

  recenterMap = () => {
    this.mapComponent.recenterMap();
  }

  render() {
    // TODO: Make spark charts a component

    const { chartStore } = this.props.appStore;
    return (
      <div className="content-wrapper">
        <Row gutter={24}>
          <Col sm={12} lg={6}>
            <div className="card">
              <h3 className="mb10">Writes / Minute</h3>
              <SparkChart id="chartA" label="Writes/Min" renderSpeed={this.sliderValue} height={110}></SparkChart>
              <Divider />
              <p><span className="light">Avg Daily Writes:</span> <strong>1,409</strong ><Icon type="caret-up" className="green bump"/></p>
            </div>
          </Col>
          <Col sm={12} lg={6}>
            <div className="card">
              <h3 className="mb10">Success Rate</h3>
              <SparkChart id="chartB" label="Success Rate" renderSpeed={this.sliderValue} height={110}></SparkChart>
              <Divider />
              <p><span className="light">Avg Daily Success:</span> <strong>3,456</strong><Icon type="caret-down" className="red bump"/></p>
            </div>
          </Col>
          <Col sm={12} lg={6}>
            <div className="card">
              <h3 className="mb10">Response Time</h3>
              <SparkChart id="chartC" label="Response Time" renderSpeed={this.sliderValue} height={110}></SparkChart>
              <Divider />
              <p><span className="light">Avg Response Time: </span><strong>14ms</strong><Icon type="caret-up" className="green bump"/></p>
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
                <h3>Monthly Sales Volume</h3>
                <RangePicker />
              </div>
              <Row type="flex" align="middle">
                <Col span={18}>
                  <BarChart id="chartE" label="Monthy Sales" height={80} data={chartStore.salesData}/>
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
          <Col span={16}>
            <div className="card">
              <Map height={400} ref={(c) => { this.mapComponent = c; }}></Map>
            </div>
          </Col>
          <Col span={8}>
            <div className="card">
              <h3>Using This Map</h3>
              <p className="mt20">
                This is a standard geojson dataset that is extruded using the MapBox GL javascript framework (using properties on the features).
              </p>
              <ul className="mt10">
                <li><strong>Zoom</strong> mouse wheel or shift + left-click drag</li>
                <li><strong>Pan</strong> left-click and drag</li>
                <li><strong>Rotate</strong> ctrl + left-click and drag</li>
              </ul>
              <Button onClick={this.recenterMap}>Recenter Map</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}