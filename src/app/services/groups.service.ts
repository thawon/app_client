import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Group } from '../models/group.model';
import { ConnectedGroup } from '../models/connected-group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getGroup(id: string, messengerUserId: string): Observable<any> {
    return this.http.get<Group>(`/api/groups/${id}/${messengerUserId}`);
  }

  getGroupMembersPermission(id: string, messengerUserId: string): Observable<any> {
    return this.http.get<any>(`/api/group-member-permission/${id}/${messengerUserId}`);
  }

  getMemberPermissions(id: string, messengerUserId: string): Observable<any> {
    return this.http.get<Group>(`/api/member-permissions/${id}/${messengerUserId}`);
  }

  saveGroup(group): Observable<Group> {
    return this.http.put<Group>(`/api/groups/${group.id}`, group);
  }

  saveMemberPermissions(data): Observable<any> {
    return this.http.put<any>(`/api/member-permissions`, data);
  }

  // check if the user is a member of the group, if not, add user as member of the group.
  addMember(messengerUserId, groupId): Observable<any> {
    return this.http.get<any>(`/api/addMember/${messengerUserId}/${groupId}`);
  }

  getTranslationLanguage(groupId, messengerUserId): Observable<any> {
    return this.http.get<any>(`/api/getTranslationLanguage/${groupId}/${messengerUserId}`);
  }
}

