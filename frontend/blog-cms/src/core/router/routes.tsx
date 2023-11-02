import React from 'react';
import { redirect } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { OverviewPage } from '../../features/overview';
import { CategoryPage } from '../../features/category';
import { PostPage } from '../../features/category/post';
import { ChangelogPage } from '../../features/changelog';
import { ChangelogPostPage } from '../../features/changelog/post';

interface ExtraRouteOptions {
  name?: string;
  title?: string;
}

type CustomRouteOptions = RouteObject & ExtraRouteOptions;

export const routes: CustomRouteOptions[] = [
  {
    index: true,
    name: 'Overview',
    element: <OverviewPage />,
  },
  {
    path: '/changelog',
    element: <ChangelogPage />,
    loader: async ({ params }: any) => {
      return fetch(`/api/teams/${params.teamId}.json`);
    },
  },
  {
    path: '/changelog/:postId',
    element: <ChangelogPostPage />,
    loader: async ({ params }: any) => {
      return fetch(`/api/teams/${params.teamId}.json`);
    },
  },
  {
    path: '/:categoryId',
    element: <CategoryPage />,
    loader: async ({ params }: any) => {
      return fetch(`/api/teams/${params.teamId}.json`);
    },
  },
  {
    path: '/:categoryId/:postId',
    element: <PostPage />,
    loader: async ({ params }: any) => {
      return fetch(`/api/teams/${params.teamId}.json`);
    },
  },
  {
    path: '*',
    loader: async () => {
      return redirect('/login');
    },
  },
];
