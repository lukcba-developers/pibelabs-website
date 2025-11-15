import type { SupportedLanguage } from "./config";

/* ============================================
   i18n Formatters - Dates, Numbers, Currency
   ============================================ */

/**
 * Format a date according to the locale
 */
export const formatDate = (
  date: Date | string,
  locale: SupportedLanguage,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
    dateObj,
  );
};

/**
 * Format a relative date (e.g., "hace 2 días", "2 days ago")
 */
export const formatRelativeDate = (
  date: Date | string,
  locale: SupportedLanguage,
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  // Calculate time units
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  let value: number;
  let unit: Intl.RelativeTimeFormatUnit;

  if (diffInSeconds < minute) {
    value = -diffInSeconds;
    unit = "second";
  } else if (diffInSeconds < hour) {
    value = -Math.floor(diffInSeconds / minute);
    unit = "minute";
  } else if (diffInSeconds < day) {
    value = -Math.floor(diffInSeconds / hour);
    unit = "hour";
  } else if (diffInSeconds < week) {
    value = -Math.floor(diffInSeconds / day);
    unit = "day";
  } else if (diffInSeconds < month) {
    value = -Math.floor(diffInSeconds / week);
    unit = "week";
  } else if (diffInSeconds < year) {
    value = -Math.floor(diffInSeconds / month);
    unit = "month";
  } else {
    value = -Math.floor(diffInSeconds / year);
    unit = "year";
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  return rtf.format(value, unit);
};

/**
 * Format a number according to the locale
 */
export const formatNumber = (
  num: number,
  locale: SupportedLanguage,
  options?: Intl.NumberFormatOptions,
): string => {
  return new Intl.NumberFormat(locale, options).format(num);
};

/**
 * Format currency according to the locale
 */
export const formatCurrency = (
  amount: number,
  locale: SupportedLanguage,
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Format a percentage according to the locale
 */
export const formatPercent = (
  value: number,
  locale: SupportedLanguage,
  decimals: number = 0,
): string => {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

/**
 * Format a compact number (e.g., 1K, 1M)
 */
export const formatCompactNumber = (
  num: number,
  locale: SupportedLanguage,
): string => {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
};
