import React from 'react';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';

export const OverviewPage = () => {
  const dispatch = React.useContext(BreadcrumbsDispatcherContext);

  React.useEffect(() => {
    dispatch();
  }, []);

  return <>overview</>;
};
