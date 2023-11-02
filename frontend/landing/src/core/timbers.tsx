import React from 'react';
import { ThemeProvider, BaseStyles, Box } from '@primer/react';

import ConfigContext from '../components/ConfigContext';
import config from '../config';

import { LayoutComponent } from './layout';
import { customTheme } from './theme';

export const TimbersApp = () => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 1);
  }, []);

  /** @TODO: add transition */
  let content;
  if (!loaded) {
    content = <></>;
  } else {
    content = <LayoutComponent />;
  }

  return (
    <ConfigContext.Provider value={config}>
      <ThemeProvider theme={customTheme} colorMode='light' preventSSRMismatch>
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
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};
