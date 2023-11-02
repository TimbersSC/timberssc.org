import type {
  LoaderArgs,
  MetaFunction,
  LoaderFunction,
  LinksFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { marked } from 'marked';
import styles from 'highlight.js/styles/github.css';

import NotFound from '../../components/notFound';
import ReadingTime from '../../components/post/readingTime';


export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

interface AttributesAuthor {
  name?: string;
  profilePic?: string;
}

interface Attributes {
  [key: string]: any;
  title?: string;
  description?: string;
  image?: string;
  author?: AttributesAuthor;
}

interface Result {
  attributes: Attributes;
  body: string;
}

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  const response = await fetch(
    `http://localhost:4567/${params.categoryId}/${params.postId}`
  );

  if (!response.ok || response.status !== 200) {
    if (response.status === 404) {
      return null; // File not found
    }
    throw Error(
      `Fetching Markdown file failed with ${response.status}: ${response.statusText}`
    );
  }

  return response;
};

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return {
      title: 'Not found | The Ferant Blog',
      description: `There is no shake with the ID of ${params.shakeId}. 😢`,
    };
  }

  const { attributes } = data;
  return {
    title: `${attributes.title} | The Ferant Blog`,
    description: attributes.description,
  };
};

export default function Users() {
  let results: Result | null = useLoaderData();
  if (!results) {
    return <NotFound></NotFound>;
  }

  const html = marked(results.body);

  return (
    <div className="container-lg">
      <header>
        <h1>{results.attributes.title}</h1>
        {results.attributes.description && (
          <p>{results.attributes.description}</p>
        )}

        {results.attributes.image && <img src={results.attributes.image} />}

        <span>
          <ReadingTime content={results.body} />
        </span>
      </header>
      <div className="container-xl mx-auto p-responsive mt-4 mt-md-7 mb-7 mb-md-9">
        <div className="d-flex flex-wrap gutter-spacious">
          <div className="col-12 offset-lg-1 col-lg-1"></div>
          <main
            className="col-12 col-lg-8 col-md-8 f4 markdown-body"
            dangerouslySetInnerHTML={{ __html: html ?? 'No posts' }}
          />
        </div>
      </div>
    </div>
  );
}
