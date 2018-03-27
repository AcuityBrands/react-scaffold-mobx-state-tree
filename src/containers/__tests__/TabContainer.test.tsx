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
      listen: jest.fn(),
      push: jest.fn()
    }
  }, propOverrides)
  const wrapper = Enzyme.shallow(<TabContainer {...props} />);
  return {
    props,
    wrapper,
    tabs: wrapper.find("Tabs")
  }
}

describe('TabContainer Component', () => {

  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true)
  })

  it("matches the snapshot", () => {
    const { wrapper } = setup({});
    expect(wrapper).toMatchSnapshot();
  })

  it("contains a root Tab component", () => {
    const { wrapper, tabs } = setup({});
    expect(tabs.length).toBe(1);
  })

  it("will create a pane if location matches config", () => {
    const { wrapper, props, tabs } = setup({});
    expect(tabs.children().length).toBe(1);
  })

  it("will not create a pane if location does not match config", () => {
    const { wrapper, props, tabs } = setup({location:{pathname:"/garbage"}});
    expect(tabs.children().length).toBe(0);
  })

  it("remove a pane if removed via click", () => {
    const { wrapper, props, tabs } = setup({});
    tabs.simulate('edit', "/dashboard", "remove");
    // Calling these in this specific order to force a re-render
    // https://github.com/airbnb/enzyme/issues/1229
    wrapper.instance().forceUpdate();
    wrapper.update();
    // =========================================
    expect(wrapper.find("Tabs").children().length).toBe(0);
  })
})