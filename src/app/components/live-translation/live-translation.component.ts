import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  AbstractControl

} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

import { TranslationService } from '../../services/translation.service'
import { LineLIFFService } from '../../services/line.liff.service';
import { GroupsService } from '../../services/groups.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-live-translation',
  templateUrl: './live-translation.component.html',
  styleUrls: ['./live-translation.component.scss']
})
export class LiveTranslationComponent implements AfterViewInit {
  id: string;

  @ViewChild('textToTranslate') textToTranslate: ElementRef;
  isShowDidYouMean: boolean;
  isTranslating: boolean;
  isShowTranslation: boolean;

  form: FormGroup;
  text: AbstractControl;
  fromLanguageCode: AbstractControl;
  toLanguageCode: AbstractControl;
  didYouMeanText: AbstractControl;
  translatedText: AbstractControl;

  constructor(
    private translation: TranslationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private lineLIFFService: LineLIFFService,
    private groupService: GroupsService,
    private user: UserService) {

    this.route.params.subscribe(params => {
      this.id = params['id'];  
    });

    this.form = this.fb.group({
      text: new FormControl(''),
      fromLanguageCode: new FormControl(''),
      toLanguageCode: new FormControl(''),
      didYouMeanText: new FormControl(''),
      translatedText: new FormControl('')
    });

    this.text = this.form.controls.text;
    this.fromLanguageCode = this.form.controls.fromLanguageCode;
    this.toLanguageCode = this.form.controls.toLanguageCode;
    this.didYouMeanText = this.form.controls.didYouMeanText;
    this.translatedText = this.form.controls.translatedText;

    this.groupService.getTranslationLanguage(this.id, this.user.userId).subscribe(languages => {
      this.fromLanguageCode.setValue(languages.from);
      this.toLanguageCode.setValue(languages.to);
    });
  }

  ngAfterViewInit() {
    this.textToTranslate.nativeElement.focus();

    fromEvent(this.textToTranslate.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        filter((text: string) => text.length > 1),
        debounceTime(250),
        tap(() => { this.isTranslating = true } ),
        map((query: string) => this.translation.translate(query, this.fromLanguageCode.value, this.toLanguageCode.value)),
        switchAll()
      )
      // act on the return of the search
      .subscribe(
        (translation) => { // on sucesss
          this.onTranslationSuccess(translation)
        },
        (err: any) => { // on error
          this.onTranslationFail(err);
        }
      );

  }  

  onTranslationSuccess(translation) {
    this.isShowTranslation = true;

    this.isTranslating = false

    this.isShowDidYouMean = false;
    if (translation.didYouMeanText !== '') this.isShowDidYouMean = true;

    let didYouMeanText = translation.didYouMeanText.replace('<span>', '<span class="font-weight-bold">');
    this.didYouMeanText.setValue(didYouMeanText);

    this.translatedText.setValue(translation.text);
  }

  onTranslationFail(err:any) {
    this.isTranslating = false
    console.log(err);
  }

  translate() {
    let text = this.didYouMeanText.value.replace('<span class="font-weight-bold">', '').replace('</span>', '');

    this.text.setValue(text);
    this.textToTranslate.nativeElement.innerText = text;

    this.didYouMeanText.setValue('');
    this.isShowDidYouMean = false;

    this.isTranslating = true;
    this.translation.translate(text, this.fromLanguageCode.value, this.toLanguageCode.value)
      .subscribe(
        (translation) => { // on sucesss
          this.onTranslationSuccess(translation)
        },
        (err: any) => { // on error
          this.onTranslationFail(err);
        }
      )
  }

  clear() {
    this.text.setValue('');
    this.didYouMeanText.setValue('');
    this.translatedText.setValue('');

    this.isShowDidYouMean = false;
    this.isShowTranslation = false;
  }

  onSubmit() {
    this.lineLIFFService.sendMessageAndClose(this.text.value);
  }

}
