import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  translate(text: string, fromLanguageCode: string, toLanguageCode: string): Observable<any> {
    return this.http.get<any>(`/api/translate/${text}/${fromLanguageCode}/${toLanguageCode}`);
  }
}
