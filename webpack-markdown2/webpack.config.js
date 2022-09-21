const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs");
const path = require("path");
const marked = require("marked");
const matter = require('gray-matter');

const markdownFiles = fs
  // Read directory contents
  .readdirSync("./md")
  // Take only .md files
  .filter((filename) => /\.md$/.test(filename))
  // Normalize file data.
  .map((filename) => {
    return {
      // markdown: marked.parse(fs.readFileSync(path.join("./md", filename), "utf8")),
      markdown: matter(fs.readFileSync(path.join("./md", filename), "utf8")),
      filename,
    };
  });

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.md']
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "markdown-loader",
            options: {
              // Pass options to marked
              // See https://marked.js.org/using_advanced#options
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...markdownFiles.map(({markdown, filename}) => {
      const {data: {title, slug}, content} = markdown;

      return new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        cache: true,
        chunks: ["main"],
        title: title,
        filename: `pages/${slug}.html`,
        bodyHTML: marked.parse(content)
      })
    })
  ]
}