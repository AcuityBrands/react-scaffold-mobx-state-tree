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

Although not fully covered, this application also includes the framework(s) necessary to construct unit tests.

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

---

## Installation

It is assumed you already have a node package manager installed (NPM or Yarn).  This application was developed using the Yarn package manager.  To install, download the repository and execute the following:

- `yarn (or npm) install`

## Running

By default, running the application will start an instance of the WebPack Development Server on localhost:8080.  This application also features compatibility with HMR [Hot Module Reloading] and will automatically update without full refresh when source files are saved.  [More information on HMR.](https://webpack.js.org/concepts/hot-module-replacement/_)

**Important**: Depending on your preferred development style, you may want to modify the souce-map type specified in the _webpack.dev.js_ file.  For full source-map support, you may choose to use `devtool: source-map`.  However, for the fastest compiles, you may opt for `devtool: none`.  React itself does a fairly decent job of identify the source file of errors and you may opt for faster compile times during development (default). [More on source-map options.](https://webpack.js.org/configuration/devtool/)

- `yarn (or npm) run dev`

## Building

Building the application may not be compatible with every operating system.  Most Windows command prompts will choke when you set environment variables with `NODE_ENV=production`.

- `yarn (or npm) run build`

## Testing

- `yarn (or npm) run test`



