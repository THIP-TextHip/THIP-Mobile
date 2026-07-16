module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@app": "./app",
            "@assets": "./assets",
            "@apis": "./src/apis",
            "@shared": "./src/shared",
            "@stores": "./src/stores",
            "@theme": "./src/theme",
            "@config": "./src/config",
            "@images/*": "./assets/images",
            "@screens/*": "./screens",
          },
          extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".svg"],
        },
      ],
    ],
  };
};
