import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { TabContainer } from '../TabContainer';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
    config: [
      { key: "1", path: "/dashboard", icon: "line-chart", label: "Dashboard", component: "Dashboard"},
      { key: "2", path: "/task", icon: "check-circle-o", label: "Tasks", component: "Todo"},
      { key: "3", component: "Divider"},
      { key: "4", path: "/about", icon:"info-circle-o", label: "About App", component: "About"}
    ],
    location: {
      pathname: "/dashboard"
    },
    history: {
      listen: jest.fn()
    }
  }, propOverrides)
  const wrapper = Enzyme.shallow(<TabContainer {...props} />);
  return {
    props,
    wrapper
  }
}

describe('TabContainer Component', () => {

  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true)
  })

  it("contains a root Tab component", () => {
    const { wrapper } = setup({});
    expect(wrapper.find('Tabs').length).toBe(1);
  })

  it("will create a pane if location matches config", () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find("TabPane").children().length).toBe(1);
  })

  it("will not create a pane if location does not match config", () => {
    const { wrapper, props } = setup({location:{pathname:"/garbage"}});
    expect(wrapper.find("TabPane").children().length).toBe(0);
  })

  it("will maintain the active key (active tab)", () => {
    const { wrapper, props } = setup({});
    expect(wrapper.instance().activeKey).toEqual("/dashboard");
  })
})