import { Injectable, Inject } from '@angular/core';

declare var liff: any;

@Injectable({
  providedIn: 'root'
})
export class LineLIFFWrapperService {
  

  constructor() { }

  init(liffId: string) {
    return new Promise((resolve, reject) => {
      resolve(liff.init({ liffId: liffId }));
    });
  }

  getProfile(): any {
    return new Promise((resolve, reject) => {
      resolve(liff.getProfile());
    });
  }

  isInClient(): boolean {
    return liff.isInClient();
  }

  isLoggedIn(): boolean {
    return liff.isLoggedIn();
  }

  login() {
    liff.login();
  }

  getLanguage(): string {
    return liff.getLanguage();
  }

  closeWindow() {
    liff.closeWindow();
  }

  sendMessages(message: string) {
    return new Promise((resolve, reject) => {
      resolve(liff.sendMessages([{ type: 'text', text: message }]));
    });
  }
}
