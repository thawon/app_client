/* tslint:disble max-line-length */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { LineLIFFService } from './services/line.liff.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private lineLIFF: LineLIFFService) { }

  private isLoggedIn: boolean = false;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      if (this.isLoggedIn) {
        return resolve(this.isLoggedIn);
      } else {
        return this.lineLIFF.isLoggedIn()
          .then((isLoggedIn: boolean) => {

            // guard is call for everytime the route is accessed,
            // persist isLoggedIn, therefore, if the user travel between route,
            // it will not trigger the line LIFF login 
            this.isLoggedIn = isLoggedIn;

            resolve(this.isLoggedIn);
          })
          .catch((err) => {
            reject(err);
          });
      }      
    })
  }
}
