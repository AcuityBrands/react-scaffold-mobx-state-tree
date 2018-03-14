/**
 * MainNavigation Component
 * 
 * This component will listen for changes to the router location
 * and highlight the appropriate menu keys appropriately
 * Creates a set of menu items for the left side of dashboard
 * 
 * WARNING: Dependent on DOM router
 */

import * as React from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import MenuItem from "antd/lib/menu/MenuItem";

interface IMainNavProps {
  match: any,
  location: any,
  history: any,
  config: any
}

interface IMenuItem {
  key: string,
  path: string,
  icon: string,
  label: string
}

// This class has both a default export as well class export.  The default export
// is wrapped with router.  The class export is used strictly for testing

export class MainNavigation extends React.Component<IMainNavProps, undefined>{
  selectedKeys:Array<string> = []; // Array of the currently selected key(s)
  unlisten:any; // Disposer used to disconnect from router changes when component unmounts

  componentDidMount() {
    // Create listener to the route and change selected key on change
    this.selectKey(this.props.location);
    this.unlisten = this.props.history.listen((location:any, action:any)=>{
      this.selectKey(location);
    });
  }

  selectKey = (location:any) => {
    this.selectedKeys = [];
    this.props.config.map(i => {
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
        {this.props.config.map((i) => {
          if(i.component == "Divider") {
            return <Menu.Divider className="nav-divider" key={i.key}/>
          } else {
            return <Menu.Item key={i.key}>
              <Link to={i.path}><Icon type={i.icon} /><span>{i.label}</span></Link>
            </Menu.Item>
          }
        })}
      </Menu>
      );
    }
  }
  
  export default withRouter(MainNavigation);