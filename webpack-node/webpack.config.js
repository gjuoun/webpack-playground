const path = require("path");

module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
  },
  output: {
    filename: (pathData) => {
      console.log(pathData.chunk.name);
      return pathData.chunk.name === "main" ? "[name].js" : "npm/[name].js";
    },
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // very important for node.js bundle
  target: "node",
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            targets: {
              node: "16.0",
            },
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,

    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        //! bundle all node_modules into npm.js
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/<packageName>/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            // return `${packageName.replace("@", "")}`;
            return `npm`;
          },
          reuseExistingChunk: true,
        },
      },
    },
  },
};
