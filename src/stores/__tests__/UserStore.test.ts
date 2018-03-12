import { UserStore, IUserStore } from '../UserStore'
import * as fetchMock from 'fetch-mock'

let userStore: IUserStore;

describe('UserStore Model', () => {
  beforeEach(() => {
    fetchMock.restore();

    fetchMock.mock("data/user.json", {
      status: 200,
      body: {
        "id": 1,
        "name": "Bob Billford"
      }
    })

    userStore = UserStore.create({});
  })

  afterAll(() => {
    fetchMock.restore();
  })

  it("can create an instance of the user store with default values", () => {
    expect(userStore.user.id).toBe(-1);
    expect(userStore.user.name).toBe('');
  })

  it("can login", async () => {
    await userStore.login();
    expect(userStore.user.id).toBe(1);
    expect(userStore.user.name).toBe('Bob Billford');
    expect(userStore.isAuthenticated).toBe(true);
  })

  it("can logoff", async () => {
    userStore.logout()
    expect(userStore.isAuthenticated).toBe(false);
  })
})