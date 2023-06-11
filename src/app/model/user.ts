import { ApiBaseResponse } from '@networking';

import { EventType } from './event-type';

export type UserRole = 'USER' | 'CONSULTER' | 'ADMIN';

export type UserProfile = {
  id: string;
  userId: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  cv: string | null;
  facebook: string | null;
  github: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedIn: string | null;
};

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string | null;
  photo?: string;
  profile?: UserProfile;
  role: UserRole;
  timeZone: string;
  weekStart: string;
  locale: string | null;
  timeFormat: 12 | 24;
  createdAt: string;
  updatedAt: string;
  locationId: number | null;
  mediaPublicId: number | null;
  defaultScheduleId: number | null;
  eventTypes?: EventType[];
};

export type UserApiGetResponse = ApiBaseResponse<User>;
