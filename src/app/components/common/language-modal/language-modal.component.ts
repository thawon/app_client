import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../../services/user.service'
import { LanguageService } from '../../../services/language.service';
import { SupportedLanguage } from '../../../models/supported-language.model'


@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})
export class LanguageModalComponent implements OnInit {
  public input;
  public alreadySelectedLanguage;
  
  form: FormGroup;
  language: AbstractControl;

  supportedLanguages: Observable<SupportedLanguage[]>;
  filter = new FormControl('');

  constructor(
    public user: UserService,
    private languageService: LanguageService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal) {

    this.supportedLanguages = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      language: new FormControl(this.input, Validators.required)
    });
    this.language = this.form.controls.language;
  }

  RowSelected(selected: SupportedLanguage) {
    this.language.setValue(selected);
  }

  search(text: string): SupportedLanguage[] {
    return this.languageService.getSupportedLanguages(this.language.value.languageCode).filter(language => {
      const term = text.toLowerCase();
      
      return (this.user.language === 'en') ? language.displayNameEN.toLowerCase().includes(term) : null
        || (this.user.language === 'th') ? language.displayNameTH.toLowerCase().includes(term) : null
        || (this.user.language === 'ja') ? language.displayNameJA.toLowerCase().includes(term) : null
        || (this.user.language === 'zh') ? language.displayNameZH.toLowerCase().includes(term) : null
        || language.nativeName.toLowerCase().includes(term);
    })
      .sort((n1, n2) => {
        if (n1.sortOrder < n2.sortOrder) return 1;
        if (n1.sortOrder > n2.sortOrder) return -1;
        return 0;
      });
  }

  onSubmit(value) {
    this.activeModal.close(value);
  }

  onCancel() {
    this.activeModal.dismiss();
  } 
}
