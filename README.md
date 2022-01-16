# Trophy Case

Created at [NFT Hack 2022](https://showcase.ethglobal.com/nfthack2022/trophy-case): A dead simple way for developers to let users mint NFTs from in-app achievements, and a wallet for users to view all their achievements & discover others with similar interests.

🎥 Demo (click to view)
[![Youtube Demo](https://img.youtube.com/vi/w-SLXECOgLc/0.jpg)](https://www.youtube.com/watch?v=w-SLXECOgLc)


## About

Trophy Case demonstrates universal badges, or achievements. Today, many apps (Duolingo, Fitbit, etc) incorporate gamification to award users with digital badges, but these often feel intangible and are difficult to showcase to friends who are not already Duolingo, Fitbit, etc users. They’re also siloed and one-dimensional — Julia is either a French enthusiast OR a distance runner depending on the app that we’re interacting with, but in reality she’s both (and more!).

Our project simplifies the process of NFT integration for developers, and also shows how social discovery can be implemented using universal badge NFTs. Developers can deploy our NFT template contract and add minting capability in just one line using our JavaScript SDK.

End users can enjoy their achievements from many apps & interests in a single place, as well as discover similar wallet addresses (finding other users interested in both learning French and distance running!) based on shared collections.

![alt text](https://github.com/gracew/trophy-case/blob/main/public/images/product/mobile1.png)
![alt text](https://github.com/gracew/trophy-case/blob/main/public/images/product/mobile2.png)



## How It’s Made

We decided to build Trophy Case on Polygon to lower friction for developers and users new to web3 (in terms of gas fees and transaction speed). NFT metadata and image art are stored on IPFS. We used Moralis’ Web3 NFT API to find other wallet addresses with similar NFTs, and to reverse lookup wallet addresses to ENS names. The Moralis API was immensely helpful as some of the other NFT APIs we looked at (OpenSea, Rarible) did not include Polygon support. Resolving the ENS name was also simpler using Moralis than using ethers.js. Finally, we used the @davatar/react package to show ENS avatars when available.

We’re proud that our project shows the end to end flow of how existing web2 apps might integrate NFTs, the simplicity of minting those NFTs, and additional use cases that can be built on top of these achievement NFTs, like social discovery.

![alt text](https://github.com/gracew/trophy-case/blob/main/public/images/product/mobile3.png)

## Web3 Technologies

- ENS — We resolve wallet addresses to ENS usernames and show avatars as part of our social discovery workflow.
- Moralis — We use Moralis’ Web3 NFT API to determine wallet addresses with similar NFTs to the connected user.
- OpenSea — We make it dead simple for web2 developers to add NFT minting functionality to their apps.
- Polygon — We chose to deploy our NFT contracts on Polygon in order to reduce friction (gas fees and transaction speed) for developers & end users new to web3.

### Stack

- ethereum developer tools: ethers.js, hardhat, openzeppelin
- blockchain networks: polygon
- programming languages: javascript, html/css, solidity
- web frameworks: next.js
- design tools: figma

## Dev Notes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Hardhat

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```