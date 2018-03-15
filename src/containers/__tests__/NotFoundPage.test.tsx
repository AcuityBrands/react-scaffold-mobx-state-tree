import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import NotFoundPage from '../NotFoundPage';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)
  const wrapper = Enzyme.shallow(<NotFoundPage {...props} />)
  return {
    props,
    wrapper
  }
}

describe('NotFoundPage Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true)
  })
})