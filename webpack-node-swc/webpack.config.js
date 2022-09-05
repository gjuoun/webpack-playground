const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // very important for node.js bundle
  target: "node",
  resolve: {
    extensions: [".js"],
  },
  devServer: {
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        // `terserOptions` options will be passed to `swc` (`@swc/core`)
        // Link to options - https://swc.rs/docs/config-js-minify
        terserOptions: {},
      }),
    ],
  },
};
