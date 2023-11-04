const { createWebpackAliases } = require('./webpack.helpers');

/**
 * Export Webpack Aliases
 *
 * Tip: Some text editors will show the errors or invalid intellisense reports
 * based on these webpack aliases, make sure to update `tsconfig.json` file also
 * to match the `paths` we using in here for aliases in project.
 */
module.exports = createWebpackAliases({
  '@public': './public',
  src: './src',
  '@config': './src/config.tsx',
  '@utils': './src/utils/index.ts',
  '@utils/*': './src/utils/*',
  '@core/*': './src/core/*',
  '@components/*': 'src/components/*',
  '@components': 'src/components/index.ts',
  '@shared/*': './src/shared/*',
  '@constants': './src/components/constants.tsx',
});
