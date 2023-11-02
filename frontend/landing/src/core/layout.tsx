import { useReducer } from 'react';

import { useTheme } from '@primer/react';

import { Router } from './router/router';

import { FeatureFlagContext } from '../components/featureFlag';

import {
  BreadcrumbsContext,
  breadcrumbsReducer,
  BreadcrumbsDispatcherContext,
} from '../components/navigation/breadcrumbs';

import { DialogProvider } from '@shared/dialog/dialog';

export const LayoutComponent = () => {
  // Set the global theme for the app for the user
  const { colorMode, theme } = useTheme();
  document.querySelector('html')?.setAttribute('mode', colorMode ?? 'auto');
  document
    .querySelector('html')
    ?.setAttribute('style', `background-color: ${theme.colors.canvas.default}`);

  // Breadcrumbs context
  const [breadcrumbs, breadcrumbsDispatch] = useReducer(
    breadcrumbsReducer,
    null,
  );

  return (
    <FeatureFlagContext.Provider value={{}}>
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