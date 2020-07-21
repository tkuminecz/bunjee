const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: (config) => {
    const plugins = config.resolve.plugins || [];
    plugins.push(new TsConfigPathsPlugin());
    config.resolve.plugins = plugins;

    return config;
  },
};
