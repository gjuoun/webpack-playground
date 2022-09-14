const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const path = require('path')


module.exports = {
  mode: "production",
  entry: "./src/myts.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "mybundle.js"
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      { test: /\.txt/, use: 'raw-loader' },
      { test: /\.css$/, use: [ MiniCssExtractPlugin.loader ,'css-loader'] },
      { test: /\.ts$/, use: 'ts-loader' },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({filename: "[name].[hash].css"}),
    new CleanWebpackPlugin(),
    new CssMinimizerPlugin()
  ]
}
