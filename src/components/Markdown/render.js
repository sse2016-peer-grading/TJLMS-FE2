import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';

import 'highlight.js/styles/vs.css';

hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  var out;
  out = "<a href=\"" + href + "\"";
  out += ' target="_blank"';
  if (title) {
    out += " title=\"" + title + "\"";
  }
  return out += ">" + text + "</a>";
};

marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value;
  },
  sanitize: true,
  renderer: renderer,
});

export default function render(markdown) {
  return marked(markdown);
};
