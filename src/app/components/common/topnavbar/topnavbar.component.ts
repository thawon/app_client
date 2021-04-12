import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { UserService } from '../../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStroageService } from '../../../services/local-stroage.service';

declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor(
    public user: UserService,
    private translate: TranslateService,
    private localStorage: LocalStroageService,
  ) {

  }

  toggleNavigation(event) {
    event.preventDefault();
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  RowSelected(languageCode) {
    this.changeLanguage(languageCode);
  }

  changeLanguage(languageCode: string): void {
    this.translate.use(languageCode);
    this.user.language = languageCode;

    this.localStorage.setItem('lang', languageCode);
  }
}
