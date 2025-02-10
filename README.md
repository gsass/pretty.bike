# pretty.bike
It's the PJ Ride Webpage! A repository for the ageless knowledge which we've acquired riding to Provincetown.

## Developing for the website
- `yarn install`
- `yarn exec eleventy -- --serve`

## Adding content
Content is stored in markdown in the `src` directory of this repo. You can edit it as you would markdown.

## Adding a page
To add a new page:
- Write up the content in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- Add your markdown file to the `src` directory.
- Add a new route to `src/_data/nav.json` if you want it to appear in the nav

## Wishlist/TODOs
- [ ] Custom widths for panorama photos. See [docs](https://www.11ty.dev/docs/plugins/image/#html-transform)
