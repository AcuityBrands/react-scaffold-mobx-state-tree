import { types, getParent, destroy, flow, getSnapshot } from "mobx-state-tree"

export type IUserStore = typeof UserStore.Type;

export const User = types
  .model("User", {
    id: types.optional(types.number, -1),
    name: types.optional(types.string, '')
  })

export const UserStore = types
  .model("UserStore", {
    user: types.optional(User,{}),
    isAuthenticated: types.optional(types.boolean, false),
    authenticating: types.optional(types.boolean, false)
  })
  .actions(self => ({
    // Load contrived sales data into store
    login: flow(function* authenticateUser(username?: string, password?: string) {
      self.authenticating = true;
      try {
        const response = yield window.fetch('data/user.json');
        const data = yield response.json();
        self.user = User.create(data);
        self.authenticating = false;
        self.isAuthenticated = true;
      } catch (ex) {
        console.error("Error while loading user data:", ex);
        self.authenticating = false;
      }
    }),
    logout: () => {
      self.isAuthenticated = false;
    }
  }))
