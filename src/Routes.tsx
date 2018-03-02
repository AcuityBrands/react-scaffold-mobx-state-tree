import * as React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage, AppChrome, NotFoundPage } from './containers';
import { PrivateRoute } from './components';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (<Redirect to="/dashboard" />)} />
        <Route path='/login' component={LoginPage} />
        <PrivateRoute path='/dashboard' component={AppChrome} />
        <PrivateRoute path='/task' component={AppChrome} />
        <PrivateRoute path='/about' component={AppChrome} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    )
  }
}

export default Routes;