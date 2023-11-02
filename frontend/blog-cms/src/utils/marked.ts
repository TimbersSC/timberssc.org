/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { marked } from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: true,
  xhtml: false,
});

export const markedExtended = (content: string) => {
  const footnotes: { name: any; note: string }[] = [];
  const newTokens = [];
  const footnoteTest = /^\[\^[^\]]+\]: /;
  const footnoteMatch = /^\[\^([^\]]+)\]: ([\s\S]*)$/;
  const referenceTest = /\[\^([^\]]+)\](?!\()/g;
  // get block tokens
  const tokens = marked.lexer(content);
  // Check footnote
  function checkFootnote(token: {
    type: string;
    text: string;
    toDelete: boolean;
  }) {
    if (token.type !== 'paragraph' || !footnoteTest.test(token.text)) {
      return;
    }

    const match = token.text.match(footnoteMatch);
    const name = match[1].replace(/\W/g, '-');
    const note = match[2];
    footnotes.push({
      name,
      note: `${marked(note)} <a href="#fnref:${name}">↩</a>`,
    });
    // remove footnotes from tokens
    token.toDelete = true;
  }
  function checkReference(token: {
    type: string;
    text: string | marked.Token[];
    tokens: any;
  }) {
    if (token.type === 'paragraph' || token.type === 'text') {
      token.text = token.text.replace(
        referenceTest,
        (ref: any, value: string) => {
          const name = value.replace(/\W/g, '-');
          let code = ref;
          for (let j = 0; j < footnotes.length; j++) {
            if (footnotes[j].name === name) {
              code = `<sup id="fnref:${name}"><a href="#fn:${name}">${
                j + 1
              }</a></sup>`;
              break;
            }
          }
          return code;
        },
      );
      if (token.type === 'paragraph') {
        // Override children
        token.tokens = marked.walkTokens(token.text)[0].tokens;
      }
    }
  }
  function visit(
    tokens: typeof marked,
    fn: { (token: any): void; (token: any): void; (arg0: any): void },
  ) {
    for (const token of tokens) {
      fn(token);
      // Visit children
      if (token.tokens) {
        visit(token.tokens, fn);
      }
    }
  }
  visit(tokens, (token: any) => {
    checkFootnote(token);
  });
  // Remove tokens from AST, starting with top-level
  const workList = [tokens];
  do {
    const tokenList = workList.pop();
    for (let i = tokenList.length - 1; i >= 0; i--) {
      if (tokenList[i].toDelete) {
        tokenList.splice(i, 1);
      } else if (tokenList[i].tokens) {
        workList.push(tokenList[i].tokens);
      }
    }
  } while (workList.length != 0);
  visit(tokens, (token: any) => {
    checkReference(token);
  });

  let html = marked.parser(tokens);
  if (footnotes.length > 0) {
    html += `
  <hr />
  <ol>
    <li>${footnotes.map((f) => f.note).join('</li>\n  <li>')}</li>
  </ol>
  `;
  }
  return html;
};
