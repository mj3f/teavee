const { ModuleFederationPlugin } = require('webpack').container;
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const webpackConfigPath = 'react-scripts/config/webpack.config';
const webpackConfig = require(webpackConfigPath);
const moduleFederationConfig = require('./module-federation.config');

const override = (config) => {
    config.plugins.push(
        new ModuleFederationPlugin(moduleFederationConfig),
        new NodePolyfillPlugin()
    );

    const configPublicPath = {
        output: {
            publicPath: 'auto',
        },
    };

    return {
        ...config,
        ...configPublicPath,
    };
};

require.cache[require.resolve(webpackConfigPath)].exports = (env) => override(webpackConfig(env));

module.exports = require(webpackConfigPath);