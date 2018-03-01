/**
 * Primary Navigation Menu
 * 
 * This component will listen for changes to the router location
 * and highlight the appropriate menu keys appropriately
 * 
 * Warning: Dependent on dom router
 */

import * as React from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import MenuItem from "antd/lib/menu/MenuItem";

interface IMainNavProps {
  match: any,
  location: any,
  history: any
}

interface IMenuItem {
  key: string,
  path: string,
  icon: string,
  label: string
}

class MainNavigation extends React.Component<IMainNavProps, undefined>{
  items: Array<IMenuItem> = [
    { key: "1", path: "/dashboard", icon: "line-chart", label: "Dashboard" },
    { key: "2", path: "/task", icon: "check-circle-o", label: "Tasks" },
    { key: "3", path: "/fail", icon: "star-o", label: "Sample 404" }
  ]
  selectedKeys:Array<string> = [];
  unlisten:any;

  componentDidMount() {
    this.selectKey(this.props.location);
    this.unlisten = this.props.history.listen((location:any, action:any)=>{
      this.selectKey(location);
    });
  }

  selectKey = (location:any) => {
    this.selectedKeys = [];
    this.items.map(i => {
      if(location.pathname == i.path){
        this.selectedKeys.push(i.key);
      }
    })
  }

  componentWillUnmount() {
      this.unlisten();
  }

  render() {
    // Create the menu with menu items
    return (
      <Menu mode="inline"
        theme="dark"
        selectedKeys={this.selectedKeys}
      >
        {this.items.map((i) => {
          return <Menu.Item key={i.key}>
            <Link to={i.path}><Icon type={i.icon} /><span>{i.label}</span></Link>
          </Menu.Item>
        })}
        <Menu.Divider className="nav-divider"/>
        <Menu.Item key="99">
          <Link to="/about"><Icon type="info-circle-o" /><span>About Application</span></Link>
        </Menu.Item>
      </Menu>
      );
    }
  }
  
  //TODO: This has a dependency on the react-router
  export default withRouter(MainNavigation);