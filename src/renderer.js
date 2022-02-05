/*
* Define custom renderer to apply Pure classes as needed
*/
const renderer = {
  table(header, body) {
    if (body) body = `<tbody>${body}</tbody>`;

    return `
      <table class="pure-table pure-table-striped">
        <thead>${header}</thead>
        ${body}
      </table>`;
  },

  image(href, title, text) {
    if (href === null) {
      return text;
    }

    let out = `<img class='pure-img' src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += '/>';
    return out;
  },

  tablecell(content, {header}) {
    const tag = header ? 'th' : 'td';
    const align = header ? 'center' : 'left';
    return `<${tag} align="${align}">${content}</${tag}>\n`;
  }
}

/*
* Extend the renderer to recognize b64 and convert to ASCII
*/
const b64render = {
  name: 'base64',
  level: 'inline',
  start(src) { return src.match(/b64:/)?.index; }, // Search from b64: on
  tokenizer(src, tokens) {
    const rule = /^b64:([\d\w]*={0,3})/; // Match 'b64:<encoded>' and capture the encoded value
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'base64',
        raw: match[0],
        decoded: this.lexer.inlineTokens(atob(match[1])),
      };
    }
  },
  renderer(token) {
    return `<span class='decoded'>${this.parser.parseInline(token.decoded)}</span>`
  },
};

marked.use({ renderer, extensions: [b64render] });

/*
* Provide a sanitized parser function
*/
const renderMarkdown = (rawMarkdown, renderOptions = {}) => marked.parse(
    rawMarkdown,
    { sanitizer:  DOMPurify.sanitize, ...renderOptions }
);

export default renderMarkdown;
