import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  AbstractControl
} from '@angular/forms';

//import { supportedLanguages } from '../../enums/supportedLanguages.enum'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  supportedLanguages: any;

  form: FormGroup;
  language: AbstractControl;

  constructor(private fb: FormBuilder, public translate: TranslateService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      language: new FormControl(this.translate.currentLang)
    });
    this.language = this.form.controls.language;

    //this.supportedLanguages = Object.keys(supportedLanguages)
    //  // fitler out language that has been selected.
    //  .filter(key => supportedLanguages[key].key !== supportedLanguages.notSpecified.key
    //    && supportedLanguages[key].key !== supportedLanguages.chineseSimplified.key)
    //  .map(key => supportedLanguages[key])
    //  .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  onChange(selected: AbstractControl) {
    this.translate.use(selected.value);
  }
}
