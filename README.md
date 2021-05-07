# pretty.bike
It's the PJ Ride Webpage! A repository for the ageless knowledge which we've acquired riding to Provincetown.

## Repo structure
- [index.html](./index.html) is the main page. Since this is a Vue app, it mostly contains script imports and an app container. Sorry, HTML+CSS afficionados.
- [index.js](./src/index.js) contains the main app. You do not need to edit this to publish content.
- [routes.js](./src/routes.js) is a vanilla JS module containing all the routes for the app. You will need to edit this to publish content.
- [The `content` directory](./content) is where markdown content goes. Note that while HTML is _valid_ markdown, the input sanitizer may scrub elements it interprets as security risks.

## Developing for the website
Since the JS running the page uses cool features like ES6 modules and `fetch`, most browsers will make the very reasonable decision to block any and all `file://` URLS. To serve content over http on localhost, use either a [browser extensions](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) or fire up the dev server using `yarn run dev` from CLI.

## Adding a page
Because this site is hosted entirely on GitHub pages, and because I don't feel like installing yet another dependency, I'm relying on hash-only routing. This is a totally clunky way to do it, but it reduces the routing and caching code to like 40 lines, so roll with it. MVP style, papí.

To add a new page:
- Write up the content in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), which ICYMI is basically just plaintext email formatting syntax. Reach back into the early 2000s; bring me back some Juicy sweats.
- Add your markdown file to the `content` directory.
- Add a new route to `routes.js`

## Wishlist/TODOs
- [ ] Responsive styling fixes
- [ ] Minify images and use `srcset`s
