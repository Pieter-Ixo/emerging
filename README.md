
# [Emerging Eco App](https://app.emerging.eco/)

> ⚠️ this Readme doc is not supported anymore, because documenting continued in Swimm documentation app.

Emerging is the digital platform for low-carbon basic services. Manage your inventory of impact-generating technologies through a single interface. Capture the financial value of verified carbon emission reductions and social impacts in real-time.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
  - [pages/](#pages)
  - [components/pages/](#componentspages)
  - [components/containers/](#componentscontainers)
  - [components/modals/](#componentsmodals)
  - [components/presentational/](#componentspresentational)
  - [Other folders](#other-folders)
- [API Data](#api-data)
- [State Management](#state-management)
- [Code Formatting](#code-formatting)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)
- [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#intro)
- ssh

### Installation

1. Clone [this repository](https://github.com/emerging-eco/app)
1. Navigate to the cloned project folder.
1. To use the correct NodeJS version use: `nvm use`
1. Install dependencies with a simple terminal command: `yarn`

If you are going to contribute to the Project, install these extensions to your IDE:

1. ESLint (`dbaeumer.vscode-eslint`)
1. Prettier (`esbenp.prettier-vscode`)
1. Prettier ESLint (`rvest.vs-code-prettier-eslint`)

### Configuration

1. Request Environment variables from somebody (but they are secret).

## Running the App

To run the app locally, use the following command:

```sh
yarn dev
```

Your app should be available at `http://localhost:3000` (the address should be visible in the terminal).

## Deployment

The app is deployed on [Netlify](https://www.netlify.com/) by [Alwyn](https://github.com/alwyn-ixo) only.

## Folder Structure

First, let's review the folder structure and then go through each folder, explaining it:

```sh
emerging-eco-app/
├─ pages/
├─ components/
│  ├─ containers/
│  ├─ modals/
│  ├─ pages/
│  ├─ presentational/
├─ assets/
├─ constants/
├─ helpers/
├─ utils/
├─ theme/
├─ public/
├─ types/
├─ hooks/
```

### `pages/`

This folder is responsible for managing routing, based on [the Next.js framework](https://nextjs.org/docs/pages/building-your-application/routing). This folder should contain less logic and layout.

### `components/pages/`

The components in this folder are responsible for rendering the layout of pages and contain components, which will be rendered only on a particular page. So `components/pages/collections/` contain all components that will be rendered only on this page. If a component will be reused, it should be moved to another folder.

### `components/containers/`

The components in this folder are responsible for rendering domain-sensitive data. These components use redux a lot.

### `components/modals/`

The components in this folder are responsible for rendering elements to the root of the HTML document.

### `components/presentational/`

The components in this folder are responsible for rendering NOT domain-sensitive data. For example, the `Chart` can take any data in chart format. Components of this folder do not use redux.

### Other folders

- `assets/` - not executable files (like images).
- `types/` - domain-sensitive TypeScript types.
- `hooks/` - custom React hooks.
- `constants/` - sealed variables, sometimes defined by the `.env` variables.
- `helpers/` - contains domain-sensitive functions (like data transformations).
- `utils/` - contains NOT domain-sensitive functions that work not knowing anything about the domain (like `shortStr`).
- `public/` - [according to the framework](https://nextjs.org/docs/getting-started/installation#the-public-folder-optional) this contains files that will be served statically for all pages of the application.
- `requests/` - contains async functions requesting anything through the HTTP protocol. All requests to any API should be here.

## API Data

As was written above, all requests through the HTTP should be located in the `requests` folder.

*BlockSync* API is the main source of all collections and entities. For now, all requests to Blocksync are done with the `apisause` library and stored in `requests/blocksync.ts`.

## State Management

// TODO: write documentation after refactoring

// FIXME: [EMERGING-168 Refactor Redux](https://ixo.youtrack.cloud/issue/EMERGING-168/Refactor-Redux)

## Code Formatting

This app has the configuration for ESLint and Prettier for consistent code formatting. Install IDE extensions to notice all ESLint errors and avoid warnings.

## Version Control

Each change can come to the repo only through a GitHub Pull Request targeted to the `develop` branch.

Each new branch should be named in this format: `TYPE OF A BRANCH` / `TICKET NUMBER` / `short description`.

- `TYPE OF A BRANCH` - can be bugfix, feature, chore, docs, tests, hotfix, etc...

- `TICKET NUMBER` - should be taken from the YouTrack board (i.e. e-162). If no ticket, or it is a hotfix, you can write e-xxx.

PR prepared for the review should be rebased on the `origin/develop`. Usually, when you have a couple of commits of changes, you can use this approach to actualize your branch.

```sh
git fetch # check actual state on the origin
git rebase origin/develop # can have a few conflicts, it is ok
git push -f # override the exisitng branch with the same name on the origin. It is ok as well ;D
```

Recommended to use VSCode extention Git Graph (`mhutchie.git-graph`) to see, control, and check git history.

GH PR can have [labels](https://github.com/emerging-eco/app/labels). When you just created it and still working on it set `IN PROGRESS`. Then use `READY FOR REVIEW`, after an approval, please actualise your commit with git rebase and set `READY FOR MERGE`. Use other Labels when appropriate.
