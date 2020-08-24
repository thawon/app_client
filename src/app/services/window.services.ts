import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowWrapperService {

  constructor() { }

  getDecodeURIComponent():string {
    return decodeURIComponent(window.location.search).replace('?liff.state=', '');
  }

  redirect(url: string) {
    window.location.href = url;
  }

  jwtDecode(t) {
    let token: any = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return (token)
  }
}
