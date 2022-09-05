const path = require("path");
const { ESBuildMinifyPlugin } = require("esbuild-loader");

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
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //     },
      //   },
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "esbuild-loader",
          options: {
            target: "es2015",
          },
        },
      },
    ],
  },

  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015", // Syntax to compile to (see options below for possible values)
      }),
    ],
  },
};
