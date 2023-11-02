import { useContext, useEffect } from 'react';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

export const ClubPage = () => {
  const dispatch = useContext(BreadcrumbsDispatcherContext);

  useEffect(() => {
    const _Titles = [
      {
        name: 'Our Club',
        url: 'club',
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, []);

  return <>Club</>;
};
