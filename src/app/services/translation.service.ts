import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Correction } from '../models/correction.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  translate(text: string, fromLanguageCode: string, toLanguageCode: string): Observable<any> {
    return this.http.get<any>(`/api/translate/${encodeURIComponent(text)}/${fromLanguageCode}/${toLanguageCode}`);
  }

  

  check(text: string, languageCode: string): Observable<Correction[]> {
    return this.http.get<any>(`/api/check/${encodeURIComponent(text)}/${languageCode}`);
  }
}
