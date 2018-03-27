import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import DashboardPage from '../DashboardPage';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
    appStore: {
      userStore:{},
      todoStore:{},
      chartStore:{}
    }
  }, propOverrides)
  const wrapper = Enzyme.shallow(<DashboardPage {...props} />)
  return {
    props,
    wrapper
  }
}

describe('DashboardPage Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true)
  })

  it("matches the snapshot", () => {
    const { wrapper } = setup({});
    expect(wrapper).toMatchSnapshot();
  })
})