import * as React from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import MainNavigation from './components/MainNavigation'
import DashboardPage from './containers/DashboardPage'
import TodoPage from './containers/TodoPage'
import NotFoundPage from './containers/NotFoundPage'
import AboutPage from './containers/AboutPage'
import { IAppStore } from './models/AppStore'
import { Provider } from "mobx-react";
import Breadcrumbs from './components/Breadcrumbs';

import { Layout, Menu, Icon, Avatar, Badge, Dropdown } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#"><Icon type="profile" /> Manage Profile</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#"><Icon type="lock" /> Sign Out</a>
    </Menu.Item>
  </Menu>
);

interface IAppProps {
  appStore: IAppStore
}

// This page creates the basic layout of the application
// along with the various routes (pages) used within the app.

export default class App extends React.Component<IAppProps, {}> {
  
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Layout>

        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <MainNavigation></MainNavigation>
        </Sider>

        <Layout>

          <Header className="header">
            <div className="icon-button" onClick={this.toggle}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              />
            </div>
            <div className="hbox">
              <div className="icon-button">
                <Icon type="mail" />
              </div>
              <Dropdown overlay={menu}>
                <div className="icon-button">
                  <Avatar icon="user" />
                </div>
              </Dropdown>
            </div>
          </Header>

          <Content>
            <Breadcrumbs></Breadcrumbs>
            <Provider appStore={this.props.appStore}>
              <Switch>
                <Route path='/' exact component={DashboardPage} />
                <Route path='/task' component={TodoPage} />
                <Route path='/about' component={AboutPage} />
                <Route path='*' component={NotFoundPage} />
              </Switch>
            </Provider>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Acuity Technology Group 2018 ©, All Rights Reserved</Footer>

        </Layout>
      </Layout>
    );
  }
}