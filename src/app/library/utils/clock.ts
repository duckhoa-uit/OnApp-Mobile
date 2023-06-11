// handles logic related to user clock display using 24h display / timeZone options.
import { STORAGE_KEY_TIME_ZONE } from '@common';

import dayjs from './dayjs';
import { loadString, saveString } from './storage';
import {
  getIs24hClockFromLocalStorage,
  isBrowserLocale24h,
  setIs24hClockInLocalStorage,
} from './time-zone';

interface TimeOptions {
  is24hClock: boolean;
  inviteeTimeZone: string;
}

const timeOptions: TimeOptions = {
  is24hClock: false,
  inviteeTimeZone: '',
};

const isInitialized = false;

const initClock = () => {
  if (isInitialized) {
    return;
  }

  // This only sets browser locale if there's no preference on localStorage.
  if (getIs24hClockFromLocalStorage() === null) {
    set24hClock(isBrowserLocale24h());
  }

  timeOptions.is24hClock = !!getIs24hClockFromLocalStorage();

  timeOptions.inviteeTimeZone =
    loadString(STORAGE_KEY_TIME_ZONE) || dayjs.tz.guess();
};

const is24h = (is24hClock?: boolean) => {
  initClock();

  if (typeof is24hClock !== 'undefined') {
    set24hClock(is24hClock);
  }

  return timeOptions.is24hClock;
};

const set24hClock = (is24hClock: boolean) => {
  setIs24hClockInLocalStorage(is24hClock);

  timeOptions.is24hClock = is24hClock;
};

function setTimeZone(selectedTimeZone: string) {
  saveString(STORAGE_KEY_TIME_ZONE, selectedTimeZone);

  timeOptions.inviteeTimeZone = selectedTimeZone;
}

const timeZone = (selectedTimeZone?: string) => {
  initClock();

  if (selectedTimeZone) {
    setTimeZone(selectedTimeZone);
  }

  return timeOptions.inviteeTimeZone;
};

export { is24h, timeZone };
