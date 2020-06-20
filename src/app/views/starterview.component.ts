import { Component, OnDestroy, OnInit, } from '@angular/core';
import { LineLIFFService } from '../services/line.liff.service';
import { LocalStroageService } from '../services/local-stroage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;
  isRedirect: boolean = false;

  public constructor(
    private lineLIFFService: LineLIFFService,
    private router: Router,
    private localStorage: LocalStroageService) {

    this.nav = document.querySelector('nav.navbar');

    // Line redirects when parameter is specified in LIFF, therefore, capture the redirect
    // and make it does nothing on the first load
    this.isRedirect = (decodeURIComponent(window.location.search).indexOf('liff.state') === 1) ? true : false;
    if (this.isRedirect) return;

    let route = this.localStorage.getItem('route');
    if (route) {
      let id = this.localStorage.getItem('id');
      this.router.navigate([`/${route}`, id]).then(() => this.clearLocalStroage());
    }
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
  }

  
  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }

  closewindow() {
    this.lineLIFFService.closeWindowAndSendMessage();
  }

  clearLocalStroage() {
    this.localStorage.removeItem('route');
    this.localStorage.removeItem('id');
  }
}
