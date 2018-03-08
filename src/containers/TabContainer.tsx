/**
 * TabNavigation Component
 * 
 * Primary content render engine for application.  This component
 * Will listen to changes to the browser location and render
 * a new tab (or reuse an existing one).
 * 
 * WARNING: Dependent on DOM router
 */
import * as React from "react";
import { inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import { IAppStore } from '../stores/AppStore';
import { LazyDashboard } from '../containers/LazyDashboard'
import { LazyAbout } from '../containers/LazyAbout'
import { LazyTodo } from '../containers/LazyTodo'
const TabPane = Tabs.TabPane;

interface ITabNavProps {
  match: any,
  location: any,
  history: any,
  appStore: IAppStore
}

interface IPane {
  title: string,
  content: any,
  key: string,
  disabled: boolean
}

interface ITabState {
  activeKey: string,
  panes: Array<IPane>
}


@inject("appStore")
class TabContainer extends React.Component<ITabNavProps, {}>{
  state: ITabState
  unlisten: any;

  // TODO: Move route configurations to common file for reusability
  pathConfig = [
    { path: "/dashboard", label: "Dashboard", component: <LazyDashboard/>},
    { path: "/task", label: "Tasks", component: <LazyTodo/>},
    { path: "/about", label: "About App", component: <LazyAbout/>}
  ]

  constructor(props: any) {
    super(props);
    this.state = {
      activeKey: '',
      panes: []
    };
  }

  componentDidMount() {
    this.renderComponent(this.props.location);
    this.unlisten = this.props.history.listen((location: any, action: any) => {
      this.renderComponent(location);
    });
  }

  onEdit = (targetKey: string, action: string) => {
    if (action === 'remove') this.remove(targetKey);
  }

  onChange = (activeKey: string) => {
    this.setState({ activeKey: activeKey });
    this.props.history.push(activeKey);
  }

  renderComponent = (location: any) => {
    const panes = this.state.panes;

    // Determine if tab is already open
    // if so, set the active tab to the open tab
    for (let x = 0; x < panes.length; x++) {
      let p = panes[x] as IPane;
      if (p.key === location.pathname) {
        this.setState({ activeKey: p.key });
        return false;
      }
    }

    // Lookup the pane content given the
    // router location
    let item;
    let pathFound: boolean = false;
    for (let i = 0; i < this.pathConfig.length; i++) {
      item = this.pathConfig[i];
      if (item.path === location.pathname) {
        pathFound = true;
        break;
      }
    }

    // If the path is found, create a new tab
    if (pathFound) {
      panes.push({ title: item.label, content: item.component, key: item.path, disabled: true });
      if (panes.length > 1) {
        panes.map(p => p.disabled = false);
      }
      this.setState({ panes, activeKey: item.path });
    }

  }

  remove = (targetKey: string) => {
    let keyIndex: number = -1;
    let activeKey = this.state.activeKey;

    // Find the index of the deleted key
    for (let i = 0; i < this.state.panes.length; i++) {
      let p = this.state.panes[i];
      if (p.key == targetKey) {
        keyIndex = i;
        break;
      }
    }

    // Remove the deleted key from the panes
    const panes = this.state.panes.filter(e => e.key != targetKey);

    // If tab removed was the first tab
    if (keyIndex == 0 && targetKey == activeKey && panes.length > 0)
      activeKey = panes[0].key;

    // If tab removed was the last tab
    if (keyIndex == panes.length && panes.length > 0)
      activeKey = panes[panes.length - 1].key

    // Disable tabs if only 1 tab remains
    if (panes.length <= 1) {
      panes.map(p => p.disabled = true);
    }

    // Update State
    this.setState({ panes, activeKey });
    this.props.history.push(activeKey);
  }

  render() {
    return (
      <div className="tab-wrapper">
        <Tabs
          hideAdd
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          onChange={this.onChange}
          className="custom-tabs"
        >
          {this.state.panes.map((pane: IPane) => <TabPane disabled={pane.disabled} tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }
}

export default withRouter(TabContainer);