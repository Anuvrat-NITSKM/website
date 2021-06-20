const path = require("path");
const Image = require("@11ty/eleventy-img");

// Does not work for some reason
module.exports = async function imageShortcode(src, alt) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg"],
    outputDir: path.resolve(__dirname, 'dist', 'assets', 'images')
  });

  let imageAttributes = {
    alt,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}
