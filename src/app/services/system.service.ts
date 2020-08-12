import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SupportedLanguage } from '../models/supported-language.model';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  getSystemVariable(): Observable<any> {
    return this.http.get<any>(`/api/system`);
  }

  //getSupportedLanguages(languageCode): Observable<SupportedLanguage[]> {
  //  return this.http.get<any>(`/api/system/getSupportedLanguages/${languageCode}`);
  //}
}
