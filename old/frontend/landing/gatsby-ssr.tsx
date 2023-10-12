import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { Layout } from './src/components/Layout/Layout';

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => <Layout>{bodyComponent}</Layout>;
  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};
