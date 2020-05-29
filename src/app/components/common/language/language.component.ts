import {
  Component,
  Input
} from '@angular/core';

import { supportedLanguages } from '../../../enums/supportedLanguages.enum'

@Component({
  selector: 'language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {  
  @Input() language: any;

  supportedLanguages: any = supportedLanguages;
}
