import React from 'react';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

export const CategoryPage = () => {
  const dispatch = React.useContext(BreadcrumbsDispatcherContext);

  React.useEffect(() => {
    const _Titles = [
      {
        name: 'Intake',
        url: 'intake',
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, []);

  return <>overview</>;
};
