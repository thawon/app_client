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

  public constructor(
    private lineLIFFService: LineLIFFService,
    private router: Router,
    private localStorage: LocalStroageService) {

    this.nav = document.querySelector('nav.navbar');

    //this.router.navigate(['group-detail','5e9487cc631b03537000b08a']);

    let route = this.localStorage.getItem('route');
    if (route) {
      let id = this.localStorage.getItem('id');

      if (route === 'group-detail') {
        let sourceType = this.localStorage.getItem('sourceType');
        let sourceId = this.localStorage.getItem('sourceId');
        this.router.navigate([`/${route}`, id, sourceType, sourceId]).then(() => this.clearLocalStroage());
      }
      else {
        this.router.navigate([`/${route}`, id]).then(() => this.clearLocalStroage());
      }
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
    this.localStorage.removeItem('sourceType');
    this.localStorage.removeItem('sourceId');    
  }
}
