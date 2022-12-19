// or named export
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'Reviews',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Home': './pages/index.tsx',
        },
        remotes: {}, // required, but empty,
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
              singleton: true,
              requiredVersion: false,
          },
        },
        extraOptions: {
          skipSharingNextInternals: true
        }
      })
    );
    return config;
  },
};