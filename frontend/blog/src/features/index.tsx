import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Slide } from 'react-toastify';
import { useTheme } from '@primer/react';
import { useHotkeys } from '@components/shortcuts';

import { routes } from '@core/router/routes';

import { NavigationComponent } from '@components/navigation/navigation';
import { ToastContainer, SetupToastifyColors } from '@components/toasts';
import { KeyboardShortcutsHelper } from '@components/keyboardShortcuts';

export const IndexPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  routes.forEach((route) => {
    if (route.hotKey) {
      useHotkeys(
        route.hotKey,
        (e) => {
          e.stopImmediatePropagation();
          navigate(`/${route.path ?? ''}`);
        },
        { preventDefault: true, enabled: true, scopes: ['*'] },
      );
    }
  });

  React.useEffect(() => {
    SetupToastifyColors(theme);
  }, []);

  return (
    <>
      <ToastContainer transition={Slide} />
      <KeyboardShortcutsHelper />
      <NavigationComponent />
      <Outlet />
    </>
  );
};