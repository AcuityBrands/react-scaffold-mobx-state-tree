import '../es6-polyfill'; // Import cherry picked polyfills
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"
import { onSnapshot } from 'mobx-state-tree';
import { Provider } from "mobx-react";
import { TodoStore, ITodoStore, AppStore, IAppStore } from './stores';
import Routes from './Routes';

// Import the main stylesheet which imports other stylesheets
import './../css/style.scss';

// Create default initial state for the Todo store
// Used only for demonstration purposes
let initialState = {
  todoStore: {
    todos: [
      {
        userId: 1,
        id: 1,
        title: "Create React Application",
        completed: true
      },
      {
        userId: 1,
        id: 2,
        title: "Wash the Car",
        completed: false
      }
    ]
  }
}

// Load the initial todo state from local storage if available
if (localStorage.getItem("react-starter-mst")) {
  const json = JSON.parse(localStorage.getItem("react-starter-mst")) as IAppStore;

  // Check to make sure stored model still matches model definition
  if (AppStore.is(json)) initialState = json;
}

// Create store from initial state
// The appStore is a 'store of stores'
let appStore = AppStore.create(initialState);

// Listen for changes to the store and write to storage each time tree changes
// Snapshots are "free" to obtain
onSnapshot(appStore, snapshot => {
  localStorage.setItem("react-starter-mst", JSON.stringify(snapshot))
})

// Render application
function renderApp() {
  ReactDOM.render(
    <Router>
      <Provider appStore={appStore}>
        <Routes />
      </Provider>
    </Router>,
    document.getElementById('root')
  );
}

// Listen for hot module changes
if (module.hot) {
  module.hot.accept(() => {
    renderApp();
  });
}

renderApp();