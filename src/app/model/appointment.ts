import { ApiBaseResponse } from '@networking';
import { z } from 'zod';

import { User } from './user';

export enum BookingStatus {
  CANCELLED = 'CANCELLED',
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

export type AppointmentCreateBody = z.input<typeof appointmentCreateBodySchema>;

export type AppointmentApiResponse = ApiBaseResponse<Appointment>;
