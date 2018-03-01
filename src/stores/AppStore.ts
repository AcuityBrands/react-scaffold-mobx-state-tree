import { types, getEnv } from "mobx-state-tree"
import { ChartStore } from "./ChartStore"
import { TodoStore } from "./TodoStore"
import { UserStore } from "./UserStore"

export type IAppStore = typeof AppStore.Type

// AppStore is a store of stores.
export const AppStore = types
  .model("AppStore", {
    userStore: types.optional(UserStore, {}),
    chartStore: types.optional(ChartStore, {}),
    todoStore: types.optional(TodoStore, {})
  })
  .views(self => ({
    
  }))
  .actions(self => ({
    login() {
      return self.userStore.login();
    },
    logout() {
        return self.userStore.logout();
    },
    afterCreate() {
      //Load the sales data, but delay to simulate HTTP delay
      self.chartStore.getSales();
    }
  }))