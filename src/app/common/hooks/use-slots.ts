import { useEffect, useState } from 'react';

import { useQueryTimeSlots } from '@networking/slot/use-query-slots';
import { useIsFocused } from '@react-navigation/native';
import { Dayjs } from '@utils/dayjs';

const getRefetchInterval = (refetchCount: number): number => {
  const intervals = [3000, 3000, 5000, 10000, 20000, 30000] as const;

  return intervals[refetchCount] || intervals[intervals.length - 1];
};

export const useSlots = ({
  eventTypeId,
  eventTypeSlug,
  startTime,
  endTime,
  usernameList,
  timeZone,
  duration,
  enabled = true,
}: {
  eventTypeId: number;
  eventTypeSlug: string;
  startTime?: Dayjs;
  endTime?: Dayjs;
  usernameList: string[];
  timeZone?: string;
  duration?: string;
  enabled?: boolean;
}): {
  slots: Record<
    string,
    {
      time: string;
      users: string[];
    }[]
  >;
  isLoading: boolean;
} => {
  const isFocused = useIsFocused();

  const [refetchCount, setRefetchCount] = useState(0);

  const refetchInterval = getRefetchInterval(refetchCount);

  const {
    data: slots,
    isLoading,
    isPaused,
    fetchStatus,
  } = useQueryTimeSlots({
    variables: {
      eventTypeId,
      eventTypeSlug,
      usernameList,
      startTime: startTime ? startTime.toDate().toISOString() : '',
      endTime: endTime ? endTime.toDate().toISOString() : '',
      timeZone,
      duration,
    },
    enabled: isFocused && !!startTime && !!endTime && enabled,
    refetchInterval,
  });

  useEffect(() => {
    if (!!slots && fetchStatus === 'idle') {
      setRefetchCount(refetchCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus, slots]);

  // The very first time isPaused is set if auto-fetch is disabled, so isPaused should also be considered a loading state.
  return { slots: slots || {}, isLoading: isLoading || isPaused };
};
