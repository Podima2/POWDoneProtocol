module.exports = {
  apps: [
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
      },
    },
  ],
};