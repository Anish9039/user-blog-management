const path = require('path');

module.exports = {
  // Other Webpack config...
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
    },
  },
};
