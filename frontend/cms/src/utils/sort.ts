interface CoursesPeriod {
  period: string;
}
export function sortByPeriod(a: CoursesPeriod, b: CoursesPeriod): number {
  if (a.period && b.period) {
    if (a.period < b.period) {
      return -1;
    }
    if (a.period > b.period) {
      return 1;
    }
  }
  return 0;
}

export function sortBy(attr: string) {
  return (a: any, b: any): number => {
    if (a[attr] && b[attr]) {
      if (a[attr] < b[attr]) {
        return -1;
      }
      if (a[attr] > b[attr]) {
        return 1;
      }
    }
    return 0;
  };
}
