import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import AboutPage from '../src/containers/AboutPage';

Enzyme.configure({ adapter: new Adapter() });

let wrapper:any;

describe('AboutPage Component', () => {
  beforeEach(() => {
    wrapper = Enzyme.shallow(<AboutPage/>)
  })
  
  // Minimal component test confirms component rendered
  it("can render", () => {
    expect(wrapper.exists()).toBe(true)
  })
})