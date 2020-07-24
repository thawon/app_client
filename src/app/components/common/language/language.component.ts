import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {  
  @Input() language: any;
  @Input() isEnabled: any;
}
