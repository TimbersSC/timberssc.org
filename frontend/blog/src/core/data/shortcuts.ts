// export const CATEGORY_NAMES = {
//   general: 'GENERAL',
//   navigation: 'NAVIGATION',
//   issues: 'ISSUES',
//   settings: 'SETTINGS',
// };

export type CATEGORY_NAMES = 'general' | 'navigation' | 'issues' | 'settings';

export interface ShortcutDetails {
  sequence: string;
  description: string;
}

type Shortcuts = {
  [category in CATEGORY_NAMES]: {
    [name: string]: ShortcutDetails;
  };
};

/**
 * Standardized, one-stop-shop for shortcuts.
 */
export const SHORTCUTS: Readonly<Shortcuts> = {
  general: {
    shortcuts: {
      sequence: 'ctrl+/',
      description: 'Open the keyboard shortcuts pane',
    },
    closure: {
      sequence: 'esc',
      description: 'Close modals and panes',
    },
    createTask: {
      sequence: 'c',
      description: 'Create an issue quickly',
    },
    signout: {
      sequence: 'alt+up+q',
      description: 'Sign out',
    },
  },
  navigation: {
    userMenu: {
      sequence: 'o+u',
      description: 'Open user menu',
    },
    navMenu: {
      sequence: 'o+n',
      description: 'Open navigation menu',
    },
    dashboard: {
      sequence: 'g+d',
      description: 'Go to dashboard',
    },
    taskManager: {
      sequence: 'g+t',
      description: 'Go to task manager',
    },
    courses: {
      sequence: 'g+c',
      description: 'Go to courses',
    },
    bridge: {
      sequence: 'g+b',
      description: 'Go to bridge',
    },
    settings: {
      sequence: 'g+s',
      description: 'Go to settings',
    },
    profile: {
      sequence: 'o+m',
      description: 'Open my profile',
    },
  },
  issues: {},
  settings: {},
};
