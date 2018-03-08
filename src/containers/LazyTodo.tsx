import * as React from "react";
import Loading from '../components/Loading';
const Loadable = require('react-loadable');

export const LazyTodo = Loadable({
  loader: () => import(/* webpackChunkName: 'todo' */ './TodoPage'),
  loading: Loading,
  timeout: 10000
});