// production config
const merge = require('webpack-merge');
const {resolve} = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: '../index.ts',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, '../../lib'),
    library: 'RequestApiJs',
    publicPath: '/',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(resolve(__dirname, '../../lib'), {
      root: resolve(__dirname, '../../')
    }),
  ],
});
