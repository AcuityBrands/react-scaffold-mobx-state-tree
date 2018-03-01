import * as React from "react";
import {Tabs, Button} from 'antd';
import SampleButton from '../components/SampleButton'
const TabPane = Tabs.TabPane;

interface IPane {
  title: string,
  content: any,
  key: string
}

export default class Sandbox extends React.Component {
  state:any;
  private newTabIndex:number;

  constructor(props:any) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes
    };
  }

  onEdit = (targetKey:string, action:string) => {
    if(action === 'remove') this.remove(targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: <SampleButton />, key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey:string) => {
    let activeKey = this.state.activeKey;
    let lastIndex = 0;
    this.state.panes.forEach((pane:IPane, i:number) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter((pane:IPane) => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <div className="content-wrapper card">
        <Button onClick={this.add}>Add</Button>
        <Tabs 
          hideAdd
          defaultActiveKey="1" 
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map((pane:IPane) => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }
}