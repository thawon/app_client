import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class SystemService {  
  public group: Group = null;
  public trialPeriodLength: number;
  public SUBSCRIPTION_STATUS_TYPE: any;
  public maxDailyCharQuota: number;

  constructor(private http: HttpClient) { }

  getSystemVariable(): Observable<any> {
    return this.http.get<any>(`/api/system`);
  }

  logError(data): Observable<any> {
    return this.http.put<any>(`/api/logFrontEndError`, data);
  }

}
