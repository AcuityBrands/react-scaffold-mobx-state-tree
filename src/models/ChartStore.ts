import { types, getParent, destroy, flow, getSnapshot } from "mobx-state-tree"

export const ChartStore = types
  .model("ChartStore", {
    salesData: types.frozen,
    loading: types.optional(types.boolean, true)
  })
  .actions(self => ({
    // Load contrived sales data into store
    getSales: flow(function* getSales() {
      self.loading = true;
      try {
        const response = yield window.fetch('data/sales-data.json');
        const data = yield response.json();
        self.salesData = data;
        self.loading = false;
      } catch (ex) {
        console.error("Error while loading sales data:", ex);
        self.loading = false;
      }
    })
  }))
