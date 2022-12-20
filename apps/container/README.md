# Container
This app is a container app to load in micro-frontends via webpack module federation.
It was built using create-react-app.

## Module Federation setup
The following setup process makes use of the existing webpack config from create-react-app v5. It does not eject, nor create a custom config, though that is also a viable option. This process does involve creating a webpack module federation config file though.

### Steps
- First ensure that create-react-app (react-scripts) is version 5.
- Create a file called `bootstrap.js` inside the `src/` directory, alongside the `App.tsx` file. Move the contents of the `index.tsx` file into bootstrap, and replace the contents in index with `import(./bootstrap)`.
- Add a `scripts` folder in the root directory of the project, with the following 4 files:
    - start.js
    - build.js
    - webpack.config.js
    - module-federation.config.js

- Modify the 'start' and 'build' scripts in `package.json` to the following:

      "start": "node ./scripts/start.js",
      "build": "node ./scripts/build.js"
    
- Add the following in the `start.js` script:

       process.env.NODE_ENV = process.env.NODE_ENV || 'development';
       require('./webpack.config);
       require('react-scripts/scripts/start);

- Add the following in the `build.js` script file:

       process.env.NODE_ENV = 'production';
       require('./webpack.config');
       require('react-scripts/scripts/build');

- Add the following to the webpack.config.js file (make sure the node-polyfill-webpack-plugin is installed via `npm i`):

       const { ModuleFederationPlugin } = require('webpack').contianer;
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
                    publicPath: 'auto'
                },
            };

            return {
                ...config,
                ...configPublicPath
            };
       };

       require.cache[require.resolve(webpackConfigPath)].exports = (env) =>
            override(wepackConfig(env));

       module.exports = require(webpackConfigPath);

- Add the following to the `module-federation.config.js` file:

       const { dependencies } = require('../package.json');
       
       module.exports = {
            name: 'NameOfApp',
            remotes: {
                NameOfMicroApp: 'NameOfMicroApp@http://url:port/remoteEntry.js'
            },
            exposes: {
                './Name' : './path/to/component'
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: dependencies.react
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: dependencies['react-dom']
                },
            },
       };

