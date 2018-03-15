import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import TodoPage from '../TodoPage';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
    appStore: {
      todoStore: {
        todos:[],
        undo: jest.fn(),
        redo: jest.fn(),
        add: jest.fn(),
        getSuggestions: jest.fn()
      }
    }
  }, propOverrides)

  // We dive once to the actual component because this page
  // is wrapped in a HOC by the mobx injection
  const wrapper = Enzyme.shallow(<TodoPage {...props} />).dive()

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

  it("can undo actions when the undo button is clicked", () => {
    const { wrapper, props } = setup({});
    const spy = jest.spyOn(props.appStore.todoStore, "undo")
    wrapper.find(".todo-undo-button").simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  })

  it("can redo actions when the redo button is clicked", () => {
    const { wrapper, props } = setup({});
    const spy = jest.spyOn(props.appStore.todoStore, "redo")
    wrapper.find(".todo-redo-button").simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  })

  it("will attempt to add tasks to store when input", () => {
    const { wrapper, props } = setup({});
    const spy = jest.spyOn(props.appStore.todoStore, "add");
    wrapper.find(".todo-input").simulate('search', 'test');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  })

  it("will load suggestions if requested", () => {
    const { wrapper, props } = setup({});
    const spy = jest.spyOn(props.appStore.todoStore, "getSuggestions");
    wrapper.find(".todo-get-suggestions").simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  })
})