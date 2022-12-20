const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'NextHostAndRemote',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Alert': './components/Alert',
          './Banner': './components/Banner'
        },
        remotes: {
          Reviews: 'Reviews@http://localhost:3002/_next/static/chunks/remoteEntry.js',
        },
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