const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

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
      tls: require.resolve('tls-browserify'),
      net: require.resolve('net-browserify'),
      path: false,
      zlib: false,
      http: false,
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      'crypto-browserify': require.resolve('crypto-browserify'),
    },
  },
  // stats: 'errors-warnings',
  devtool: 'cheap-module-source-map',
  devServer: {
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
  externals: {
    express: 'express',
  },
};
