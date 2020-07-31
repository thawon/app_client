import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Router } from '@angular/router';

import { LocalStroageService } from '../services/local-stroage.service';
import { LineLIFFService } from '../services/line.liff.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;
  isRedirect: boolean = false;

  form: FormGroup;
  name: AbstractControl;
  createdAt: AbstractControl;
  language: AbstractControl;
  translationMessageQuota: AbstractControl;
  pictureUrl: AbstractControl;

  public constructor(
    private router: Router,
    private fb: FormBuilder,
    private lineLIFFService: LineLIFFService,    
    private localStorage: LocalStroageService,
    private userService: UserService) {

    this.nav = document.querySelector('nav.navbar');

    // Line redirects when parameter is specified in LIFF, therefore, capture the redirect
    // and make it does nothing on the first load
    //this.isRedirect = (decodeURIComponent(window.location.search).indexOf('liff.state') === 1) ? true : false;
    //if (this.isRedirect) return;

    let route = this.localStorage.getItem('route');
    if (route) {
      let id = this.localStorage.getItem('id');
      this.router.navigate([`/${route}`, id]).then(() => this.clearLocalStroage());
    }

    this.form = this.fb.group({
      name: new FormControl(''),
      createdAt: new FormControl(''),
      language: new FormControl(''),
      translationMessageQuota: new FormControl(''),
      pictureUrl: new FormControl('')
    });
    this.name = this.form.controls.name;
    this.createdAt = this.form.controls.createdAt;
    this.language = this.form.controls.language;
    this.translationMessageQuota = this.form.controls.translationMessageQuota;
    this.pictureUrl = this.form.controls.pictureUrl;    

    this.userService.register(this.userService.userId).subscribe(user => {
      this.name.setValue(user.name);
      this.createdAt.setValue(new Date(user.createdAt).toDateString());
      this.language.setValue(user.language);
      this.translationMessageQuota.setValue(user.translationMessageQuota);
      this.pictureUrl.setValue(user.pictureUrl);      
    });
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
  }

  
  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }

  closewindow() {
    this.lineLIFFService.closeWindowAndSendMessage();
  }

  clearLocalStroage() {
    this.localStorage.removeItem('route');
    this.localStorage.removeItem('id');
  }
}
