const { dependencies } = require('../package.json');

module.exports = {
    name: 'Container',
    exposes: {
        './App': './src/App'
    },
    shared: {
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