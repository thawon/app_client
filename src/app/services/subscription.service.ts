import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(public http: HttpClient) { }

  trial(messengerUserId: string): Observable<any> {
    return this.http.get<any>(`/api/trial/${messengerUserId}`);
  }

  getPlans(messengerUserId: string): Observable<any> {
    return this.http.get<any>(`/api/plans/${messengerUserId}`);
  }

  subscribe(messengerUserId: string, priceId: string, tokenId: string): Observable<any> {
    return this.http.put<any>(`/api/subscribe/${messengerUserId}/${priceId}`, { tokenId: tokenId });
  }

  renew(messengerUserId: string, priceId: string): Observable<any> {
    return this.http.get<any>(`/api/renew-subscription/${messengerUserId}/${priceId}`);
  }

  cancel(custId: string): Observable<any> {
    return this.http.put<any>(`/api/cancel-subscription`, { custId: custId });
  }

  removePaymentMethod(custId: string, cardId: string): Observable<any> {
    return this.http.put<any>(`/api/remove-payment-method`, { custId: custId, cardId: cardId  });
  }
}
