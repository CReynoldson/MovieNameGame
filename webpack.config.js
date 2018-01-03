const webpack = require('webpack');
const path = require('path');

let appName = 'MovieNameGame'
const entryPoint = './src/main.js'
const exportPath = path.resolve(__dirname, './build')

let plugins = []
let env = process.env.WEBPACK_ENV;

if (env === 'production') {
  let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

  plugins.push(new UglifyJsPlugin({minimize: true}))
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }))
  appName = appName + '.min.js';
} else {
  appName = appName + '.js'
}

module.exports = {
  entry: entryPoint,
  output: {
    path: exportPath,
    filename: appName
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins
}