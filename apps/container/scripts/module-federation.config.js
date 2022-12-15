const { dependencies } = require('../package.json');

module.exports = {
    name: 'Container',
    remotes: {
        ShowsDirectory: 'ShowsDirectory@http://localhost:3001/remoteEntry.js',
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