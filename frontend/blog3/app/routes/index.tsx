import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Card from '../components/card';

interface Result {
  attributes: [key: string];
  body: string;
}

export const loader = async ({ params }: LoaderArgs) => {
  const response = await fetch(`http://localhost:4567/latest`);
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

export default function Index() {
  let results: Result | null = useLoaderData();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>

      <Card
        backgroundImage={
          'https://m.jagranjosh.com/imported/images/E/Articles/maths2.jpg'
        }
      >
        <div className="cardInfo">
          <h3 className="cardTitle">Mathematics</h3>
          <p>A subject which deals with.... Well Maths!</p>
        </div>
      </Card>
    </div>
  );
}
