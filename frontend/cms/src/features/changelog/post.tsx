import { useState, useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Box, Heading, Link } from '@primer/react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import codeTitle from 'remark-code-title';

import rehypeColorChips from 'rehype-color-chips';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle, formatDateToReadable } from '@utils';

interface PostAttributes {
  title: string;
  url: string;
  published: string;
  author: {
    name: string;
    profilePic: string;
  };
  description: string;
  image: string;
  tags: string[];
  edited?: string;
}

export const ChangelogPostPage = () => {
  const dispatch = useContext(BreadcrumbsDispatcherContext);
  const post: any = useLoaderData();

  const [content, setContent] = useState(undefined);
  const [data, setData] = useState<PostAttributes | undefined>(undefined);

  useEffect(() => {
    setContent(post.body);
    setData(post.attributes);
    console.log(post.attributes);

    const _Titles = [
      {
        name: 'Changelog',
        url: 'changelog',
      },
      {
        name: post.attributes.title,
        url: `changelog/${post.attributes.url}`,
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, [post]);

  return (
    <Box
      sx={{
        position: 'relative',
        mt: '80px',
        maxWidth: '1280px',
      }}
    >
      <Box as='section'>
        <Heading>{data?.title ?? ''}</Heading>
      </Box>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          mt: '80px',
        }}
      >
        <Box
          as='aside'
          sx={{
            position: 'sticky',
            width: '25%',
            top: 'calc(81px + 24px)',
            mr: '2rem',
            color: 'fg.subtle',
          }}
        >
          <time dateTime={data?.published}>
            {formatDateToReadable(data?.published) ?? ''}
          </time>
        </Box>
        <Box
          as='main'
          sx={{
            minWidth: '0px',
            maxWidth: '100%',
            width: '588px',
            a: {
              color: 'color.',
            },
          }}
        >
          <ReactMarkdown
            components={{
              a: ({ href, children, ...props }) => {
                return <Link href={href}>{children}</Link>;
              },
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={dark}
                    language={match[1]}
                    PreTag='div'
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            remarkPlugins={[remarkGfm, codeTitle]}
            rehypePlugins={[rehypeColorChips]}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
};
