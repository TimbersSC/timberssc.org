import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Slide } from 'react-toastify';
import { useTheme, Box } from '@primer/react';

import { NavigationComponent } from '@components/navigation/navigation';
import { ToastContainer, SetupToastifyColors } from '@components/toasts';

export const IndexPage = () => {
  const { theme } = useTheme();

  useEffect(() => {
    SetupToastifyColors(theme);
  }, []);

  return (
    <>
      <ToastContainer transition={Slide} />
      <NavigationComponent />
      <Box
        sx={{
          // maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};
