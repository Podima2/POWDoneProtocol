module.exports = {
  apps: [
    // {
    //   name: "3030-app",
    //   script: "bun",
    //   args: "3031",
    //   watch: true,
    //   env: {
    //     // PORT: 80,
    //     // NEXT_PUBLIC_RPC:"https://sepolia-rpc.scroll.io",
    //     // NODE_ENV: "development",
    //   },
    // },
    {
      name: "3031-api2",
      script: "bun",
      args: "3031",
      watch: true,
      env: {
        PORT: 3031,
        // NODE_ENV: "development",
      },
    },
    {
      name: "3032-counter-app",
      script: "bun",
      args: "3032",
      watch: true,
      env: {
        PORT: 3032,
        // NODE_ENV: "development",
      }
    },
    // {
    //   name: "8545-hardhat-chain",
    //   script: "bun",
    //   args: "start:chain"
    // },
    // {
    //   name: "3033-chain-explorer",
    //   script: "bun",
    //   args: "start:explorer"
    // },
  ],
};
