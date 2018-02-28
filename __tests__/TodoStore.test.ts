import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree'
import { TodoItem, TodoStore, ITodoItem, ITodoStore } from '../src/models/TodoStore'
import * as fetchMock from 'fetch-mock'

afterEach(function () {
  // Restore the fetch to native implementation after each mock
  afterEach(fetchMock.restore);
})

it("can create an instance of a todo", () => {
  const todo = TodoItem.create({
    id: 1,
    title: "Test Todo",
  });

  expect(todo.title).toBe("Test Todo");
  expect(todo.completed).toBe(false);

  todo.changeLabel("New Label");
  todo.changeComplete(true);

  expect(todo.title).toBe("New Label");
  expect(todo.completed).toBe(true);
})

it("can create an instance of a todo store", () => {
  const store = TodoStore.create({
    todos: [{
      id: 1,
      title: "Test Todo"
    }]
  })

  expect(store.todos.length).toBe(1);
  expect(store.todos[0].title).toBe("Test Todo");
})

// Use async/await to test mocked api call since the mock
// returns a promise
it("can load a set of suggested todos", async () => {
  fetchMock.mock("https://jsonplaceholder.typicode.com/todos", {
    status: 200,
    body: [{
      "userId": 1,
      "id": 1,
      "title": "todo1",
      "completed": false
    }],
  })
  const store = TodoStore.create();
  await store.getSuggestions(1);
  expect(store.todoCount).toBe(1);
  expect(store.todos[0].title).toBe("todo1");
})

it("can add new todos - track snapshots", () => {
  const store = TodoStore.create();
  const states = [];

  onSnapshot(store, snapshot => {
    states.push(snapshot)
  })

  const item = TodoItem.create({
    id: 1,
    title: "Test Todo"
  })
  store.add(item);

  expect(store.todos.length).toBe(1);
  expect(store.todos[0].title).toBe("Test Todo");
  expect(getSnapshot(store)).toEqual({
    loading: false,
    todos: [{
      id: 1,
      userId: 1,
      title: "Test Todo",
      completed: false
    }]
  })
  expect(getSnapshot(store)).toMatchSnapshot();
  expect(states).toMatchSnapshot();
})

it("can add new items - track patches", () => {
  const store = TodoStore.create();
  const patches = [];

  onPatch(store, patch => {
    patches.push(patch)
  })

  store.add({
    id: 1,
    title: "Test Todo",
    completed: false
  } as ITodoItem)

  store.todos[0].changeLabel("New Label");
  expect(patches).toMatchSnapshot();
})

it("can calculate computed values", () => {
  const store = TodoStore.create({
    todos: [{
      id: 1,
      title: "Test Todo",
    }]
  })

  expect(store.todoCount).toBe(1);
  expect(store.completedCount).toBe(0);

  store.todos[0].changeComplete(true);

  expect(store.completedCount).toBe(1);
  expect(store.completedPct).toBe(100);
})