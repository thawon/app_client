import {
  Component,
  Input
} from '@angular/core';

import { UserService } from '../../../services/user.service'

@Component({
  selector: 'language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {  
  @Input() language: any;
  @Input() isEnabled: any;
  @Input() fromToLanguage: string;

  constructor(public user: UserService) {
  }
}
