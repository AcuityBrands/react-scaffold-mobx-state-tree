import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import LoginPage from '../LoginPage';

Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
    appStore: {
      login: jest.fn()
    },
    location: {
      from: { pathname: "/" }
    }
  }, propOverrides)

  // Typically we'll shallow mount the component, but because this is a HOC
  // there are too many dependencies to mock.  So using a full mount.
  const wrapper = Enzyme.mount(<LoginPage {...props} />);
  
  return {
    props,
    wrapper,
  }
}

describe('Login Component', () => {
  it("can render", () => {
    const { wrapper } = setup({});
    expect(wrapper.exists()).toBe(true)
  })

  it("should attempt to login when button is clicked", () => {
    const { wrapper, props} = setup({});

    // Find the inner component since the LoginPage is a Higher Order Component
    // wrapped in a form HOC
    const comp = wrapper.find("LoginPage");

    // Mock the login method we're spying on
    comp.instance().login = jest.fn();

    // Create spy on the login method
    const spy = spyOn(comp.instance(), "login");

    // Update the instance with the spy info
    comp.instance().forceUpdate();

    // Find the button we're testing and simulate a submit
    wrapper.find('.login-form-button').first().simulate('submit');

    // Assert that our login function was called
    expect(spy).toHaveBeenCalled();
  })
})