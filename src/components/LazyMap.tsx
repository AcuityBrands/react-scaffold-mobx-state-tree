import * as React from "react";
import Loading from './Loading';
const Loadable = require('react-loadable');

export const LazyMap = Loadable({
  loader: () => import(/* webpackChunkName: 'map' */ './Map'),
  loading: Loading,
  timeout: 10000,
  delay: 200
});