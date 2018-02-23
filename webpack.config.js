var webpack = require('webpack');
var path = require('path');


//BUILD_DIR represents the directory path of the bundle file output.
// originally 'src/client/public'
var BUILD_DIR = path.resolve(__dirname, 'client/public');

//APP_DIR holds the directory path of the React application's codebase.
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;