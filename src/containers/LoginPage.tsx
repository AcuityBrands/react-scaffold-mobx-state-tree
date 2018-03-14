import * as React from "react";
import { inject } from "mobx-react";
import { IAppStore } from '../stores/AppStore'
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

interface ILoginPageProps {
  appStore?: IAppStore
  form: any,
  location?: any
}

interface ILoginPageState {
  redirectToReferrer: boolean
}

@inject("appStore")
class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
    this.login = this.login.bind(this);
  }

  login(e:any) {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:Array<any>) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.appStore.login().then(()=>{
          this.setState(() => ({
            redirectToReferrer: true
          }))
        })
      } else {
        //Do anything?
      }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    const { getFieldDecorator } = this.props.form;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-overlay">
        <div className="login-wrapper">
          <div className="login-logo">&nbsp;</div>
          <Form onSubmit={this.login} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Username is required!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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