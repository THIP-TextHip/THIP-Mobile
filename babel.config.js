module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@app": "./app",
            "@assets": "./assets",
            "@shared": "./src/shared",
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
