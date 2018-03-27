import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Map from '../Map';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)
  const wrapper = Enzyme.shallow(<Map {...props} />)
  return {
    props,
    wrapper
  }
}

// This test suite uses a mock class that lives inside the __mocks__
// folder.  See https://facebook.github.io/jest/docs/en/manual-mocks.html
describe('Map Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true);
  })

  it("matches the snapshot", () => {
    const { wrapper } = setup({});
    expect(wrapper).toMatchSnapshot();
  })

  it("creates a root container div", () => {
    const { wrapper } = setup({});
    const div = wrapper.find("div");
    expect(div.length).toBeGreaterThan(0);
  })
})