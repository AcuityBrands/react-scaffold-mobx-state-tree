import "regenerator-runtime/runtime";
import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { Provider } from "mobx-react";
import { MemoryRouter } from "react-router-dom"
import Routes from './Routes';
import AppChrome from './containers/AppChrome';
import DashboardPage from './containers/DashboardPage';
import LoginPage from './containers/LoginPage';
import NotFoundPage from './containers/NotFoundPage';
import TodoPage from "./containers/TodoPage";
import AboutPage from "./containers/AboutPage";

Enzyme.configure({ adapter: new Adapter() });

// Mock the Chart component(s) since they contain a canvas element
// that doesn't play well with Enzyme's virtual DOM (JSDOM)
jest.mock('./components/SparkChart', () => ({SparkChart: () => 'SparkChart'}));
jest.mock('./components/BarChart', () => ({BarChart: () => 'BarChart'}));

const setup = propOverrides => {
  const props = Object.assign({
    appStore: {
      userStore: {},
      todoStore: {},
      chartStore: { salesData: { labels: [], values: [] } }
    },
    initialEntries: ['/']
  }, propOverrides);

  // Mounts the application using a memory router so I can
  // simulate the router as necessary
  const wrapper = Enzyme.mount(
    <Provider appStore={props.appStore}>
      <MemoryRouter initialEntries={props.initialEntries}>
        <Routes />
      </MemoryRouter>
    </Provider>
  )
  return {
    wrapper
  }
}

const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 100));

describe('Routes [App] Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true)
  })

  it("invalid path should redirect to 404", () => {
    const { wrapper } = setup({ initialEntries: ['/test'] });
    expect(wrapper.find(AppChrome)).toHaveLength(0);
    expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  })

  it("should redirect to login if not authenticated", () => {
    const { wrapper } = setup({ initialEntries: ['/'] });
    expect(wrapper.find(AppChrome)).toHaveLength(0);
    expect(wrapper.find(LoginPage)).toHaveLength(1);
  })

  it("should render the application chrome with dashboard if authenticated", () => {
    const { wrapper } = setup({
      appStore: {
        userStore: { user: { id: 1, name: "Bob Billford" }, isAuthenticated: true, authenticating: false },
        chartStore: { salesData: { labels: [], values: [] } }
      },
      initialEntries: ['/']
    });
    expect(wrapper.find(DashboardPage)).toHaveLength(1);
  })

  it("should render the todo page (if authenticated)", async() => {
    
    const { wrapper } = setup({
      appStore: {
        todoStore: {todos: [{userId: 1, id: 1, title: "test", completed: false}], loading: false},
        userStore: { user: { id: 1, name: "Bob Billford" }, isAuthenticated: true, authenticating: false },
        chartStore: { salesData: { labels: [], values: [] } }
      },
      initialEntries: ['/task']
    });

    await asyncFlush();
    wrapper.update(); // Update the wrapper since it has been asynchronously changed
    expect(wrapper.find(TodoPage)).toHaveLength(1);
  })

  it("should render the about page (if authenticated)", async() => {
    const { wrapper } = setup({
      appStore: {
        todoStore: {todos: [{userId: 1, id: 1, title: "test", completed: false}], loading: false},
        userStore: { user: { id: 1, name: "Bob Billford" }, isAuthenticated: true, authenticating: false },
        chartStore: { salesData: { labels: [], values: [] } }
      },
      initialEntries: ['/about']
    });

    await asyncFlush();
    wrapper.update(); // Update the wrapper since it has been asynchronously changed
    expect(wrapper.find(AboutPage)).toHaveLength(1);
  })
})