import { Injectable, Inject } from '@angular/core';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LocalStroageService } from './local-stroage.service';
import { UserService } from './user.service';
import { SystemService } from './system.service';
import { WindowWrapperService } from './window.services';
import { LineLIFFWrapperService } from './line.liffWrapper.service';
import { TranslateService } from '@ngx-translate/core';

//declare var liff: any;

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
    private windowWrapper: WindowWrapperService,
    private liff: LineLIFFWrapperService,
    public translate: TranslateService) { }

  liffWrapper: any = {};
  userService: any = {};
  localStorageService: any = {};
  windowWrapperService: any = {};

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      
      // parsing query string
      const queryString = this.windowWrapper.getDecodeURIComponent();
      const params = new URLSearchParams(queryString);

      if (params.get('route')) {
        this.localStorage.setItem('route', params.get('route'));
        this.localStorage.setItem('id', params.get('id'));
        this.localStorage.setItem('urlLang', params.get('lang'));
      } 

      // workaround methods lose references during unit test
      this.liffWrapper.isLoggedIn = this.liff.isLoggedIn;
      this.liffWrapper.isInClient = this.liff.isInClient;
      this.liffWrapper.init = this.liff.init;
      this.liffWrapper.login = this.liff.login;
      this.liffWrapper.getLanguage = this.liff.getLanguage;
      this.liffWrapper.getProfile = this.liff.getProfile;
      this.liffWrapper.sendMessages = this.liff.sendMessages;
      this.liffWrapper.closeWindow = this.liff.closeWindow;

      this.userService.http = this.user.http;
      this.userService.isCheckFriendWithLigo = this.user.isCheckFriendWithLigo;

      this.localStorageService.getItem = this.localStorage.getItem;
      this.localStorageService.setItem = this.localStorage.setItem;

      this.windowWrapperService.jwtDecode = this.windowWrapper.jwtDecode;
      this.windowWrapperService.redirect = this.windowWrapper.redirect;

      //return this.system.getSystemVariable().toPromise()
      //  .then((system) => {

      //    this.LIFFId = system.LIFFId;
      //    this.lineAtId = system.lineAtId;

      //    this.system.trialPeriodLength = system.trialPeriodLength;
      //    this.system.SUBSCRIPTION_STATUS_TYPE = system.SUBSCRIPTION_STATUS_TYPE;
      //    this.system.maxDailyCharQuota = system.maxDailyCharQuota;
      //    this.system.minPrice = system.minPrice;
      //    this.system.ligoWebsiteUrl = system.ligoWebsiteUrl;

      //    // set language
      //    let code = 'en';

      //    this.translate.use(code);
      //    this.user.language = code;
      //    this.user.userId = 'Uacdb08c33ec68d486bfaa9b63a559133';
      //    this.user.displayName = 'Michael Jr. Wright';

      //    return this.auth.getToken({ name: this.user.displayName, id: this.user.userId });
      //  })
      //  .then((token: string) => {
      //    this.localStorageService.setItem('token', token);
      //    resolve(true);
      //  })
      //  .catch((err: Error) => {
      //    reject(err);
      //  });

      return this.system.getSystemVariable().toPromise()
        .then((system) => {

          this.LIFFId = system.LIFFId;
          this.lineAtId = system.lineAtId;
          this.system.trialPeriodLength = system.trialPeriodLength;
          this.system.SUBSCRIPTION_STATUS_TYPE = system.SUBSCRIPTION_STATUS_TYPE;
          this.system.maxDailyCharQuota = system.maxDailyCharQuota;
          this.system.minPrice = system.minPrice;
          this.system.ligoWebsiteUrl = system.ligoWebsiteUrl;

          return Promise.resolve(this.liffWrapper.init(this.LIFFId));
        })
        .then(() => {
          
          if (!this.liffWrapper.isLoggedIn()) {
            this.liffWrapper.login();
          }

          // set language
          let urlLang = this.localStorage.getItem('urlLang'),
             code = this.localStorage.getItem('lang');

          // set code to url language when there is not user selected language
          code = (!code) ? urlLang : code;

          // when language cannot be obtained or language is not supported, set default language to English
          code = (code !== 'en'
            && code !== 'th'
            && code !== 'zh'
            && code !== 'ja'
            && code !== 'it'
            && code !== 'es'
            && code !== 'ko'
            && code !== 'id'
            && code !== 'vi'
            && code !== 'de'
            && code !== 'pt'
            && code !== 'fr'
            && code !== 'tr'
            && code !== 'ru'
          ) ? 'en' : code;
          
          this.translate.use(code);
          this.user.language = code;

          this.isClientApp = this.liffWrapper.isInClient();
          
          return Promise.resolve(this.liffWrapper.getProfile());
        })
        .then((p) => {
          this.user.userId = p.userId;
          this.user.displayName = p.displayName;   
                    
          return this.userService.isCheckFriendWithLigo(p.userId).toPromise();
        })
        .then((friend: any) => {          
          if (!friend.status) throw new Error('UserIsNotFriended');
          
          // always get new token
          return this.auth.getToken({ name: this.user.displayName, id: this.user.userId });   
        })
        .then((token: string) => {          
          this.localStorageService.setItem('token', token);
          resolve(this.liffWrapper.isLoggedIn());
        })
        .catch((err: Error) => {
          if (err.message === 'UserIsNotFriended') {

            // user is not friend with Ligo, user must be friended with Ligo to use the service.
            if (this.isClientApp) {
              // send a message to chat room, asking user to add Ligo as friend.
              this.translate.get('addFriend').toPromise()
                .then((text: string) => {
                  let message = `show ${this.user.displayName} friend status.`;
                  return this.sendMessage(message);
                })
                .then(() => {
                  this.liffWrapper.closeWindow();

                  resolve(false);
                })
                .catch((err) => {
                  console.log('error', err);
                });
            } else {
              // redirect to adding Ligo as friend page.
              this.windowWrapperService.redirect(`http://line.me/ti/p/%40${this.lineAtId}`);
              resolve(false);
            }
          } else {
            reject(err);            
          }
        });

    });
  }

  sendMessage(message: string) {
    return this.liffWrapper.sendMessages(message);
  }

  sendMessageAndClose(message: string) {
    return this.liffWrapper.sendMessages(message)
      .then(() => {
        this.liffWrapper.closeWindow();
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
  
  closeWindow() {
    this.liffWrapper.closeWindow()
  }

  closeWindowAndSendMessage() {
    this.liffWrapper.sendMessages('Hello world')
      .then(() => {
        console.log('message sent');
        this.liffWrapper.closeWindow()
      })
      .catch((err) => {
        console.log('error', err);
      });   
  }  
}
