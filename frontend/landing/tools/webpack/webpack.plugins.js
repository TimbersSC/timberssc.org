const webpack = require('webpack');
const { inDev } = require('./webpack.helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const IgnoreNotFoundExportPlugin = require('./plugins/ignoreNotFoundExportPlugin');

module.exports = (isDevelopment) => {
  return [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          // Copy content from `./public/` folder to our output directory
          context: './public/',
          from: '**/*',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin(),
    inDev() && new webpack.HotModuleReplacementPlugin(),
    inDev() && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // favicon: 'assets/images/logo.png',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].chunk.css',
    }),
    new IgnoreNotFoundExportPlugin(),
    new webpack.DefinePlugin({
      process: { env: { IS_LOCAL: isDevelopment } },
    }),
  ].filter(Boolean);
};
