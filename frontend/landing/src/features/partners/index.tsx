import { useContext, useEffect } from 'react';

import { Box, Text } from '@primer/react';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

import starting_xi from '@public/images/starting_xi.jpg';

import { PartnersText } from './text';
import { PartnersImages } from './images';

export const PartnersPage = () => {
  const dispatch = useContext(BreadcrumbsDispatcherContext);

  useEffect(() => {
    const _Titles = [
      {
        name: 'Our Partners',
        url: 'partners',
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          as='img'
          src={starting_xi}
          alt='Starting XI'
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'block',
            height: ['100vh', 'auto'],
            left: ['-50%', 0],
            width: ['auto', '100vw'],
            maxWidth: ['auto', '100vw'],
            transform: ['translate(0,0)', 'translate(0, -120px)'],
            opacity: 0.2,
            overflow: 'hidden',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100vw',
            // background: 'rgb(255,255,255)',
            background:
              'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
      </Box>
      <Box
        sx={{
          maxWidth: '1335px',
          padding: ['3em 1em', '0'],
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
          display: ['flex', 'grid'],
          gridTemplateColumns: '1fr 1fr',
          flexDirection: 'column-reverse',
          gap: ['2rem', 0],
          maxHeight: ['auto', 'calc(100vh - 60px)'],
          boxSizing: 'border-box',
        }}
      >
        {/* <BgGradientCircle sx={{ top: 0, left: '50%', bg: 'accent.fg' }} />
        <BgGradientCircle sx={{ top: 0, left: '50%', bg: 'accent.fg' }} /> */}
        <PartnersImages />
        <PartnersText />
      </Box>
    </>
  );
};
