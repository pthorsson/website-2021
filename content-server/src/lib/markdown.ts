import * as marked from 'marked';
import * as hljs from 'highlight.js';

hljs.configure({
  tabReplace: '  ',
  classPrefix: '',
});

marked.setOptions({
  highlight: function (code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  },
});

export default marked;
