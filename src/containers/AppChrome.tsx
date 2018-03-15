/**
 * AppChrome Container
 * 
 * Primary layout of the application chrome
 */
import * as React from "react";
import { observable } from "mobx";
import { inject, Provider, observer } from "mobx-react";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { IAppStore } from '../stores/AppStore'
import MainNavigation from '../components/MainNavigation';
import TabContainer from './TabContainer';
import { Layout, Input, Menu, Icon, Avatar, Badge, Dropdown } from 'antd';

import { DashboardPage } from './DashboardPage'
import { LazyAbout } from './LazyAbout'
import { LazyTodo } from './LazyTodo'

const { Header, Sider, Content, Footer } = Layout;
const Search = Input.Search;

// This configuration is used for both the left menu as well as
// the tab engine
const tabConfig = [
  { key: "1", path: "/dashboard", icon: "line-chart", label: "Dashboard", component: <DashboardPage/>},
  { key: "2", path: "/task", icon: "check-circle-o", label: "Tasks", component: <LazyTodo/>},
  { key: "3", component: "Divider"},
  { key: "4", path: "/about", icon:"info-circle-o", label: "About App", component: <LazyAbout/>}
]

interface IChromeProps {
  appStore: IAppStore,
  match: any,
  location: any,
  history: any
}

@inject("appStore") @observer
class AppChrome extends React.Component<IChromeProps, any> {
  @observable collapsed:boolean = false;

  // Primary header menu
  private menu = (
    <Menu style={{ background: '#fff' }}>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#"><Icon type="profile" /> Manage Profile</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="javascript:void(0)" onClick={() => { this.logout() }}><Icon type="lock" /> Sign Out</a>
      </Menu.Item>
    </Menu>
  )

  toggle = () => {
    this.collapsed = !this.collapsed
  }

  logout = () => {
    this.props.appStore.logout();
    this.props.history.push("/login");
  }

  render() {
    return (
      <Layout>

        <Sider trigger={null} collapsible collapsed={this.collapsed}>
          <div className="logo" />
          <MainNavigation config={tabConfig}></MainNavigation>
        </Sider>

        <Layout>

          <Header className="header">
            <div className="hbox align-center">
              <div className="icon-button" onClick={this.toggle}>
                <Icon
                  className="trigger"
                  type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
              </div>
              <Search
                placeholder="Find Something Interesting"
                className="bump"
                style={{ width: 300, height: 40 }}
              />
            </div>
            <div className="hbox align-center">
              <div className="icon-button">
                <Icon type="mail" />
              </div>
              <Dropdown overlay={this.menu}>
                <div className="icon-button">
                  <Avatar icon="user" />
                </div>
              </Dropdown>
            </div>
          </Header>

          <Content>
            <TabContainer config={tabConfig}></TabContainer>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Acuity Technology Group 2018 ©, All Rights Reserved</Footer>

        </Layout>
      </Layout>
    )
  }
}

export default withRouter(AppChrome);