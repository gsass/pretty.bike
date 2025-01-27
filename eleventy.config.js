const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const taskLists = require("markdown-it-task-lists")

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./src/_includes/css/main.css");

  let options = {
    html: true
  };

  eleventyConfig.amendLibrary("md", markdownIt => markdownIt.use(taskLists, {enabled: true}));

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: "html",

    formats: ["auto"],

    widths: [200,400,600],

    defaultAttributes: {
      loading: "lazy",
      sizes: "auto",
    },
  });

  return {
    dir: {
      input: 'src',
      output: 'docs',
      includes: '_includes',
      data: '_data'
    },
    passthroughFileCopy: true
  };
};


