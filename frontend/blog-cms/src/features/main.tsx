import React from 'react';

import { Box } from '@primer/react';
import { Outlet } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { BubblesLoader } from '@components/bubblesLoader';
import { redirectExternal } from '@core/auth';

export const MainPage = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        redirectExternal();
        setLoading(true);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'canvas.default',
        minHeight: '100vh',
        placeItems: 'center',
      }}
    >
      <Box
        sx={{
          background:
            'linear-gradient(180deg, rgba(44, 45, 60, 1) 0%, rgba(0, 212, 255, 0) 50%)',
        }}
      >
        {!loading && <Outlet />}
        {loading && <BubblesLoader />}
      </Box>
    </Box>
  );
};
