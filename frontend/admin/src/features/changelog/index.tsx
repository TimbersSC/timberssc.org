import { useEffect, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

export const ChangelogPage = () => {
  const dispatch = useContext(BreadcrumbsDispatcherContext);
  const albums = useLoaderData();
  useEffect(() => {
    const _Titles = [
      {
        name: 'Changelog',
        url: 'changelog',
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, []);

  return <>Changelog</>;
};
