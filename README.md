
# [Emerging Eco App](https://app.emerging.eco/)

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
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

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

First, let's review the example and then we'll go through each folder:

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

## API Data

Explain how your app gathers data from different APIs. If there are authentication requirements, guide users on setting up API keys or authentication tokens.

## State Management

Detail how Redux Toolkit is used for state management. Describe any notable patterns or practices you've followed.

## Code Formatting

Your app uses ESLint and Prettier for consistent code formatting. Users can lint their code using the following command:

```sh
npm run lint
```

Ensure your code follows the provided linting rules before submitting pull requests.

## Contributing

If you're open to contributions, outline how users can contribute to your project. Mention your preferred pull request process and coding guidelines.

## Troubleshooting

Provide solutions to common issues users might encounter. Address frequently asked questions to help users navigate problems effectively.

---

Feel free to customize the above template to suit your app's specific details. A well-structured README.md helps users understand and engage with your project efficiently.

Opinion: Your README covers the crucial aspects of your app effectively. It's great to see you've included details about deployment, state management, code formatting, and troubleshooting. This will undoubtedly make it easier for collaborators and users to work with your app.
