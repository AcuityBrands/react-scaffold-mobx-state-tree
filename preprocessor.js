const tsc = require('typescript');  
const tsConfig = require('./testconfig.json');

// This file compiles the typescript to javascript
// to be used with the jest engine

module.exports = {  
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return tsc.transpile(
        src,
        tsConfig.compilerOptions,
        path,
        []
      );
    }
    return src;
  },
};