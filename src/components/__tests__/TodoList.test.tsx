import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { TodoList } from '../TodoList';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  let spy
  const props = Object.assign({
    todoStore: {
      todos: [
        { "userId": 1, "id": 1, "title": "todo1", "completed": true },
        { "userId": 2, "id": 2, "title": "todo2", "completed": false }
      ],
      completedCount: 1,
      todoCount: 2
    }
  }, propOverrides)
  const wrapper = Enzyme.shallow(<TodoList {...props} />)
  return {
    props,
    wrapper
  }
}

describe('Todo List Component', () => {
  // Minimal component test confirms component rendered
  it("can render", () => {
    const { wrapper, props } = setup({});
    expect(wrapper.exists()).toBe(true);
  })

  it("will render a todo list item for each todo", () => {
    const { wrapper, props } = setup({});
    const items = wrapper.find("ul").children();
    expect(items.length).toBe(2);
  })

  it("will notify the user of number of completed items", () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find("div").text()).toEqual("1 of 2 completed");
  })
})