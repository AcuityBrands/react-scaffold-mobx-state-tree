import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import AboutPage from '../AboutPage';

Enzyme.configure({ adapter: new Adapter() });

let wrapper:any;

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)
  const wrapper = Enzyme.shallow(<AboutPage {...props} />)
  return {
    props,
    wrapper
  }
}

describe('AboutPage Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true)
  })
})