import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { SparkChart } from '../SparkChart';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  let spy
  const props = Object.assign({
    id: 'hello',
    label: 'test',
    height: 50,
    renderSpeed: 500
  }, propOverrides)
  const wrapper = Enzyme.shallow(<SparkChart {...props} />)
  return {
    props,
    wrapper
  }
}

describe('SparkChart Component', () => {
  beforeEach(() => {
    // Mock constructing the chart since we don't have full access to 
    // a canvas element with Jest.
    SparkChart.prototype.renderChart = jest.fn();
    SparkChart.prototype.randomizeData = jest.fn();
  });

  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper, props } = setup({});
    expect(wrapper.exists()).toBe(true);
  })

  it("matches the snapshot", () => {
    const { wrapper } = setup({});
    expect(wrapper).toMatchSnapshot();
  })

  it("will create a canvas element for the chart", () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find('canvas').length).toBe(1);
  })

  it("will create and render the chart config on startup", () => {
    const spy = jest.spyOn(SparkChart.prototype, "renderChart")
    const { wrapper, props } = setup({});
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  })
})