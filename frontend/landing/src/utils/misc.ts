import Config from '../config';

/**
 * General function to minimize the redundancy of code when redirecting the user back to [accounts.ferant.io](https://accounts.ferant.io).
 * @returns boolean
 */
export function redirectToAccounts(): boolean {
  window.location.href = `//${Config.app.ACCOUNTS_URL}/login?continue=${window.location.href}`;
  return false;
}

/**
 *
 * @returns
 */
export function greeting(): string {
  const today = new Date();
  const curHr = today.getHours();

  if (curHr < 12) {
    return 'Good morning';
  } else if (curHr < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

/**
 *
 * @param string
 * @returns
 */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param itemArray
 * @param key
 * @param ascending Default is `true`
 * @returns
 */
export function sortByValue<U>(
  itemArray: U[],
  key: keyof U,
  ascending = true,
): U[] {
  return itemArray.sort((a: U, b: U) => {
    const p1 = a[key] || 0,
      p2 = b[key] || 0;
    if (ascending) {
      if (p1 < p2) return -1;
      return 1;
    }
    if (p1 < p2) return 1;
    return -1;
  });
}

/**
 *
 * @param str
 * @returns
 */
export const convertSpacingIntoDashed = (str: string) => {
  if (str) {
    return str.replace(/\s+/g, '');
  }
  return str;
};

/**
 * General function to close details.
 *
 * @param e Click event
 */
export const closeDetails = (e: Event) => {
  if (e?.target) {
    const target = e.target as HTMLInputElement;
    target.closest('.details-overlay')?.removeAttribute('open');
  }
};

/**
 * Set the page title
 *
 * @param title string or array of strings.
 */
export const setDocumentTitle = (title: string | string[] | void) => {
  let newTitle = '';
  if (Array.isArray(title)) {
    title.forEach((element: string) => {
      newTitle += `${element} · `;
    });
  } else if (title) {
    newTitle = `${title} · `;
  }

  document.title = `${newTitle}Ferant`;
};
