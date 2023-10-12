import React from 'react';
import { ThemeProvider, BaseStyles, Box } from '@primer/react';
// import '@primer/css/utilities/index.scss';
import { HotkeysProvider } from '@components/shortcuts';

import ConfigContext from '../components/ConfigContext';
import config from '../config';

import { LayoutComponent } from './layout';
import { customTheme } from './theme';

import { BubblesLoader } from '@shared/bubblesLoader';

export const FerantApp = () => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 1);
  }, []);

  let content;
  if (!loaded) {
    content = <BubblesLoader />;
  } else {
    content = <LayoutComponent />;
  }

  return (
    <ConfigContext.Provider value={config}>
      <ThemeProvider theme={customTheme} colorMode='auto' preventSSRMismatch>
        <HotkeysProvider initiallyActiveScopes={['*']}>
          <BaseStyles id='baseRoot'>
            <Box
              sx={{
                backgroundColor: 'canvas.default',
                minHeight: '100vh',
                placeItems: 'center',
              }}
            >
              {content}
            </Box>
          </BaseStyles>
        </HotkeysProvider>
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};
