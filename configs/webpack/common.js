// shared config (dev and prod)
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
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
  performance: {
    hints: false,
  },
};
