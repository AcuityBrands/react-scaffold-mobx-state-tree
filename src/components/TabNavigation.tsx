import * as React from "react";
import { inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import { IAppStore} from '../stores';
import { DashboardPage, TodoPage, NotFoundPage, AboutPage, LoginPage, Sandbox} from '../containers';
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
  key: string
}

interface ITabState {
  activeKey: string,
  panes: Array<IPane>
}


const items = [
  { path: "/dashboard", label: "Dashboard", component: <DashboardPage />},
  { path: "/task", label: "Tasks", component: <TodoPage />},
  { path: "/about", label: "About App", component: <AboutPage />}
]

@inject("appStore")
class TabNavigation extends React.Component<ITabNavProps, {}>{
  state:ITabState
  
  private unlisten:any;
  private newTabIndex:number;

  constructor(props:any) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: '',
      panes: []
    };
  }

  componentDidMount() {
    this.renderComponent(this.props.location);
    this.unlisten = this.props.history.listen((location:any, action:any)=>{
      this.renderComponent(location);
    });
  }

  onEdit = (targetKey:string, action:string) => {
    if(action === 'remove') this.remove(targetKey);
  }

  onChange = (activeKey:string) => {
    this.setState({activeKey:activeKey});
    this.props.history.push(activeKey);
  }

  renderComponent = (location:any) => {
    const panes = this.state.panes;
    
    // Determine if tab is already open
    // if so, set the active tab to the open tab
    for(let x = 0; x < panes.length; x++) {
      let p = panes[x] as IPane;
      if(p.key === location.pathname) {
        this.setState({activeKey:p.key});
        return false;
      }
    }

    // Lookup the pane content given the
    // router location
    let item;
    let pathFound:boolean = false;
    for(let i = 0; i < items.length; i++) {
      item = items[i];
      if(item.path === location.pathname) {
        pathFound = true;
        break;
      }
    }

    // If the path is found, create a new tab
    if(pathFound){
      panes.push({ title: item.label, content: item.component, key: item.path });
      this.setState({ panes, activeKey:item.path });
    }
    
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
          {this.state.panes.map((pane:IPane) => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }  
}
  
export default withRouter(TabNavigation);