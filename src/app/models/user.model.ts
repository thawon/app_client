export class User {
  id: string;
  messengerUserId: string;
  name: string;
  createdAt: Date;  
  language: string;
  pictureUrl: string;
  charUsed: number;
  topUpAt: Date;
  subscription: any;
  nextBillingAt: Date;
  card: any;
  custId: string;
  receipts: any;

  constructor() {}
}
