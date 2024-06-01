const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'production') {
        webpackConfig.optimization.minimizer.push(
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          })
        );
      }
      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      process.env.NODE_ENV === 'production' && 'transform-remove-console',
    ].filter(Boolean),
  },
};