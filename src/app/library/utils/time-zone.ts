import { STORAGE_KEY_IS_24h } from '@common';
import { TimeFormat } from '@model/app';

import { loadString, save } from './storage';

export const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const setIs24hClockInLocalStorage = (is24h: boolean) =>
  save(STORAGE_KEY_IS_24h, is24h.toString());

export const getIs24hClockFromLocalStorage = () => {
  const is24hFromLocalStorage = loadString(STORAGE_KEY_IS_24h);

  if (is24hFromLocalStorage === null) {
    return null;
  }

  return is24hFromLocalStorage === 'true';
};

export const isBrowserLocale24h = () => {
  const localStorageTimeFormat = getIs24hClockFromLocalStorage();

  // If time format is already stored in the browser then retrieve and return early
  if (localStorageTimeFormat === true) {
    return true;
  } else if (localStorageTimeFormat === false) {
    return false;
  }

  // Intl.DateTimeFormat with value=undefined uses local browser settings.
  if (
    new Intl.DateTimeFormat(undefined, { hour: 'numeric' })
      .format(0)
      .match(/M/i)
  ) {
    setIs24hClockInLocalStorage(false);

    return false;
  } else {
    setIs24hClockInLocalStorage(true);

    return true;
  }
};

export const detectBrowserTimeFormat = isBrowserLocale24h()
  ? TimeFormat.TWENTY_FOUR_HOUR
  : TimeFormat.TWELVE_HOUR;
