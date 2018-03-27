import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { BarChart } from '../BarChart';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  let spy
  const props = Object.assign({
    id: 'hello',
    label: 'test',
    height: 50,
    data: {
      labels: ['label'],
      values: [1]
    }
  }, propOverrides)
  const wrapper = Enzyme.shallow(<BarChart {...props} />)
  return {
    props,
    wrapper
  }
}

describe('BarChart Component', () => {
  beforeEach(() => {
    // Mock constructing the chart since we don't have full access to 
    // a canvas element with Jest.
    BarChart.prototype.renderChart = jest.fn();
  });

  it("will create a canvas element for the chart", () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find('canvas').length).toBe(1);
  })

  it("matches the snapshot", () => {
    const { wrapper } = setup({});
    expect(wrapper).toMatchSnapshot();
  })

  it("will create and render the chart config on startup", () => {
    const spy = jest.spyOn(BarChart.prototype, "renderChart")
    const { wrapper, props } = setup({});
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  })
})