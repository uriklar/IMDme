module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { legacy: true }]
  ]
};
