# Opinionated React Scaffold Application

Opinionated React starter app using mobx-state-tree for state management.  Intended to test and showcase many of the common features most commonly found in modern SPA applications, including:

* Routing, including protected and unprotected routes
* Authentication
* Predictable gridded layout
* Charting
* Map Visualization
* Asynchrounous Operations
* State Management
* State Preservation
* etc.

Although not fully covered, this application also includes the framework(s) necessary to construct unit & integration tests.

# Frameworks Used

* [Ant Design UI Components](https://ant.design/docs/react/introduce)
* [Chart.js](http://www.chartjs.org/samples/latest/)
* [MabpoxGL](https://www.mapbox.com/mapbox-gl-js/api/)
* [React](https://reactjs.org/docs/hello-world.html)
* [Mobx State Tree](https://github.com/mobxjs/mobx-state-tree)
* [Jest](https://facebook.github.io/jest/docs/en/getting-started.html)
* [Enzyme](http://airbnb.io/enzyme/docs/api/")
* [TypeScript](https://www.typescriptlang.org/docs/home.html")
* [WebPack](https://webpack.js.org/concepts/)
* [Yarn](https://yarnpkg.com/lang/en/docs/)
* [Node](https://nodejs.org/en/docs/)

Why this particular stack? The intent of this application was to create a modern AND opinionated web application stack.  Let's start at the heart of the Application.  React.

## React

With the release of React 16, Facebook introduced a new reconciliation algorithm that prioritizes different aspects of the UI thread and increases the perceived performance of the applications. This new engine (React Fiber), combined with ongoing support and advancement for mobile development (via React Native), along with a massive support community makes React a compelling choice for modern web development.

React describes itself as just the UI layer.  Some may view this as a detriment and argue that more fully featured frameworks are a better choice.  However, with the constant progression of the JavaScript community, adopting a modular approach to application development may make a more flexible future.

## Mobx State Tree

Mobx-state-tree builds on the popular state management framework Mobx and attempts to combine the best features of both immutability and mutability. Unlike Mobx itself, MST is very opinionated on how data should be structured and updated.

Another popular React framework for state management is Redux.  While both Redux and Mobx provide good state management options, Mobx abstracts away some of its complexity making it an easier library to work with for those unintiated into the Redux design patterns.

Another great feature of MST is the easy serialization/deserialization of the state tree making persistance of application state extremly straight-forward.

## TypeScript

TypeScript is a superset of Javascript.  In other words, all JavaScript is TypeScript. However, TypeScript adds some additional developer productivity support that makes it worth while to implement:

- Class and Module support
- Static type-checking
- ES6 feature support
- etc.

One of the biggest advantages of TypeScript is code completion and Intellisense. All modern IDEs available today support intellisense and can be a huge boon to developer productivity. Not to mention the static type checking that can discover errors long before the compilation phase of a project.

## Jest & Enzyme

Jest is a testing framework authored by Facebook for React applications.  It is extremely fast and provides a unique approach to unit testing via "snapshots".  Snapshots compare the current JSON representation of the DOM to a previously captured representation of the DOM and creates exceptions (failed tests) when they're not in harmony.  Snapshots can also be used in conjunction with mobx-state-tree (which can provide state snapshots) to create a fast and effective approach to both UI and state testing.

Additionally, Enzyme (authored by AirBnb) is a testing utility and provides a virtual DOM on top of the api already provided by Jest. Enzyme can be used to mount React components, simulate actions on those components, or validate that specific output is rendered in specific circumstances.  While Enzyme doesn't provide a full headless browser, its virtual DOM is generally powerful enough to provide reasonable confidence in the behavior of tested components.

Enzyme is useful for both unit and integration tests and performance very well in typical scenarios.

## WebPack

Multiple module bundling and task runner solutions exist today.  WebPack has emerged as a community favorite due to its flexibility, built in production optimization features and compatibility with it's own development server (that supports hot module reloading). 

---

## Installation

It is assumed you already have a node package manager installed (NPM or Yarn).  This application was developed using the Yarn package manager.  To install, download the repository and execute the following:

- `yarn (or npm) install`

## Running

By default, running the application will start an instance of the WebPack Development Server on `localhost:8080`.  This application also features compatibility with HMR [Hot Module Reloading] and will automatically update without full refresh when source files are saved.  [More information on HMR.](https://webpack.js.org/concepts/hot-module-replacement/_)

**Important**: Depending on your preferred development style, you may want to modify the souce-map type specified in the _webpack.dev.js_ file.  For full source-map support, you may choose to use `devtool: source-map`.  However, for the fastest compiles, you may opt for `devtool: none`.  React itself does a fairly decent job of identify the source file of errors and you may opt for faster compile times during development (default). [More on source-map options.](https://webpack.js.org/configuration/devtool/)

- `yarn (or npm) start`

## Building

- `yarn build`

## Testing

For tests with watch

- `yarn test`

For single run only

- `yarn jest`

# About Code Splitting and Lazy Loading

This application features support for code splitting and lazy loading using built-in Webpack 2+ functionality.  To accomplish this, certain components are initialized using the proposed *dynamic import* specificiation (a tc39 proposal currently at stage3). Webpack automatically identifies components imported using this specification and will create a seperate chunk for the component.

Modify the `webpack.prod.js` file to tailor bundles/chunks according to your needs.





