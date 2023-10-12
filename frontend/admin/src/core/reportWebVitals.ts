import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import type { ReportCallback } from 'web-vitals';

export const reportWebVitals = (onPerfEntry?: ReportCallback) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};
