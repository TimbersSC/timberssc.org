import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from '../router/routes';
import { MainPage } from '../../features/main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <div>Error!</div>,
    children: routes,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
