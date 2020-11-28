import { MLTLanguageCode } from './mlt.model';

export class Member {
  id: string;
  userId: string;
  messengerUserId: string;
  name: string;
  pictureUrl: string;
  fromLanguageCode?: string;
  toLanguageCode?: string;
  MLTLanguageCodes?: [MLTLanguageCode]

  constructor() { }
}
