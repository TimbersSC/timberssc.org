import { Warden, Transaction, ExtraErrorData, Debug } from '@theferant/warden';

import Config from '../config';

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
          'https://blog.ferant.io',
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

  // UserHub.init()
};
