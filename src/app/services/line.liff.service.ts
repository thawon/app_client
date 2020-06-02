import { Injectable } from '@angular/core';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LocalStroageService } from './local-stroage.service';
import { TranslateService } from '@ngx-translate/core';

declare var liff: any;

@Injectable({
  providedIn: 'root'
})
export class LineLIFFService {

  // default to ture bacause then on the client app it will not show first and hide later.
  isClientApp: boolean = true;

  constructor(
    private auth: AuthInterceptorService,
    private localStorage: LocalStroageService,
    public translate: TranslateService) { }
  
  init(liffId) {
    return new Promise((resolve, reject) => {
      return Promise.resolve(liff.init({ liffId: liffId }))
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login();
          } else {

            // set language
            let language = liff.getLanguage(),
              code = language.substring(0, language.indexOf('-'))
            this.translate.use('th');

            this.isClientApp = liff.isInClient();

            return Promise.resolve(liff.getProfile())
          }
        })
        .then((p) => {
          return Promise.resolve(this.auth.getToken({ name: p.displayName, id: p.userId }))
        })
        .then((token:string) => {
          this.localStorage.setItem('token', token);
          resolve(liff.isLoggedIn());
        })
        .catch((err) => {
          reject(err);
        });
    })
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      return this.init('1654064299-5zNao6gm')
        .then((isLoggedIn) => {
          resolve(isLoggedIn);
        })
        .catch((err) => {
          reject(err);
        });
    })
    

    //return liff.init({ liffId: '1654064299-5zNao6gm' })
    //  .then(() => {
    //    if (!liff.isLoggedIn()) {
    //      liff.login();
    //    } else {
    //      return liff.isLoggedIn();
    //    }
    //  })
    //  .catch((err) => {
    //    console.log(err.code, err.message);
    //  });
  }

  closeWindow() {
    liff.closeWindow()
  }

  closeWindowAndSendMessage() {
    liff.sendMessages([
      {
        type: 'text',
        text: 'Hello, World!'
      }
    ])
      .then(() => {
        console.log('message sent');
        liff.closeWindow()
      })
      .catch((err) => {
        console.log('error', err);
      });
   
  }

  
}

      //liff.init({ liffId: liffId })
      //  .then(() => {
      //    if (!liff.isLoggedIn()) {
      //      liff.login();
      //    } else {

      //      liff.getProfile()
      //        .then(p => {
      //          this.auth.getToken({ name: p.displayName, id: p.userId })
      //            .then((token) => {
      //              localStorage.setItem('token', token.toString())
      //              resolve();
      //            })
      //            .catch(err => {
      //              reject(err)
      //            });
      //        }).catch(err => {
      //          reject(err)
      //        });
      //    }
      //  })
      //  .catch((err) => {
      //    reject(err)
      //  });    
