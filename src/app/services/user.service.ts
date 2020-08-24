import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userId: string;
  public displayName: string;
  public language: string

  constructor(public http: HttpClient) { }

  isCheckFriendWithLigo(messengerUserId): Observable<boolean> {
    return this.http.get<boolean>(`/api/checkFriendWithLigo/${messengerUserId}`);
  }

  register(messengerUserId): Observable<User> {
    return this.http.get<User>(`/api/register/${messengerUserId}`);
  }
}
