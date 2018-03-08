import * as React from "react";
import Loading from '../components/Loading';
const Loadable = require('react-loadable');

export const LazyDashboard = Loadable({
  loader: () => import(/* webpackChunkName: 'dashboard' */ './DashboardPage'),
  loading: Loading,
  timeout: 10000
});