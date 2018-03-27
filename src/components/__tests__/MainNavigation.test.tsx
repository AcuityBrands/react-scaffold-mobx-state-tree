import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { MainNavigation } from '../MainNavigation';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
    match: {},
    location: {},
    history:{
      listen: jest.fn()
    },
    config: [
      { key: "1", path: "/dashboard", icon: "test", label: "test", component: "test"},
      { key: "2", path: "/xxx", icon: "test", label: "test", component: "test"}
    ]
  }, propOverrides)
  const wrapper = Enzyme.shallow(<MainNavigation {...props} />)
  return {
    props,
    wrapper
  }
}

describe('Main Navigation Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper, props} = setup({});
    expect(wrapper.exists()).toBe(true);
  })

  it("matches the snapshot", () => {
    const { wrapper } = setup({});
    expect(wrapper).toMatchSnapshot();
  })

  it("always renders a Menu", () => {
    const { wrapper } = setup({});
    const menu = wrapper.find("Menu");
    expect(menu.length).toBeGreaterThan(0);
  });

  it("sets the selected key based off the location", () => {
    const { wrapper } = setup({location:{pathname:"/dashboard"}});
    expect(wrapper.instance().selectedKeys.length).toBe(1);
  });

  it("does not select a key if no key is found", () => {
    const { wrapper } = setup({location:{pathname:"/garbage"}});
    expect(wrapper.instance().selectedKeys.length).toBe(0);
  });

  it("should create a menu item for each item in config", () => {
    const { wrapper } = setup({});
    const items = wrapper.find("Menu").children();
    expect(items.length).toBe(2);
  });

  it("should create a divider if component == 'Divider'", () => {
    const { wrapper } = setup({config:[
      { key: "2", path: "/xxx", icon: "test", label: "test", component: "Divider"}
    ]});
    expect(wrapper.find("Menu").children().length).toBe(1);
    expect(wrapper.find(".nav-divider").length).toBe(1);
  });
})