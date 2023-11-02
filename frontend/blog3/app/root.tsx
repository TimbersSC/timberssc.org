import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { MetaFunction } from '@remix-run/server-runtime';
import type { LinksFunction } from '@remix-run/node';

import styles from '~/styles/index.css';

import NavBar from './components/navBar';
import Footer from './components/footer';

export const meta: MetaFunction = () => {
  return {
    title: 'The Ferant Blog | Updates, ideas, and inspiration from Ferant',
    description:
      'Updates, ideas, and inspiration from Ferant to help educators take their game to the next level and developers build and design software.',
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '//cdn.ferant.io/branding/logo-symbol.png',
      type: 'image/png',
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@primer/css@^20.2.4/dist/primer.css',
    },
    { rel: 'stylesheet', href: styles },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className="d-flex flex-column flex-content-stretch"
        style={{ minHeight: '100vh' }}
      >
        <NavBar />
        <div className="container-xl mx-auto p-responsive width-full mb-6">
          <div className="homepage-section mt-2 mt-md-5 mb-4 mb-md-6">
            <Outlet />
            <ScrollRestoration />
          </div>
        </div>
        <Footer />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
