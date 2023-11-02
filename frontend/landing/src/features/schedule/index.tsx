import { useContext, useEffect } from 'react';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

export const SchedulePage = () => {
  const dispatch = useContext(BreadcrumbsDispatcherContext);

  useEffect(() => {
    const _Titles = [
      {
        name: 'First Team Schedule',
        url: 'schedule',
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, []);

  return <>Schedule</>;
};
