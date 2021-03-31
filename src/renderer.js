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
marked.use({ renderer })

const renderMarkdown = (rawMarkdown) => marked(
    rawMarkdown,
    { sanitizer:  DOMPurify.sanitize }
);

export default renderMarkdown;