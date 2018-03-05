/**
 * PrivateRoute Component
 * 
 * Mimics the interface of a Route (from react-router-dom) and 
 * validates the user is authenticating before rendering, otherwise
 * redirects to the login route path
 */
import * as React from "react";
import { Route, Redirect } from 'react-router-dom';
import { inject } from "mobx-react";
import { IAppStore } from '../stores'

interface IPrivateRouteProps {
  path: any,
  component?: any,
  appStore?: IAppStore
}

const PrivateRoute = inject("appStore")((p:IPrivateRouteProps) => (
  <Route
    path={p.path}
    render={props =>
      p.appStore.userStore.isAuthenticated ? (
        <p.component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )}
  />
));

export default PrivateRoute