/**
 * Routes Component
 * 
 * Contains basic routes defined for application.
 * Notice that some routes are Public (Routes) and
 * other routes are private (PrivateRoutes).  PrivateRoutes
 * require the application state to contain a true
 * 'isAuthenticated' boolean.
 */
import * as React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import LoginPage from './containers/LoginPage'
import NotFoundPage from './containers/NotFoundPage'
import AppChrome from './containers/AppChrome';

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