import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs'; // Add import

import { LineLIFFService } from './line.liff.service';
import { SystemService } from './system.service';
import { UserService } from './user.service';
import { LineLIFFWrapperService } from './line.liffWrapper.service';
import { LocalStroageService } from './local-stroage.service';
import { WindowWrapperService } from './window.services';
import { AuthInterceptorService } from './auth-interceptor.service';

class TranslateServiceStub {
  setDefaultLang(lang: string) { }
  use(lang: string) { }
  get(key: string): Observable<any> {
    return of('hello');
  }
}

describe('LineLIFFService', () => {
  let service: LineLIFFService;
  let systemService;
  let liffWrapperService;
  let userService;
  let translate;
  let localStorage;
  let windowWrapper;
  let auth;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LineLIFFService,
        //{ provide: SystemService, useClass: SystemServiceStub },
        //{ provide: LineLIFFWrapperService, useClass: LineLIFFWrapperService },
        { provide: TranslateService, useClass: TranslateServiceStub }        
      ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ]
    });

    service = TestBed.get(LineLIFFService);
    systemService = TestBed.get(SystemService);
    liffWrapperService = TestBed.get(LineLIFFWrapperService);
    userService = TestBed.get(UserService);
    translate = TestBed.get(TranslateService);
    localStorage = TestBed.get(LocalStroageService);
    windowWrapper = TestBed.get(WindowWrapperService);
    auth = TestBed.get(AuthInterceptorService);
  });

  it('should login, friended, valid stored token', (done) => {
    let systemVariable = {
      LIFFId: 'TEST_LIFFIDXXX',
      lineAtId: '@SomeTestLigoYYY'
    }, profile = {
      userId: 'Uacdb08c33ec68d486bfaa9b63a559131',
      displayName: 'Mr.A'
    };

    spyOn(systemService, 'getSystemVariable').and.returnValue(of(systemVariable));
    
    spyOn(liffWrapperService, 'isLoggedIn').and.returnValue(true);
    spyOn(liffWrapperService, 'init').and.returnValue(Promise.resolve());
    spyOn(liffWrapperService, 'getLanguage').and.returnValue('en');
    spyOn(liffWrapperService, 'isInClient').and.returnValue(true);
    spyOn(liffWrapperService, 'getProfile').and.returnValue(Promise.resolve(profile));

    spyOn(userService, 'isCheckFriendWithLigo').and.returnValue(of({ status: true }));

    spyOn(localStorage, 'getItem').and.returnValue({});
    spyOn(localStorage, 'setItem').and.callFake(() => { });

    spyOn(windowWrapper, 'jwtDecode').and.returnValue({ payload: { exp: 9999999999 } });

    spyOn(auth, 'getToken');


    service.isLoggedIn()
      .then(() => {
        expect(service).toBeTruthy();

        expect(service.LIFFId).toEqual(systemVariable.LIFFId);
        expect(service.lineAtId).toEqual(systemVariable.lineAtId);

        let user = TestBed.get(UserService);
        expect(user.language).toEqual('en');
        expect(user.userId).toEqual(profile.userId);
        expect(user.displayName).toEqual(profile.displayName);

        expect(systemService.getSystemVariable).toHaveBeenCalled();

        expect(userService.isCheckFriendWithLigo).toHaveBeenCalled();
        expect(auth.getToken).not.toHaveBeenCalled();

        expect(localStorage.setItem).toHaveBeenCalled();

        done();
      })
      .catch((err: Error) => {
        throw err;
      });
  });

  it('should login, friended, token is null', (done) => {
    let systemVariable = {
      LIFFId: 'TEST_LIFFIDXXX',
      lineAtId: '@SomeTestLigoYYY'
    }, profile = {
      userId: 'Uacdb08c33ec68d486bfaa9b63a559131',
      displayName: 'Mr.A'
    }, token = 'new token';

    spyOn(systemService, 'getSystemVariable').and.returnValue(of(systemVariable));

    spyOn(liffWrapperService, 'isLoggedIn').and.returnValue(true);
    spyOn(liffWrapperService, 'init').and.returnValue(Promise.resolve());
    spyOn(liffWrapperService, 'getLanguage').and.returnValue('en');
    spyOn(liffWrapperService, 'isInClient').and.returnValue(true);
    spyOn(liffWrapperService, 'getProfile').and.returnValue(Promise.resolve(profile));

    spyOn(userService, 'isCheckFriendWithLigo').and.returnValue(of({ status: true }));

    spyOn(localStorage, 'getItem')
      .withArgs('token').and.returnValue(null)
      .withArgs('lang').and.returnValue(null);

    spyOn(localStorage, 'setItem').and.callFake(() => { });

    spyOn(auth, 'getToken').and.returnValue(Promise.resolve(token));

    service.isLoggedIn()
      .then(() => {
        expect(auth.getToken).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
        done();
      })
      .catch((err: Error) => {
        throw err;
      });
  });

  it('should login, friended, token is expired', (done) => {
    let systemVariable = {
      LIFFId: 'TEST_LIFFIDXXX',
      lineAtId: '@SomeTestLigoYYY'
    }, profile = {
      userId: 'Uacdb08c33ec68d486bfaa9b63a559131',
      displayName: 'Mr.A'
    }, token = 'new token';

    spyOn(systemService, 'getSystemVariable').and.returnValue(of(systemVariable));

    spyOn(liffWrapperService, 'isLoggedIn').and.returnValue(true);
    spyOn(liffWrapperService, 'init').and.returnValue(Promise.resolve());
    spyOn(liffWrapperService, 'getLanguage').and.returnValue('en');
    spyOn(liffWrapperService, 'isInClient').and.returnValue(true);
    spyOn(liffWrapperService, 'getProfile').and.returnValue(Promise.resolve(profile));

    spyOn(userService, 'isCheckFriendWithLigo').and.returnValue(of({ status: true }));

    spyOn(localStorage, 'getItem')
      .withArgs('token').and.returnValue({})
      .withArgs('lang').and.returnValue(null);

    spyOn(localStorage, 'setItem').and.callFake(() => { });
    spyOn(windowWrapper, 'jwtDecode').and.returnValue({ payload: { exp: 1000000009 } });

    spyOn(auth, 'getToken').and.returnValue(Promise.resolve(token));

    service.isLoggedIn()
      .then(() => {
        expect(auth.getToken).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
        done();
      })
      .catch((err: Error) => {
        throw err;
      });
  });

  it('should not login, not friended, from Line App', (done) => {
    let systemVariable = {
      LIFFId: 'TEST_LIFFIDXXX',
      lineAtId: '@SomeTestLigoYYY'
    }, profile = {
      userId: 'Uacdb08c33ec68d486bfaa9b63a559131',
      displayName: 'Mr.A'
    };

    spyOn(systemService, 'getSystemVariable').and.returnValue(of(systemVariable));

    spyOn(liffWrapperService, 'isLoggedIn').and.returnValue(true);
    spyOn(liffWrapperService, 'init').and.returnValue(Promise.resolve());
    spyOn(liffWrapperService, 'getLanguage').and.returnValue('en');
    spyOn(liffWrapperService, 'isInClient').and.returnValue(true);
    spyOn(liffWrapperService, 'getProfile').and.returnValue(Promise.resolve(profile));
    spyOn(liffWrapperService, 'sendMessages').and.returnValue(Promise.resolve());
    spyOn(liffWrapperService, 'closeWindow').and.callFake(() => { });

    spyOn(userService, 'isCheckFriendWithLigo').and.returnValue(of({ status: false }));

    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');
    spyOn(auth, 'getToken');

    spyOn(translate, 'get').and.returnValue(of('You are not friend of mine!'));
    spyOn(windowWrapper, 'redirect').and.callFake(() => { });;

    service.isLoggedIn()
      .then(() => {
        expect(localStorage.getItem).not.toHaveBeenCalledWith('token');
        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(auth.getToken).not.toHaveBeenCalled();

        expect(translate.get).toHaveBeenCalled();
        expect(liffWrapperService.sendMessages).toHaveBeenCalled();
        expect(liffWrapperService.closeWindow).toHaveBeenCalled();

        expect(windowWrapper.redirect).not.toHaveBeenCalled();

        done();
      })
      .catch((err: Error) => {
        throw err;
      });
  });

  it('should not login, not friended, from browser', (done) => {
    let systemVariable = {
      LIFFId: 'TEST_LIFFIDXXX',
      lineAtId: '@SomeTestLigoYYY'
    }, profile = {
      userId: 'Uacdb08c33ec68d486bfaa9b63a559131',
      displayName: 'Mr.A'
    };

    spyOn(systemService, 'getSystemVariable').and.returnValue(of(systemVariable));

    spyOn(liffWrapperService, 'isLoggedIn').and.returnValue(true);
    spyOn(liffWrapperService, 'init').and.returnValue(Promise.resolve());
    spyOn(liffWrapperService, 'getLanguage').and.returnValue('en');
    spyOn(liffWrapperService, 'isInClient').and.returnValue(false);
    spyOn(liffWrapperService, 'getProfile').and.returnValue(Promise.resolve(profile));
    spyOn(liffWrapperService, 'sendMessages').and.returnValue(Promise.resolve());
    spyOn(liffWrapperService, 'closeWindow').and.callFake(() => { });

    spyOn(userService, 'isCheckFriendWithLigo').and.returnValue(of({ status: false }));

    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');
    spyOn(auth, 'getToken');

    spyOn(translate, 'get').and.returnValue(of('You are not friend of mine!'));

    spyOn(windowWrapper, 'redirect').and.callFake(() => { });;

    service.isLoggedIn()
      .then(() => {
        expect(localStorage.getItem).not.toHaveBeenCalledWith('token');
        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(auth.getToken).not.toHaveBeenCalled();

        expect(translate.get).not.toHaveBeenCalled();

        expect(windowWrapper.redirect).toHaveBeenCalled();

        done();
      })
      .catch((err: Error) => {
        throw err;
      });
  });
});
