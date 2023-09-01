import React from 'react';

import { MantineProvider, AppShell, Box } from '@mantine/core';

import '../../styles/app.scss';

import { NavigationComponent } from '../nav';
import { FooterComponent } from '../footer';

export const Layout = ({ children }): JSX.Element => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        // Override any other properties from default theme
        fontFamily: 'Noto Sans, sans-serif',
        // spacing: { xs: '1rem', sm: '1.2rem', md: '1.8rem', lg: '2.2rem', xl: '2.8rem' },
        defaultGradient: { from: '#315235', to: '#CB9C66', deg: 20 },
        colors: {
          gold: ['#CB9C66'],
          evergreen: ['#315235'],
        },
      }}
    >
      <AppShell
        fixed={false}
        // padding="md"
        header={<NavigationComponent />}
        footer={<FooterComponent />}
        padding={'none'}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
      </AppShell>
    </MantineProvider>
  );
};
