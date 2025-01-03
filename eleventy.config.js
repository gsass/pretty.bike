const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const taskLists = require("markdown-it-tasks")

module.exports = function (eleventyConfig) {
  let options = {
    html: true
  };

  eleventyConfig.setLibrary("md", markdownIt().use(taskLists));

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "md",

		formats: ["auto"],

		widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
			sizes: "auto",
		},
	});
};


