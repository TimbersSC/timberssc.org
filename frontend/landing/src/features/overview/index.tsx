import React from 'react';

import { Box, Link, Text, useTheme } from '@primer/react';
import { rgba } from 'polished';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

import starting_xi from '@public/images/starting_xi.jpg';
import riki_logo from '@public/images/partners/riki-site-logo.png';

export const OverviewPage = () => {
  const dispatch = React.useContext(BreadcrumbsDispatcherContext);
  const { theme } = useTheme();

  React.useEffect(() => {
    dispatch();
    setDocumentTitle(['Official Timbers Website']);
  }, []);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 60px)',
        overflowY: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        as='img'
        src={starting_xi}
        alt='Starting XI'
        sx={{
          display: 'block',
          width: '100%',
          maxWidth: '100vw',
          transform: 'translate(0, -120px)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 3,
          left: '50%',
          transform: 'translate(-50%, 0)',
          bg: rgba(theme.colors.ansi.whiteBright, 0.4),
          backdropFilter: 'saturate(190%) blur(10px)',
          borderBottom: `1px solid ${rgba(theme.colors.border.subtle, 0.1)}`,
          py: 2,
          px: 3,
          borderRadius: 1,
          // boxShadow: 'shadow.medium',
          color: 'white',
          fontWeight: 300,
          fontSize: 1,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Partnered with
        <Link
          href='//rikispirits.com/'
          target='_blank'
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <Box
            as='img'
            src={riki_logo}
            alt='Riki'
            sx={{
              display: 'inline',
              height: '1rem',
              ml: 1,
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};
