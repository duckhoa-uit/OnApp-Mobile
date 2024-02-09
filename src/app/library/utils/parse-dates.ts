import { TimeFormat } from '@model/app';

import dayjs, { type ConfigType, Dayjs } from './dayjs';
import { parseZone } from './parse-zone';
import { detectBrowserTimeFormat } from './time-zone';

type ExtraOptions = {
  withDefaultTimeFormat?: boolean;
  selectedTimeFormat?: TimeFormat;
};

const processDate = (
  date: string | null | Dayjs,
  language: string,
  options?: ExtraOptions,
) => {
  const parsedZone = parseZone(date as ConfigType);

  if (!parsedZone?.isValid()) {
    return 'Invalid date';
  }

  const formattedTime = parsedZone?.format(
    options?.withDefaultTimeFormat
      ? TimeFormat.TWELVE_HOUR
      : options?.selectedTimeFormat || detectBrowserTimeFormat,
  );

  return (
    formattedTime +
    ', ' +
    dayjs(date as ConfigType)
      .toDate()
      .toLocaleString(language, { dateStyle: 'full' })
  );
};

export const parseDate = (
  date: string | null | Dayjs,
  language: string,
  options?: ExtraOptions,
) => {
  if (!date) {
    return ['No date'];
  }

  return processDate(date, language, options);
};
