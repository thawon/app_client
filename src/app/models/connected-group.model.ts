export class ConnectedGroup {
  groupId: string;
  name: string;
  languageCode: string

  constructor(obj?: any) {
    this.groupId = obj && obj.groupId || null;
    this.name = obj && obj.name || '-';
    //this.languageCode = obj && obj.languageCode || supportedLanguages.notSpecified.key;
  }
}
