// shared config (dev and prod)
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new CheckerPlugin(),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'rxjs/ajax': 'rxjs/ajax'
  },
  performance: {
    hints: false,
  },
};
