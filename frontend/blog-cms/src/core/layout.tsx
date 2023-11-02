import React from 'react';

import { useTheme } from '@primer/react';

import { Router } from './router/router';

import { FeatureFlagContext } from '../components/featureFlag';
import { AutoLogoutDialog } from './components/autoLogout';

import {
  BreadcrumbsContext,
  breadcrumbsReducer,
  BreadcrumbsDispatcherContext,
} from '../components/navigation/breadcrumbs';

import { DialogProvider } from '@shared/dialog/dialog';

export const LayoutComponent = () => {
  // Set the global theme for the app for the user
  const { colorMode } = useTheme();
  document.querySelector('html')?.setAttribute('mode', colorMode ?? 'auto');

  // @TODO fetch feature flags

  // Breadcrumbs context
  const [breadcrumbs, breadcrumbsDispatch] = React.useReducer(
    breadcrumbsReducer,
    null,
  );

  return (
    <FeatureFlagContext.Provider value={{}}>
      <AutoLogoutDialog />
      <DialogProvider>
        <BreadcrumbsContext.Provider value={breadcrumbs}>
          <BreadcrumbsDispatcherContext.Provider value={breadcrumbsDispatch}>
            <Router />
          </BreadcrumbsDispatcherContext.Provider>
        </BreadcrumbsContext.Provider>
      </DialogProvider>
    </FeatureFlagContext.Provider>
  );
};
