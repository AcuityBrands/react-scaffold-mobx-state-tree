import { types, getParent, destroy, flow, getSnapshot } from "mobx-state-tree"
import { createHistory } from './History'

export type ITodoItem = typeof TodoItem.Type;
export type ITodoStore = typeof TodoStore.Type;

// A TodoItem contains the information describing a Task
export const TodoItem = types
  .model("Todo", {
    userId: types.optional(types.number, 1),
    id: types.number,
    title: types.string,
    completed: types.optional(types.boolean, false)
  })
  .actions(self => ({
    // Change title given a new title
    changeLabel(newLabel: string) {
      self.title = newLabel;
    },
    // Change the completed value given a new completed value
    changeComplete(newValue: boolean) {
      self.completed = newValue;
    },
    // Navigate up dependence tree two levels and remove self from tree
    remove() {
      // Level 1 = array of todos
      // Level 2 = todo store
      getParent(self, 2).remove(self);
    },
    // Use mobx generator function to create synchronous async action
    // Similiar to async / await
    // This method mocked for reference only - never used in the app
    save: flow(function* save() {
      try {
        yield window.fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(getSnapshot(self))
        })
      } catch (ex) {
        console.warn("Unable to save todo", ex)
      }
    })
  }))

// A TodoStore's primary responsibility is to store an array of TodoItems
// This model is composed of the typical stuff (models, actions, views)
// But also a generic history class that allows undo and redo actions
export const TodoStore = types.compose(types
  .model("TodoStore", {
    todos: types.optional(types.array(TodoItem), []),
    loading: types.optional(types.boolean, false)
  })
  .actions(self => ({
    // Add todo to todo array
    add(todo: ITodoItem) {
      self.todos.push(todo);
    },
    // Remove todo from todo array
    remove(todo: ITodoItem) {
      destroy(todo);
    },
    // Load contrived todo suggestions into todo array
    // Adding randomized id to avoid React 'key' errors
    getSuggestions: flow(function* getSuggestions(count: number) {
      self.loading = true;
      try {
        const response = yield window.fetch('data/todos.json');
        const todos = yield response.json();

        // Grab requested number since service returns 200 records
        const slice = todos.slice(0, count); 

        // Randomize the ID
        slice.map((item: ITodoItem) => { 
          item.id = Math.floor(Math.random() * 100000000)
        })

        self.todos.push(...slice);
        self.loading = false;
      } catch (ex) {
        console.error("Error while loading suggestions:", ex);
        self.loading = false;
      }
    })
  }))
  .views(self => {
    // View functions wrapped in literal to allow referencing 
    // internal properties from within other functions
    // Only works if accessed property is a getter using 'get'
    // Other options found here: https://github.com/mobxjs/mobx-state-tree#lifecycle-hooks-for-typesmodel
    const vx = {
      get todoCount() {
        return self.todos.length;
      },
      get completedCount() {
        return self.todos.filter(todo => todo.completed == true).length;
      },
      get completedPct() {
        if (vx.todoCount == 0) return 0;
        return Math.floor((vx.completedCount / vx.todoCount) * 100);
      }
    }
    return vx;
  }),
  createHistory(["/loading"])
)