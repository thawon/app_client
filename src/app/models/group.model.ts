import { Member } from './member.model';

export class Group {
  id: string;
  name: string;
  members: Array<Member>;
  groupType: string;
  languageCode: string;
  connectedGroup: any;

  constructor() {}
}
