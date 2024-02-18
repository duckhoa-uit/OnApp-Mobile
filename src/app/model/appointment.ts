import { ApiBaseResponse } from '@networking';
import { TypeOf, z } from 'zod';

import { Payment } from './payment';
import { User } from './user';

export enum BookingStatus {
  CANCELED = 'CANCELED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

export type Appointment = {
  id: number;
  uid: string;
  authorId: string | null;
  title: string;
  description: string | null;
  startTime: Date;
  endTime: Date;
  location: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  status: BookingStatus;
  paid: boolean;
  cancellationReason: string | null;
  rejectionReason: string | null;
  rescheduled: boolean | null;
  fromReschedule: string | null;
  recurringEventId: string | null;
  smsReminderNumber: string | null;
  attendees?: User[];
  createdBy?: User;
};

export type AppointmentFilter =
  | 'upcoming'
  | 'past'
  | 'canceled'
  | 'unconfirmed';

export interface AppointmentState {
  filter: AppointmentFilter;
  appointments: Appointment[];
}

export const appointmentCreateBodySchema = z.object({
  end: z.string(),
  eventTypeId: z.number(),
  eventTypeSlug: z.string().optional(),
  rescheduleUid: z.string().optional(),
  recurringEventId: z.string().optional(),
  start: z.string(),
  timeZone: z.string(),
  user: z.union([z.string(), z.array(z.string())]).optional(),
  language: z.string(),
  bookingUid: z.string().optional(),
  seatReferenceUid: z.string().optional(),
});

export const getUserAppointmentsSchema = z.object({
  query: z.object({
    filters: z.object({
      userIds: z.string().array().optional(),
      status: z.enum(['upcoming', 'past', 'canceled', 'unconfirmed']),
      eventTypeIds: z.number().array().optional(),
    }),
    limit: z.number().min(1).max(100).nullish(),
    // <-- "cursor" needs to exist when using useInfiniteQuery, but can be any type
    cursor: z.number().nullish(),
  }),
});

export type GetUserAppointmentsQueryParams = TypeOf<
  typeof getUserAppointmentsSchema
>['query'];

export type AppointmentCreateBody = z.input<typeof appointmentCreateBodySchema>;

export type AppointmentApiResponse = ApiBaseResponse<
  Appointment & { payment: Payment }
>;
