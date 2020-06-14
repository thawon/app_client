import { Injectable, Inject } from '@angular/core';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LocalStroageService } from './local-stroage.service';
import { UserService } from './user.service';
import { SystemService } from './system.service';
import { TranslateService } from '@ngx-translate/core';

declare var liff: any;

@Injectable({
  providedIn: 'root'
})
export class LineLIFFService {

  // default to ture bacause then on the client app it will not show first and hide later.
  isClientApp: boolean = true;    

  LIFFId: string;
  lineAtId: string;

  constructor(
    private auth: AuthInterceptorService,
    private localStorage: LocalStroageService,
    private user: UserService,
    private system: SystemService,
    public translate: TranslateService) { }
  
  isLoggedIn() {
    return new Promise((resolve, reject) => {
      
      // parsing query string
      const queryString = decodeURIComponent(window.location.search).replace('?liff.state=', '');
      const params = new URLSearchParams(queryString);

      if (params.get('route')) {
        this.localStorage.setItem('route', params.get('route'));
        this.localStorage.setItem('id', params.get('id'));
        
        this.localStorage.setItem('fromLanguageCode', params.get('fromLanguageCode'));
        this.localStorage.setItem('toLanguageCode', params.get('toLanguageCode'));
      }

      return this.system.getSystemVariable().toPromise()
        .then((system) => {

          this.LIFFId = system.LIFFId;
          this.lineAtId = system.lineAtId;

          return Promise.resolve(liff.init({ liffId: this.LIFFId }))
        })
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login();
          } else {

            // set language
            let language = liff.getLanguage(),
              code = language.substring(0, language.indexOf('-'))
            this.translate.use(code);           

            this.isClientApp = liff.isInClient();

            return Promise.resolve(liff.getProfile())
          }
        })
        .then((p) => {
          this.user.userId = p.userId;
          this.user.displayName = p.displayName;

          return this.user.isCheckFriendWithLigo(p.userId).toPromise();
        })
        .then((res: any) => {
          if (!res.status) {
            // user is not friend with Ligo, user must be friended with Ligo to use the service.
            if (this.isClientApp) {
              // send a message to chat room, asking user to add Ligo as friend.
              this.sendMessage('To use service, please add Ligo as friend. ' + `http://line.me/ti/p/%40${this.lineAtId}`)
                .then(() => {
                  liff.closeWindow();
                })
                .catch((err) => {
                  console.log('error', err);
                });
            } else {
              // redirect to adding Ligo as friend page.
              window.location.href = `http://line.me/ti/p/%40${this.lineAtId}`;
            }
          } else {
            return Promise.resolve(this.auth.getToken({ name: this.user.displayName, id: this.user.userId }))
          }
        })
        .then((token: string) => {
          this.localStorage.setItem('token', token);
          resolve(liff.isLoggedIn());
        })
        .catch((err) => {
          reject(err);
        });

    });
  }

  sendMessage(message: string) {
    return liff.sendMessages([{ type: 'text', text: message }]);
  }

  sendMessageAndClose(message: string) {
    return liff.sendMessages([{ type: 'text', text: message }])
      .then(() => {
        liff.closeWindow();
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  //init(liffId) {
  //  return new Promise((resolve, reject) => {
  //    return Promise.resolve(liff.init({ liffId: liffId }))
  //      .then(() => {
  //        if (!liff.isLoggedIn()) {
  //          liff.login();
  //        } else {

  //          // set language
  //          let language = liff.getLanguage(),
  //            code = language.substring(0, language.indexOf('-'))
  //          this.translate.use('th');

  //          this.isClientApp = liff.isInClient();

  //          return Promise.resolve(liff.getProfile())
  //        }
  //      })
  //      .then((p) => {
  //        return Promise.resolve(this.auth.getToken({ name: p.displayName, id: p.userId }))
  //      })
  //      .then((token: string) => {
  //        this.localStorage.setItem('token', token);
  //        resolve(liff.isLoggedIn());
  //      })
  //      .catch((err) => {
  //        reject(err);
  //      });
  //  })
  //}

  //isLoggedIn() {
  //  return new Promise((resolve, reject) => {
  //    return this.init('1654064299-5zNao6gm')
  //      .then((isLoggedIn) => {
  //        resolve(isLoggedIn);
  //      })
  //      .catch((err) => {
  //        reject(err);
  //      });
  //  });
  //}

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
