import "regenerator-runtime/runtime";
import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { Provider } from "mobx-react";
import { MemoryRouter } from "react-router-dom"
import Routes from '../../src/Routes';
import LoginPage from '../../src/containers/LoginPage';
import DashboardPage from '../../src/containers/DashboardPage';
import { AppStore, IAppStore } from '../../src/stores/AppStore';
import * as fetchMock from 'fetch-mock'

jest.mock('../../src/components/SparkChart', () => ({SparkChart: () => 'SparkChart'}));
jest.mock('../../src/components/BarChart', () => ({BarChart: () => 'BarChart'}));

Enzyme.configure({ adapter: new Adapter() });

const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 100));

let wrapper;
const setup = propOverrides => {
  const appStore = AppStore.create();
  const wrapper = Enzyme.mount(
    <Provider appStore={appStore}>
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
    </Provider>
  )
  return wrapper;
}

describe('Login process works', () => {

  beforeAll(() => {
    fetchMock.restore();
    fetchMock.mock("data/sales-data.json", {
      status: 200, body: {
        "labels": ["test"],
        "values": [1]
      }
    })
    fetchMock.mock("data/user.json", {
      status: 200, body: {
        "id": 1,
        "name": "Bob Billford"
      }
    })
    wrapper = setup({});
  })

  afterAll(() => {
    fetchMock.restore();
  })

  it("should mount the application", () => {
    expect(wrapper.exists()).toBe(true)
  })

  it("should default to the login page since we're not authenticated", () => {
    expect(wrapper.find(LoginPage)).toHaveLength(1);
  })

  it("should allow login with username and password", async() => {
    inputCredentials();
    clickLoginButton();
    await asyncFlush();
    wrapper.update();
    expect(wrapper.find(DashboardPage)).toHaveLength(1);
  })
});

const clickLoginButton = () => {
  const button = wrapper.find(".login-form-button").at(1)
  button.simulate('submit');
}

const inputCredentials = () => {
  const userInput = wrapper.find("#username").at(1);
  const passwordInput = wrapper.find("#password").at(1);
  setValue(userInput, "user");
  setValue(passwordInput, "pass");
}

const setValue = (enzymeNode, value) => {
  enzymeNode.simulate('change', { target: { value } });
};