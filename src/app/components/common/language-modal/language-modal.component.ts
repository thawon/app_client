import {
  Component,
  Optional,
  Inject,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { supportedLanguages } from '../../../enums/supportedLanguages.enum'

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})
export class LanguageModalComponent implements OnInit {
  public input;
  public alreadySelectedLanguage;

  supportedLanguages: any;

  form: FormGroup;
  language: AbstractControl;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {  
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      language: new FormControl(this.input, Validators.required)
    });
    this.language = this.form.controls.language;
    
    this.supportedLanguages = Object.keys(supportedLanguages)
      // fitler out language that has been selected.
      .filter(key => supportedLanguages[key].key !== this.alreadySelectedLanguage.key)
      .map(key => supportedLanguages[key])
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  onSubmit(value) {
    this.activeModal.close(value);
  }

  onCancel() {
    this.activeModal.dismiss();
  } 
}
