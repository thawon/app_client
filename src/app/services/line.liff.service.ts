import { Injectable } from '@angular/core';
import { AuthInterceptorService } from './auth-interceptor.service';

declare var liff: any;

@Injectable({
  providedIn: 'root'
})
export class LineLIFFService {

  constructor(
    private auth: AuthInterceptorService) { }
  
  init(liffId) {
    return new Promise((resolve, reject) => {
      liff.init({ liffId: liffId })
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login();
          } else {
                       
            liff.getProfile()
              .then(p => {
                this.auth.getToken({ name: p.displayName, id: p.userId })
                  .then((token) => {
                    localStorage.setItem('token', token.toString())
                    resolve();
                  })
                  .catch(err => {
                    reject(err)
                  });
              }).catch(err => {
                reject(err)
              });
          }
        })
        .catch((err) => {
          reject(err)
        });    
    })
    
  }

  closeWindow() {
    liff.closeWindow()
  }

  isLoggedIn(): boolean {    
    return liff.init({ liffId: '1654064299-5zNao6gm' })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          return liff.isLoggedIn();
        }
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
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

}
