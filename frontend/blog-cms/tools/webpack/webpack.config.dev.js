const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const fs = require('fs');

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  target: 'web',
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    crossOriginLoading: 'anonymous', // enable cross-origin loading of chunks
    publicPath: '/',
  },
  plugins: require('./webpack.plugins')(true),
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'],
    alias: require('./webpack.aliases'),
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: require.resolve('https-browserify'),
      stream: false,
      crypto: require.resolve('crypto-browserify'),
      'crypto-browserify': require.resolve('crypto-browserify'),
      querystring: require.resolve('querystring-es3'),
    },
  },
  // stats: 'errors-warnings',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 8001,
    hot: true,
    historyApiFallback: true,
    server: 'https',
    // open: true,
    watchFiles: {
      paths: ['**/*'],
      options: {
        ignored: [
          '**/node_modules',
          '**/dist',
          '**/.webpack',
          '**/.serverless',
        ],
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
};
