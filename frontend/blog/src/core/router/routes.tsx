import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import {
  InboxIcon,
  TelescopeIcon,
  MortarBoardIcon,
} from '@primer/octicons-react';

import { SHORTCUTS } from '../data';
import Config from '@config';

import { NoMatch } from '../../features/404';

import { OverviewPage } from '../../features/overview/overview';
import { CategoryPage } from '../../features/category';
import { PostPage } from '../../features/category/post';
import { ChangelogPage } from '../../features/changelog';
import { ChangelogPostPage } from '../../features/changelog/post';

interface ExtraRouteOptions {
  displayNav?: boolean;
  name: string;
  title?: string;
  icon?: any;
  hotKey?: string;
}

type CustomRouteOptions = RouteObject & ExtraRouteOptions;

export const routes: CustomRouteOptions[] = [
  {
    index: true,
    element: <OverviewPage />,
    name: 'Overview',
    displayNav: false,
    hotKey: SHORTCUTS.navigation.dashboard.sequence,
  },
  {
    path: '/changelog',
    name: 'Changelog',
    element: <ChangelogPage />,
    loader: async ({ params }: any) => {
      return fetch(`${Config.app.URL}/changelog`);
    },
  },
  {
    path: '/changelog/:postId',
    name: 'Changelog Post',
    element: <ChangelogPostPage />,
    loader: async ({ params }: any) => {
      const res = await fetch(`${Config.app.URL}/changelog/${params.postId}`);
      if (res) {
        console.log(res);
        return res;
      }
    },
  },
  {
    path: '/:categoryId',
    name: 'Category',
    element: <CategoryPage />,
    loader: async ({ params }: any) => {
      return fetch(`${Config.app.URL}/${params.categoryId}`);
    },
  },
  {
    path: '/:categoryId/:postId',
    name: 'Post',
    element: <PostPage />,
    loader: async ({ params }: any) => {
      return fetch(`${Config.app.URL}/${params.categoryId}/${params.postId}`);
    },
  },
  {
    path: '*',
    element: <NoMatch />,
    name: '404',
    displayNav: false,
  },
];
