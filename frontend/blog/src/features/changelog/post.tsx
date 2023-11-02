import React from 'react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import codeTitle from 'remark-code-title';

import rehypeColorChips from 'rehype-color-chips';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

export const ChangelogPostPage = () => {
  const dispatch = React.useContext(BreadcrumbsDispatcherContext);

  React.useEffect(() => {
    const _Titles = [
      {
        name: 'Changelog',
        url: 'changelog',
      },
      {
        name: 'Changelog',
        url: `changelog/`,
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, []);

  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return (
            <SyntaxHighlighter
              {...props}
              style={dark}
              language={match[1]}
              PreTag='div'
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          );
        },
      }}
      remarkPlugins={[remarkGfm, codeTitle]}
      rehypePlugins={[rehypeColorChips]}
    >
      {'# Post'}
    </ReactMarkdown>
  );
};
