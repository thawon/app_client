import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  getSystemVariable(): Observable<any> {
    return this.http.get<any>(`/api/system`);
  }
}
