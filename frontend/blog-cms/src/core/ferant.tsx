import React from 'react';
import { ThemeProvider, BaseStyles, Box } from '@primer/react';
// import '@primer/css/utilities/index.scss';
import { HotkeysProvider } from '@components/shortcuts';

import ConfigContext from '../components/ConfigContext';
import config from '../config';

import { LayoutComponent } from './layout';
import { customTheme } from './theme';

import { UserHub } from './user';
import { UserContext } from './userContext';

import { BubblesLoader } from '@shared/bubblesLoader';

export const FerantApp = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    UserHub.init().then(() => {
      setUser(UserHub.scope.getUser());
    });
  }, []);

  let content;
  if (!user) {
    content = <BubblesLoader />;
  } else {
    content = (
      <UserContext.Provider value={user}>
        <LayoutComponent />
      </UserContext.Provider>
    );
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
