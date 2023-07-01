import { ApiBaseResponse } from '@networking';

export type Slot = {
  time: string;
  userIds?: number[];
  attendees?: number;
  bookingUid?: string;
  users?: string[];
};

export interface SlotState {
  slot?: Slot;

  eventTypeId?: number;
  eventSlug?: string;
  duration?: number;
  selectedDate?: Date;
  timeZone?: string;
}

export type ReserveSlotPayload = {
  eventTypeId: number;
  slotUtcStartDate: string;
  slotUtcEndDate: string;
  bookingAttendees?: number;
};

export type ReserveSlotResponse = ApiBaseResponse<string>;
