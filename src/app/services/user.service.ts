import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userId: string;
  public displayName: string;
  public language: string

  constructor(private http: HttpClient) { }

  isCheckFriendWithLigo(messengerUserId): Observable<boolean> {
    return this.http.get<boolean>(`/api/checkFriendWithLigo/${messengerUserId}`);
  }
}
