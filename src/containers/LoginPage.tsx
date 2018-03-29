import * as React from "react";
import { inject } from "mobx-react";
import { IAppStore } from '../stores/AppStore'
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

interface ILoginPageProps {
  appStore?: IAppStore
  form: any,
  history?:any,
  location?: any
}

interface ILoginPageState {
  redirectToReferrer: boolean
}

@inject("appStore")
class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

  login = (e:any) => {
    e.preventDefault();
    this.props.form.validateFields(async(err:any, values:Array<any>) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        await this.props.appStore.login();
        const p = this.props.location.state || { from: { pathname: "/" } };
        this.props.history.push(p.from.pathname);
      } else {
        //Todo
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-overlay">
        <div className="login-wrapper">
          <div className="login-logo">&nbsp;</div>
          <Form onSubmit={this.login} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Username is required!' }],
              })(
                <Input id="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input id="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(LoginPage);