module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");
  let taskLists = require("markdown-it-tasks")

  let options = {
    html: true
  };

  eleventyConfig.setLibrary("md", markdownIt().use(taskLists));
};
