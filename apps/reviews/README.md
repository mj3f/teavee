This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

# Module Federation
[https://github.com/module-federation/nextjs-mf/tree/main/packages/nextjs-mf](Link here)

Steps to get a NextJS remote app to load within a CRA host app:
- Install the following package into the next app `@module-federation/nextjs-mf`
- Insert the following into the next.config.js file:
`const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

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
};`

Make sure of the following:
1. The filename has the 'static/chunks/' prefix - as the entry point is defined within the .next/ folder.
2. The remotes & exposes sections are defined, even if empty, as they are both required, regardless if the app is a host or remote.
3. skipSharingNextInterals is set to true. This is important if the container app is not a next app, as you will run into errors otherwise.
4. In the container apps 'remotes' section, make sure the path to the remoteEntry file is '_next/static/chunks/remoteEntry.js'.

- To get css styling from a next app working in the CRA container app, you will need to add the following line inside `public/index.html` in the container app: `<noscript id="__next_css__DO_NOT_USE__"></noscript>`