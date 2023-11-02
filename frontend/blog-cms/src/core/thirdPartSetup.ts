import { Warden, Transaction, ExtraErrorData, Debug } from '@theferant/warden';
import { Amplify } from 'aws-amplify';

import Config from '../config';
import awsExports from '../assets/aws/awsExports';
import { UserHub } from './user';

/**
 * Setup third-party modules that need to be initialized before the `App` is rendered.
 */
export const thirdPartySetup = () => {
  Warden.init({
    debug: Config.app.IS_LOCAL,
    dev: Config.app.IS_LOCAL,
    environment: !Config.app.IS_LOCAL ? 'production' : 'development',
    integrations: [
      // Registers and configures the Tracing integration,
      // which automatically instruments your application to monitor its
      // performance, including custom Angular routing instrumentation
      new Warden.tracing.Integrations.BrowserTracing({
        tracingOrigins: [
          'https://edu.ferant.io/',
          'https://my.ferant.io',
          'https://accounts.ferant.io',
        ],
      }),
      new Transaction(),
      new ExtraErrorData(),
      new Debug({
        debugger: true,
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  if (Config.app.IS_LOCAL) Amplify.Logger.LOG_LEVEL = 'DEBUG';
  Amplify.configure(awsExports);

  // UserHub.init()
};
