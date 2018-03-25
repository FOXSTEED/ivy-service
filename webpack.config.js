const webpack = require('webpack');
const path = require('path');


// BUILD_DIR represents the directory path of the bundle file output.
// originally 'src/client/public'
const BUILD_DIR = path.resolve(__dirname, 'client/public');

// APP_DIR holds the directory path of the React application's codebase.
const APP_DIR = path.resolve(__dirname, 'client/app');

const common = {
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
    ],
  },
};



const client = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  }
}

const server = {
  entry: `${APP_DIR}/index-server.jsx`,
  target: 'node',
  output: {
    path: BUILD_DIR,
    filename: 'bundle-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
]
