import * as React from "react";
import { DashboardPage, TodoPage, AboutPage } from './containers';

export interface IPathItem {
  key: string,
  path: string,
  label: string,
  icon: string,
  component: any
}

export const PathConfig = [
  { key:"1", path: "/dashboard", label: "Dashboard", icon: "line-chart", component: DashboardPage},
  { key:"2", path: "/task", label: "Tasks", icon: "check-circle-o", component: TodoPage},
  { key:"3", path: "", label: "", icon: "", component: "divider"},
  { key:"4", path: "/about", label: "About App", icon: "info-circle-o", component: AboutPage}
]
