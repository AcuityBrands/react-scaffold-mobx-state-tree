import { types, getEnv } from "mobx-state-tree"
import { ChartStore } from "./ChartStore"
import { TodoStore } from "./TodoStore"

export type IAppStore = typeof AppStore.Type

// AppStore is a store of stores.
export const AppStore = types
  .model("AppStore", {
    chartStore: types.optional(ChartStore, {}),
    todoStore: types.optional(TodoStore, {})
  })
  .views(self => ({

  }))
  .actions(self => ({
    afterCreate() {
      //Load the sales data, but delay to simulate HTTP delay
      setTimeout(() => {
        self.chartStore.getSales();
      }, 1000);
    }
  }))