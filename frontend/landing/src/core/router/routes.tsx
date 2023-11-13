import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import matter from 'gray-matter';

import {
  TrophyIcon,
  CalendarIcon,
  PeopleIcon,
  GlobeIcon,
  GiftIcon,
} from '@primer/octicons-react';

import { NoMatch } from '../../features/404';

import { OverviewPage } from '../../features/overview';
import { ClubPage } from '../../features/club';
import { FirstTeamPage } from '../../features/firstTeam';
import { PartnersPage } from '../../features/partners';
import { SchedulePage } from '../../features/schedule';

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
  },
  {
    path: '/club',
    name: 'Club',
    displayNav: true,
    icon: <TrophyIcon />,
    element: <ClubPage />,
  },
  {
    path: '/first-team',
    name: 'First team',
    displayNav: true,
    icon: <PeopleIcon />,
    element: <FirstTeamPage />,
  },
  {
    path: '/partners',
    name: 'Partners',
    displayNav: true,
    icon: <GlobeIcon />,
    element: <PartnersPage />,
  },
  // {
  //   path: '/schedule',
  //   name: 'Schedule',
  //   displayNav: true,
  //   icon: <CalendarIcon />,
  //   element: <SchedulePage />,
  // },
  {
    path: 'https://diaza.com/collections/timbers',
    name: 'Shop gear',
    displayNav: true,
    icon: <GiftIcon />,
  },
  {
    path: '*',
    element: <NoMatch />,
    name: '404',
    displayNav: false,
  },
];
