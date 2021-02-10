import * as marked from 'marked';
import * as prism from 'prismjs';

// Load all languages in Prism
require('prismjs/components/')();

marked.setOptions({
  highlight: function (code, language) {
    const prismLanguage = prism.languages[language];

    if (prismLanguage) {
      return prism.highlight(code, prismLanguage, language);
    }

    return code;
  },
});

export default marked;
