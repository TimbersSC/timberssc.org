/**
 * Configuration
 */
import manifest from '../public/manifest.json';

/** Whether we're running on a local desktop or on AWS Lambda */
const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

/**
 * Configuration Options
 *
 * IMPORTANT:
 * The config is injected into the client (browser) and accessible through the {@link useConfig}
 * hook. However, due to this behavior, it is important NOT to expose any sensitive information
 * such as passwords or tokens through the config.
 */
const config: any = {
  /** Application Config */
  app: {
    /** Name of the app is loaded from the `manifest.json` */
    TITLE: manifest.short_name,
    /** Theme is also loaded from the `manifest.json` */
    THEME_COLOR: manifest.theme_color,
    /** Where the bundled distribution files (`main.js`, `main.css`) are hosted */
    DIST_URL: isLocal
      ? 'localhost:4500'
      : '//accounts.ferant.io',
    /** Where the contents of the `public` folder are hosted (might be the same as `config.app.DIST_URL`) */
    PUBLIC_URL: isLocal
      ? 'localhost:4500'
      : '//accounts.ferant.io',
    /** Where the main redirect should go to */
    MAIN_APP_URL: isLocal
    ? 'localhost:8080'
    : '//accounts.ferant.io',

    IS_LOCAL: isLocal,

    ACCOUNTS_URL: isLocal ? 'localhost:4500' : '//accounts.ferant.io',
  },
  /** Feature flags */
  features: {
    searchBar: false,
    courses: false,
    profile: {
      identity: {
        assets: false,
      },
      goals: false,
    },
    todos: {
      removeData: false,
      reformatOldData: true,
    },
  },
};

export type Config = typeof config;
export default config;
