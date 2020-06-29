import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver
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

import { CorrectionComponent } from '../correction/correction.component';
import { NoCorrectionComponent } from '../no-correction/no-correction.component';

declare var $: any;

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

@Component({
  selector: 'app-live-translation',
  templateUrl: './live-translation.component.html',
  styleUrls: ['./live-translation.component.scss']
})
export class LiveTranslationComponent implements AfterViewInit {
  id: string;

  @ViewChild('textToTranslate', { read: ViewContainerRef }) textToTranslate: ViewContainerRef;  
  @ViewChild('correctionContainer', { read: ViewContainerRef }) correctionContainer: ViewContainerRef;

  isShowDidYouMean: boolean;
  isTranslating: boolean;
  isShowTranslation: boolean;
  isChecking: boolean = false;
  
  form: FormGroup;
  text: AbstractControl;
  fromLanguageCode: AbstractControl;
  toLanguageCode: AbstractControl;
  didYouMeanText: AbstractControl;
  translatedText: AbstractControl;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
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

    //this.groupService.getTranslationLanguage(this.id, this.user.userId).subscribe(languages => {
    //  this.fromLanguageCode.setValue(languages.from);
    //  this.toLanguageCode.setValue(languages.to);
    //});

    this.fromLanguageCode.setValue('en');
    this.toLanguageCode.setValue('th');
  }

  ngAfterViewInit() {    
    this.textToTranslate.element.nativeElement.focus();
    
    fromEvent(this.textToTranslate.element.nativeElement, 'keyup')
      .pipe(
        map((e: any) => {
          if (e.key === 'ArrowLeft'
            || e.key === 'ArrowRight'
            || e.key === 'ArrowUp'
            || e.key === 'ArrowDown'
            || e.key === 'Enter') {
            return '';
          } else {
            return e.target.innerText;
          }
        }),
        filter((text: string) => text.length > 1),
        debounceTime(1000),
        tap(() => { this.isTranslating = true } ),
        map((query: string) => this.translation.translate(query, this.fromLanguageCode.value, this.toLanguageCode.value)),
        switchAll()
      )
      // act on the return of the search
      .subscribe(
        (translation) => { // on sucesss
          this.onTranslationSuccess(translation);
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

    let didYouMeanText = replaceAll(translation.didYouMeanText, '<span>', '<span class="font-weight-bold">');
    this.didYouMeanText.setValue(didYouMeanText);

    this.translatedText.setValue(translation.text);
  }

  onTranslationFail(err: any) {
    this.isTranslating = false
    console.log(err);
  }  

  createPlainTextComponent(text: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(NoCorrectionComponent);    
    let component = this.correctionContainer.createComponent(factory);
    component.instance.text = text;
  }

  createCorrectionCorrectionComponent(text: string, message:string, replacements: string[]) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(CorrectionComponent);
    let component = this.correctionContainer.createComponent(factory);
    component.instance.message = message;
    component.instance.replacements = replacements;
    component.instance.text = text;
  }

  check() {
    this.isChecking = true;
    this.translation.check(this.textToTranslate.element.nativeElement.innerText, this.fromLanguageCode.value)
      .subscribe(corrections => {

        // corrections count is 0, means there is no correction to apply.
        if (corrections.length === 0) {
          this.isChecking = false;
          return;
        };

        let currentIndex: number = 0;
        let text: string = this.textToTranslate.element.nativeElement.innerText;

        // clear previously created correction and no-correction components
        this.correctionContainer.clear(); 

        corrections.forEach(c => {
          // passed is part of text that passes correction.
          let passedText = text.substring(currentIndex, c.offset);
          this.createPlainTextComponent(passedText);
          
          let failedText = text.substring(c.offset, c.offset + c.length);
          this.createCorrectionCorrectionComponent(failedText, c.message, c.replacements);          

          currentIndex = c.offset + c.length;
          
          if (corrections[corrections.length - 1] === c) {
            // last correction, get all the remaining text.
            let remainingText = text.substring(currentIndex, currentIndex + (text.length - currentIndex));
            this.createPlainTextComponent(remainingText);            
          }
        });

        // remove only text and leave all the correction and no-correction components
        this.clearTextToTranslateInnerHtml();

        this.isChecking = false;
      });
  } 

  onDidYouMean() {
    let text = this.didYouMeanText.value;

    // replace html and emphasis mark from the service.
    text = this.replaceBoldText(text);
    text = this.replaceParentheses(text);

    this.clearTextToTranslate();
    this.createPlainTextComponent(text);

    this.didYouMeanText.setValue('');
    this.isShowDidYouMean = false;

    this.isTranslating = true;
    this.translate(text);
  }

  translate(text) {
    this.translation.translate(text, this.fromLanguageCode.value, this.toLanguageCode.value)
      .subscribe(
        (translation) => { // on sucesss
          this.onTranslationSuccess(translation)
        },
        (err: any) => { // on error
          this.onTranslationFail(err);
        }
      );
  }

  onKeydown(e) {
    if (
      // prevent correctionContainer from being removed.
      (e.key === 'Backspace' && this.textToTranslate.element.nativeElement.innerText.toString().trim().length < 1)
      || e.key === 'Enter') {
      e.preventDefault();
    }
  }  

  reverse() {
    let fromlanguageCode = this.fromLanguageCode.value;
    let toLanguageCode = this.toLanguageCode.value;

    this.toLanguageCode.setValue(fromlanguageCode);
    this.fromLanguageCode.setValue(toLanguageCode);

    let text = this.translatedText.value;

    this.clear();
    this.createPlainTextComponent(text);

    this.translate(text);
  }

  clear() {
    this.clearTextToTranslate();

    this.didYouMeanText.setValue('');
    this.translatedText.setValue('');

    this.isShowDidYouMean = false;
    this.isShowTranslation = false;
  }

  clearTextToTranslate() {
    this.correctionContainer.clear();
    this.clearTextToTranslateInnerHtml();
  }

  replaceBoldText(text) {
    text = replaceAll(text, '<span class="font-weight-bold">', '');
    text = replaceAll(text, '</span>', '');

    return text;
  }

  replaceParentheses(text) {
    text = replaceAll(text, '[', '');
    text = replaceAll(text, ']', '');

    return text;
  }

  clearTextToTranslateInnerHtml() {
    $('#textToTranslate').contents().filter((_, el) => el.nodeType === 3).remove();
  }

  onSubmit() {
    this.lineLIFFService.sendMessageAndClose(this.textToTranslate.element.nativeElement.innerText);
  }

}
