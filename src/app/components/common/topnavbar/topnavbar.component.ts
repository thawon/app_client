import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  toggleNavigation(event) {
    event.preventDefault();
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

}
