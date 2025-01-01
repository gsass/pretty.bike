module.exports = config => {
    config.setUseGitIgnore(false);
    config.addWatchTarget("./src/_includes/css/main.css");
    
    config.addPassthroughCopy({ public: './' });
    config.addPassthroughCopy('src/img');

    return {
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            data: '_data'
        },
        passthroughFileCopy: true
    }
};
