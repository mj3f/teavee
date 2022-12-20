# TeaVee
Demo app to test mono repo and module federation with a collection of react apps.

## Structure
This project is a monorepo using [Turborepo](https://turbo.build/repo/docs), and consists of several react web applications, built with create-react-app and NextJS.

The container application is the 'host' app that loads in micro-frontends using module federation. This was built using create-react-app.

The shows-directory application is a 'remote' app, that exposes it's main component to be loaded into the container as a micro-frontend. This was built using create-react-app.

The reviews application is a 'remote' app, similar to shows-directory, however this was built using NextJS. The process to get module federation working with NextJS is a little different, and is documented
within the reviews project [README.md](./apps/reviews/README.md) file.

### Project-specific documentation
Refer to each indiviudal projects README for additional information:
- [container (CRA host)](./apps/container/README.md)
- [shows-directory (CRA remote)](./apps/shows-directory/README.md)
- [reviews (NextJS remote)](./apps/reviews/README.md)

## CRA and shared UI components
To make use of the turborepo feature of sharing functions/components/etc and using them in a create-react-app project, since in cra you cannot normally import components (jsx) from outside the src/ directory, you need to follow the steps below to get this working:

[Link for more information](https://github.com/vercel/turbo/issues/360#issuecomment-1013885148)

Specifically:

  1. Install npm i tsup -D to UI project (docs)
    In UI's package.json configure build and dev scripts to compile output (to /dist directory):

    "build": "tsup src/index.tsx --format esm,cjs --dts --external react",
    "dev": "tsup src/index.tsx --format esm,cjs --watch --dts --external react",

  2. In UI's package.json, update source file locations to match this /dist location:

    "main": "./dist/index.js",
    "module": "./dist/index.mjs",
    "types": "./dist/index.d.ts",

  3. In your CRA package.json, ensure you are importing the ui library:

    "dependencies": {
        ...
        "ui": "*"
    },

  4. Import and use components as usual:

    import { Button } from "ui";

    const Home: FC = (props) => {
      return (
        <div>
          <Button />
        </div>
      );
    };

Updates to UI components will automatically update and refresh the CRA, whereas a change to the Remix codebase is necessary to recompile and display modifications.

NOTE: You need to run `npm run build` on the ui library to generate the dist folder.

---

# Turborepo starter

This is an official npm starter turborepo.

## What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
npm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
