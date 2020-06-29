export class Correction {
  offset: number;
  length: number;
  message: string;
  issueType: string;
  replacements: string[];

  constructor(obj?: any) {
    this.offset = obj && obj.offset || null;
    this.length = obj && obj.length || null;
    this.message = obj && obj.message || null;
    this.issueType = obj && obj.issueType || null;
    this.replacements = obj && obj.replacements || null;
  }
}
