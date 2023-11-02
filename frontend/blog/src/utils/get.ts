/** Third-party modules */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

/** */
import { capitalizeFirstLetter } from './misc';

dayjs.extend(relativeTime);
dayjs.extend(utc);

/**
 * Return the domain from an email.
 *
 * @param email
 * @returns
 */
export function getDomain(email: string): string {
  return email.substring(email.lastIndexOf('@') + 1) || '';
}

/**
 * Return the date in the format MMM D. `May 7`
 */
export function getMonthDate(date?: string): string {
  if (date) {
    return dayjs(date).format('MMM D');
  }
  return dayjs().format('MMM D');
}

/**
 *
 * @returns
 */
export function getToday(): string {
  return new Date().toISOString();
}

/**
 *
 * @param date
 * @returns
 */
export function getIsoDate(date?: string): string {
  if (date) {
    const newDate = new Date(date);
    return newDate.toISOString();
  }
  return new Date().toISOString();
}

interface getRelativeTimeReturn {
  time: string;
  diff: number;
}
/**
 *
 * @param date
 * @returns
 */
export function getRelativeTime(
  date: string,
  endOf = true,
): getRelativeTimeReturn {
  let diff = dayjs().diff(date, 'days');
  if (endOf) {
    diff = dayjs().startOf('day').diff(date, 'days');
  }
  const result: getRelativeTimeReturn = {
    time: '',
    diff: diff,
  };

  if (diff <= 7 && diff >= -7) {
    if (endOf) {
      result.time = dayjs(date).startOf('day').fromNow().toString();
    } else {
      result.time = dayjs(date).fromNow().toString();
    }
  } else if (diff >= 365) {
    result.time = formatDateToReadable(date);
  } else {
    result.time = getMonthDate(date);
  }

  return result;
}

/**
 * Normalize a date into human readable format.
 *
 * If today is `May 7, 2022`, the returned value will be `Today`.
 *
 * @param date `string` date.
 * @returns `string` date that's human readable.
 */
export function getDueDateNormalized(date: string): string {
  const { time, diff } = getRelativeTime(date);
  const tomorrow = dayjs().add(1, 'day').startOf('day');
  const yesterday = dayjs().subtract(1, 'day').startOf('day');

  if (dayjs(date).isSame(dayjs(), 'day')) {
    return 'Today';
  }
  if (dayjs(date) <= tomorrow && dayjs(date) >= dayjs().startOf('day')) {
    return 'Tomorrow';
  }
  if (dayjs(date) >= yesterday && dayjs(date) <= dayjs().startOf('day')) {
    return 'Yesterday';
  }
  return time;
}

/**
 * Format today's date; ie. `Sat May 7`
 * @returns today's date in the format `dddd MMM D`.
 */
export function getTodayFormatted(date?: string): string {
  if (date) {
    return dayjs(date).format('ddd MMM D');
  }
  return dayjs().format('ddd MMM D');
}

/**
 * Format today's date; ie. `7`
 * @returns today's date in the format `D`.
 */
export function getTodayDay() {
  return dayjs().format('D');
}

/**
 *
 * @param date
 * @returns
 */
export function getDay(date: string): string {
  return dayjs(date).format('dddd');
}

/**
 *
 * @param endDate
 * @param startDate
 * @returns
 */
export function getDateRange(endDate: string, startDate?: string): string[] {
  let current = dayjs(startDate);
  const end = dayjs(endDate);
  const dates: any[] = [];
  while (current < end) {
    dates.push(current.format('YYYY-MM-DD').toString());
    current = current.add(1, 'day');
  }
  return dates;
}

/**
 *
 * @param date
 * @returns
 */
export function formatDateToString(date?: string): string {
  return dayjs(date).format('YYYY-MM-DD').toString();
}

/**
 *
 * @param date
 * @returns
 */
export function formatDateToReadable(date?: string): string {
  return dayjs(date).format('MMM DD, YYYY').toString();
}

/**
 *
 * @param date
 * @returns
 */
export function getEndOfDay(date: string): dayjs.Dayjs {
  return dayjs(date).startOf('day');
}

export function getDate(number: number, timeframe: string) {
  return dayjs()
    .add(number as any, timeframe as dayjs.ManipulateType)
    .startOf('day');
}

export function getBrowserLanguage(): string {
  return (window.navigator as any).userLanguage || window.navigator.language;
}

export function findDuplicates<U>(arr: U[], key: keyof U) {
  const sorted_arr: U[] = arr.slice();
  const results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1][key] === sorted_arr[i][key]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
}

export function getLocalTime(date: string | void): string {
  let _dayjs = dayjs();
  if (date) {
    _dayjs = dayjs(date);
  }
  return _dayjs.utc().local().toString();
}

/**
 * Extract any and all emails from the string argument.
 *
 * @param content {string} value from the input element
 * @returns array of strings representing an email or nothing
 */
export function emailExtractor(content: string): string[] | void {
  const emailList = content.match(
    /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
  );

  if (emailList === null) {
    // no Email Address Found
  } else {
    const uniqueEmail = Array.from(new Set(emailList));
    const finalUniqueEmail = [];
    for (let i = 0; i <= uniqueEmail.length; i++) {
      const characterIs = String(uniqueEmail[i]).charAt(
        String(uniqueEmail[i]).length - 1,
      );
      if (characterIs === '.') {
        finalUniqueEmail.push(String(uniqueEmail[i].slice(0, -1)));
      } else {
        finalUniqueEmail.push(uniqueEmail[i]);
      }
    }

    return finalUniqueEmail
      .filter((email) => email)
      .map((email) => email.toLowerCase().trim());
  }
}

/*  */
export const readableSeconds = (time: number): string => {
  const dateObj = new Date(time * 1000);
  return `${dateObj.getUTCMinutes().toString().padStart(2, '0')}:${dateObj
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
};
