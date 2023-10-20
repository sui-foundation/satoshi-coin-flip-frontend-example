# Satoshi Coin Flip Frontend Example
This is the React frontend example to interact with [satoshi-coin-flip smart contract](https://github.com/MystenLabs/satoshi-coin-flip). 
You can check out the smart contract repository to understand how the game works which then help you to understand how to use the UI.
This dApp was created using `@mysten/create-dapp` that sets up a simple React
Client dApp using the following tools:

- [React](https://react.dev/) as the UI framework
- [TypeScript](https://www.typescriptlang.org/) for type checking
- [Vite](https://vitejs.dev/) for build tooling
- [Radix UI](https://www.radix-ui.com/) for pre-built UI components
- [ESLint](https://eslint.org/)
- [`@mysten/dapp-kit`](https://sui-typescript-docs.vercel.app/dapp-kit) for
  connecting to wallets and loading data
- [pnpm](https://pnpm.io/) for package management

> **Disclaimer**: This frontend acts as example to showcase how to interact with Sui Move smart contract using Typescript SDK `@mysten/sui.js` and React dApp kit `@mysten/dapp-kit`. 
It is not meant to be used for complete production-grade product


## Prerequisites
- You need to [install pnpm](https://pnpm.io/installation)
- Understanding how the game is implemented by going through [smart contract repository](https://github.com/MystenLabs/satoshi-coin-flip)
- [Spin up Sui local network](https://docs.sui.io/build/sui-local-network#start-the-local-network)
- [Deploy the coin flip smart contract using CLI](https://docs.sui.io/build/cli-client#publish-packages)

## Starting your dApp

To install dependencies you can run

```bash
pnpm install
```

To start your dApp in development mode run

```bash
pnpm dev
```

To let the frontend know which smart contract they need to interact with, you need to place the `PACKAGE_ID` and `HOUSECAP_ID` (collected from publish package step) into the `constants.tsx`


## Building

To build your app for deployment you can run

```bash
pnpm build
```

## UI Structure
The UI will have two tabs side by side:
* `Player` tab includes all operations related to Player role
* `House` tab includes all operations related to House role

## Folder Structure
Due to the way the UI is structure:
- React components related to `Player` tab reside in `src/containers/Player`
- React components related to `House` tab reside in `src/containers/House`
