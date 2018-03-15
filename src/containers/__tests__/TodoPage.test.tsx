import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import TodoPage from '../TodoPage';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
    appStore: {
      todoStore: {
        todos:[]
      }
    }
  }, propOverrides)
  const wrapper = Enzyme.shallow(<TodoPage {...props} />)
  return {
    props,
    wrapper
  }
}

describe('TodoPage Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true)
  })
})