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
    { key: "1", path: "/", icon: "line-chart", label: "Dashboard" },
    { key: "3", path: "/task", icon: "check-circle-o", label: "Tasks" },
    { key: "4", path: "/fail", icon: "star-o", label: "Sample 404" },
  ]
  selectedKeys:Array<string> = [];

  componentDidMount() {
    //Match the current path to the menu items to preselect the selected keys
    this.items.map(i => {
      if(this.props.location.pathname == i.path){
        this.selectedKeys.push(i.key);
      }
    })
  }

  render() {
    // Create the menu with menu items
    return (
      <Menu mode="inline"
        theme="dark"
        defaultSelectedKeys={this.selectedKeys}
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