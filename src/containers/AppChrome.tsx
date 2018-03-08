/**
 * AppChrome Container
 * 
 * Primary layout of the application chrome
 */
import * as React from "react";
import { inject } from "mobx-react";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Provider } from "mobx-react";
import { IAppStore } from '../stores/AppStore'
import MainNavigation from '../components/MainNavigation';
import TabContainer from './TabContainer';
import { Layout, Input, Menu, Icon, Avatar, Badge, Dropdown } from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const Search = Input.Search;

interface IChromeProps {
  appStore: IAppStore,
  match: any,
  location: any,
  history: any
}

@inject("appStore")
class AppChrome extends React.Component<IChromeProps, {}> {

  state = {
    collapsed: false,
  };

  menu = (
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
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logout = () => {
    this.props.appStore.logout();
    this.props.history.push("/login");
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
            <div className="hbox align-center">
              <div className="icon-button" onClick={this.toggle}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
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
            <TabContainer></TabContainer>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Acuity Technology Group 2018 ©, All Rights Reserved</Footer>

        </Layout>
      </Layout>
    )
  }
}

export default withRouter(AppChrome);