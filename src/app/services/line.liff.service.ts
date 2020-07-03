import { Injectable, Inject } from '@angular/core';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LocalStroageService } from './local-stroage.service';
import { UserService } from './user.service';
import { SystemService } from './system.service';
import { TranslateService } from '@ngx-translate/core';

declare var liff: any;

function jwtDecode(t) {
  let token:any = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  token.payload = JSON.parse(window.atob(t.split('.')[1]));
  return (token)
};

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
      } 

      return this.system.getSystemVariable().toPromise()
        .then((system) => {
          
          this.LIFFId = system.LIFFId;
          this.lineAtId = system.lineAtId;

          return Promise.resolve(liff.init({ liffId: this.LIFFId }));
        })
        .then(() => {
          
          if (!liff.isInClient() && !liff.isLoggedIn()) {
            liff.login();
          }
          
          // set language
          let language = liff.getLanguage(),
              code = language.substring(0, language.indexOf('-'));
          
          this.translate.use(code);

          this.isClientApp = liff.isInClient();
          
          return Promise.resolve(liff.getProfile());
        })
        .then((p) => {
          this.user.userId = p.userId;
          this.user.displayName = p.displayName;
          
          let isFriendedWithLigo = JSON.parse(this.localStorage.getItem('isFriendedWithLigo')),
            promise: any = Promise.resolve({ status: isFriendedWithLigo });

          if (!isFriendedWithLigo) {
            // system only checks whether user is friended with Ligo once,
            // it is up to the user, later if the user decidedly or accidentally unfriends ligo.
            // Therefore, the system does not check every time the user logins to the app,
            // this is to benefit the all over performance of the application

            promise = this.user.isCheckFriendWithLigo(p.userId).toPromise();
          }

          return promise;
        })
        .then((res: any) => {
          this.localStorage.setItem('isFriendedWithLigo', res.status);          

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
            let token = this.localStorage.getItem('token'),
              getToken: any = Promise.resolve(token);

            if (
              // token can mean first time access or cache has been cleared.
              !token
              // token return from local storage as it does not exist (undefined)
              || token === 'undefined'
              // when token is expired.
              || Date.now() >= jwtDecode(token).payload.exp * 1000) {
              getToken = this.auth.getToken({ name: this.user.displayName, id: this.user.userId });
            }

            return getToken;
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
