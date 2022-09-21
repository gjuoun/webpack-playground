const fs = require("fs");
const path = require("path");
const marked = require("marked");
const matter = require('gray-matter');

const markdownFilesData = fs
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

async function main(
) {
  console.log(JSON.stringify(markdownFilesData, null, 2));
}

main()
