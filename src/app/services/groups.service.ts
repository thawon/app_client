import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getGroup(id: string): Observable<Group> {
    return this.http.get<Group>(`/api/groups/${id}`);    
  }

  saveGroup(group): Observable<Group> {
    return this.http.put<Group>(`/api/groups/${group.id}`, group);
  }

  // check if the user is a member of the group, if not, add user as member of the group.
  addMember(messengerUserId, groupId): Observable<any> {
    return this.http.get<any>(`/api/addMember/${messengerUserId}/${groupId}`);
  }
}
