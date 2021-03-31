/*
* Define custom renderer to apply Pure classes as needed
*/
const renderer = {
  table(header, body) {
    if (body) body = `<tbody>${body}</tbody>`;

    return `
      <table class="pure-table pure-table-bordered">
        <thead>${header}</thead>
        ${body}
      </table>`;
  }
}
marked.use({ renderer })

const renderMarkdown = (rawMarkdown) => marked(
    rawMarkdown,
    { sanitizer:  DOMPurify.sanitize }
);

export default renderMarkdown;