const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/index.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    clean: true,
    crossOriginLoading: 'anonymous', // enable cross-origin loading of chunks
  },
  plugins: require('./webpack.plugins')(false),
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'],
    alias: {
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
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
    },
  },
  stats: 'errors-warnings',
  optimization: {
    minimize: true,
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  externals: {
    express: 'express',
  },
};
