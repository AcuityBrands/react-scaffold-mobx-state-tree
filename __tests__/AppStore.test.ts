import { AppStore, IAppStore} from '../src/stores'
import * as fetchMock from 'fetch-mock'

let appStore:IAppStore;

beforeEach(() => {
  fetchMock.restore();

  fetchMock.mock("data/sales-data.json", {
    status: 200,
    body: {
      "labels":["test"],
      "values":[1]
    }
  })

  appStore = AppStore.create({
    userStore:{},
    chartStore:{},
    todoStore:{todos:[{
      id: 1,
      title: "Test Todo",
    }]
  }});
})

afterAll(() => {
  fetchMock.restore();
})

it("can create an instance of the app store with default values", () => {
  expect(appStore.todoStore.todos.length).toBe(1);
  expect(appStore.userStore.user.id).toBe(-1);
  expect(appStore.chartStore.salesData.values[0]).toBe(1);
})