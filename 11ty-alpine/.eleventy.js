module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("_data");
    eleventyConfig.addPassthroughCopy("assets");
};