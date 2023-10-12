import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from '../router/routes';
import { IndexPage } from '../../features';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <div>Error!</div>,
    children: routes,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
