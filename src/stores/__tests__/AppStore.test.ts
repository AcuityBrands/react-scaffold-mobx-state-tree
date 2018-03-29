import "regenerator-runtime/runtime";
import { AppStore, IAppStore } from '../AppStore'
import * as fetchMock from 'fetch-mock'

let appStore: IAppStore;

describe('AppStore Model', () => {

  beforeEach(() => {
    fetchMock.restore();

    fetchMock.mock("data/sales-data.json", {
      status: 200,
      body: {
        "labels": ["test"],
        "values": [1]
      }
    })

    appStore = AppStore.create({
      userStore: {},
      chartStore: {},
      todoStore: {
        todos: [{
          id: 1,
          title: "Test Todo",
        }]
      }
    });
  })

  afterAll(() => {
    fetchMock.restore();
  })

  it("can create an instance of the app store with default values", () => {
    expect(appStore.todoStore.todos.length).toBe(1);
    expect(appStore.userStore.user.id).toBe(-1);
    expect(appStore.chartStore.salesData.values[0]).toBe(1);
  })

  it("can login via the appStore through the userStore", () => {
    //Replace the spied function with a jest mock function
    Object.defineProperty(appStore.userStore, 'login', { value: jest.fn(), writable: true });
    const spy = jest.spyOn(appStore.userStore, 'login');
    appStore.login();
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  })

  it("can logoff via the appStore through the userStore", () => {
    //Replace the spied function with a jest mock function
    Object.defineProperty(appStore.userStore, 'logout', { value: jest.fn(), writable: true });
    const spy = jest.spyOn(appStore.userStore, 'logout');
    appStore.logout();
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  })

})