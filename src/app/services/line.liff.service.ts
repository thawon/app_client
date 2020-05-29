import { Injectable } from '@angular/core';

declare var liff: any;

@Injectable({
  providedIn: 'root'
})
export class LineLIFFService {

  constructor() { }
  
  init(liffId) {
    liff.init({ liffId: liffId })
      .then(() => {       
        if (!liff.isLoggedIn()) liff.login();
      })
      .catch((err) => {        
        console.log(err.code, err.message);
      });    
  }

  closeWindow() {
    liff.closeWindow()
  }

  //liff.sendMessages([
    //  {
    //    type: 'text',
    //    text: 'Hello, World!'
    //  }
    //])
    //  .then(() => {
    //    console.log('message sent');
    //  })
    //  .catch((err) => {
    //    console.log('error', err);
    //  });

  getLineProfile() {
    return new Promise((resolve, reject) => {
      liff.getProfile(data => {
        resolve(data)
      }, err => {
        reject(err)
      })
    })
  }
}
