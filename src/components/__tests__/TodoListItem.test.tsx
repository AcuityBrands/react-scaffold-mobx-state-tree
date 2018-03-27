import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { TodoListItem } from '../TodoListItem';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
    todo: { 
      "userId": 1, "id": 1, "title": "todo1", "completed": true,
      changeComplete: jest.fn(),
      remove: jest.fn()
    }
  }, propOverrides)
  const wrapper = Enzyme.shallow(<TodoListItem {...props} />)
  return {
    props,
    wrapper
  }
}

describe('Todo List Item Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true);
  })

  it("matches the snapshot", () => {
    const { wrapper } = setup({});
    expect(wrapper).toMatchSnapshot();
  })

  it("will render a li item", () => {
    const { wrapper } = setup({});
    expect(wrapper.find("li").length).toBe(1);
  })

  it("will attempt to toggle the completed status when changed", () => {
    const { wrapper, props } = setup({});
    const spy = jest.spyOn(props.todo, "changeComplete");
    wrapper.find('Checkbox').simulate('change', {target:{checked:true}});
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  })

  it("will attempt remove the todo when the remove is confirmed", () => {
    const { wrapper, props } = setup({});
    const spy = jest.spyOn(props.todo, "remove");
    wrapper.find('Popconfirm').simulate('confirm');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  })
})