import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStroageService {

  constructor() { }

  getItem(name: string) {
    return localStorage.getItem(name);
  }

  setItem(name: string, value: any) {
    localStorage.setItem(name, value);
  }

  removeItem(name: string) {
    localStorage.removeItem(name)
  }
}
