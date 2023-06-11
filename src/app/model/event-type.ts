import { ApiBaseResponse } from '@networking';

import { User } from './user';

export type PeriodType = 'UNLIMITED' | 'ROLLING' | 'RANGE';

export type EventType = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  length: number;
  ownerId: string | null;
  eventName: string | null;
  timeZone: string | null;
  periodType: PeriodType;
  periodStartDate: Date | null;
  periodEndDate: Date | null;
  periodDays: number | null;
  periodCountCalendarDays: boolean | null;
  requiresConfirmation: boolean;
  seatsPerTimeSlot: number | null;
  seatsShowAttendees: boolean | null;
  scheduleId: number | null;
  price: number;
  currency: string;
  slotInterval: number | null;
  users?: User[];
  // metadata: Prisma.JsonValue | null
  // bookingLimits: Prisma.JsonValue | null
  // durationLimits: Prisma.JsonValue | null
};

export type EventTypeApiResponse = ApiBaseResponse<EventType>;
