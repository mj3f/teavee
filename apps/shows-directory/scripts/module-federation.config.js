const { dependencies } = require('../package.json');

module.exports = {
    name: 'ShowsDirectory',
    exposes: {
        './App': './src/App',
        './About': './src/components/About'
    },
    filename: 'remoteEntry.js',
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies.react,
        },
        'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
        },
    },
};