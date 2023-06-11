import { ThemeType } from '@theme';

import { User } from './user';

export interface AppState {
  internetState: boolean;

  profile: User | null;

  token: string | undefined;

  loadingApp: boolean;

  showDialog: boolean;

  theme: ThemeType;
}

export enum TimeFormat {
  TWELVE_HOUR = 'h:mma',
  TWENTY_FOUR_HOUR = 'HH:mm',
}
