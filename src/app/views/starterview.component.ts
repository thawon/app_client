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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LocalStroageService } from '../services/local-stroage.service';
import { LineLIFFService } from '../services/line.liff.service';
import { UserService } from '../services/user.service';
import { SystemService } from '../services/system.service';
import { SubscriptionService } from '../services/subscription.service';

import { StartTrialModalComponent } from '../components/start-trial-modal/start-trial-modal.component';
import { CancelSubscriptionModalComponent } from '../components/cancel-subscription-modal/cancel-subscription-modal.component';

declare var jQuery: any;
declare var OmiseCard: any;

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;
  isRedirect: boolean = false;
  isStartTrialSuccessfully: boolean = false;
  isCancelSubscriptionSuccessfully: boolean = false;
  isUpdatingPaymentMethod: boolean = false;
  isProcessing: boolean = false;
  failedUpdatePaymentMethodMessage: string;
  isShowErrorUpdatePaymentMethod: boolean = false;

  form: FormGroup;
  name: AbstractControl;
  createdAt: AbstractControl;
  language: AbstractControl;  
  pictureUrl: AbstractControl;
  charUsed: AbstractControl;
  topUpAt: AbstractControl;
  subscription: AbstractControl;
  nextBillingAt: AbstractControl;
  brand: AbstractControl;
  lastDigits: AbstractControl;
  custId: AbstractControl;

  receipts = [];

  public constructor(
    private router: Router,
    private modal: NgbModal,
    private fb: FormBuilder,
    private lineLIFFService: LineLIFFService,    
    private localStorage: LocalStroageService,
    private userService: UserService,
    public system: SystemService,
    private subscriptionService: SubscriptionService) {

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
      pictureUrl: new FormControl(''),
      charUsed: new FormControl(''),
      topUpAt: new FormControl(''),
      subscription: new FormControl(''),
      nextBillingAt: new FormControl(''),
      brand: new FormControl(''),
      lastDigits: new FormControl(''),
      custId: new FormControl('')
    });
    this.name = this.form.controls.name;
    this.createdAt = this.form.controls.createdAt;
    this.language = this.form.controls.language;    
    this.pictureUrl = this.form.controls.pictureUrl;
    this.charUsed = this.form.controls.charUsed;
    this.topUpAt = this.form.controls.topUpAt;
    this.subscription = this.form.controls.subscription;
    this.nextBillingAt = this.form.controls.nextBillingAt;
    this.brand = this.form.controls.brand;
    this.lastDigits = this.form.controls.lastDigits;
    this.custId = this.form.controls.custId;    
    
    this.initialize();
  }

  initialize() {
    this.userService.register(this.userService.userId).subscribe(user => {
      this.name.setValue(user.name);
      this.createdAt.setValue(new Date(user.createdAt).toDateString());
      this.language.setValue(user.language);
      this.pictureUrl.setValue(user.pictureUrl);
      this.charUsed.setValue(user.charUsed);
      this.topUpAt.setValue(user.topUpAt);
      this.subscription.setValue(user.subscription);
      this.nextBillingAt.setValue(user.nextBillingAt);
      this.custId.setValue(user.custId);

      if (user.card) {
        this.brand.setValue(user.card.brand);
        this.lastDigits.setValue(user.card.lastDigits);
      }

      this.receipts = [];
      if (user.receipts) {
        user.receipts.forEach((r) => this.receipts.push({
          paidAt: r.paidAt,
          key: r.priceKey,
          amount: `${(r.currency === 'USD') ? '$' : '฿'}${(r.amount / 100).toFixed(2)}${r.currency}`,
          paymentBrand: r.paymentBrand,
          lastDigits: r.lastDigits
        }));
      }
      

      setTimeout(function () {
        // Collapse ibox function
        jQuery('.collapse-link').on('click', function (e) {
          e.preventDefault();
          var ibox = jQuery(this).closest('div.ibox');
          var button = jQuery(this).find('i');
          var content = ibox.children('.ibox-content');
          content.slideToggle(200);
          button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
          ibox.toggleClass('').toggleClass('border-bottom');
          setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
          }, 50);
        });

        jQuery('.collapse-link').click();
      }, 1);
    });
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";

    OmiseCard.configure({
      publicKey: "pkey_test_5nx72dp5oynl9rt54ye"
    });
  }
  
  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }

  go() {    

    if (this.subscription.value.status === this.system.SUBSCRIPTION_STATUS_TYPE.TRIAL_AVAILABLE) {
      this.openStartTrialModal();
    } else {
      // go to subscription page
      this.router.navigate([`/subscription`]).then(() => { });
    }
  }

  openStartTrialModal() {
    const modalRef = this.modal.open(StartTrialModalComponent);

    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
        this.isStartTrialSuccessfully = true;
      }
    }, (reason) => {

    });
  }

  openCancelSubscriptionModal() {
    const modalRef = this.modal.open(CancelSubscriptionModalComponent);

    modalRef.componentInstance.custId = this.custId.value;

    modalRef.result.then((result) => {
      if (result) {
        this.initialize();
        this.isCancelSubscriptionSuccessfully = true;
      }
    }, (reason) => {

    });
  }

  openPaymentGateway() {
    OmiseCard.open({
      amount: 0,
      currency: '',
      defaultPaymentMethod: 'credit_card',
      //locale: 'th',
      submitLabel: 'OK',
      onCreateTokenSuccess: (nonce) => {
        this.changeDefaultCreditCard(nonce);
      },
    });

  }

  changeDefaultCreditCard(tokenId) {

    this.isShowErrorUpdatePaymentMethod = false;
    this.isUpdatingPaymentMethod = true;
    this.isProcessing = true;   

    this.subscriptionService.changeDefaultCreditCard(this.userService.userId, this.custId.value, tokenId).subscribe(
      data => {        
        this.isUpdatingPaymentMethod = false;
        this.isProcessing = false;

        this.initialize();
      },
      data => {

        this.isShowErrorUpdatePaymentMethod = true;

        if (data.error.failedCode) {
          this.failedUpdatePaymentMethodMessage = data.error.failedMessage;
        } else {
          this.failedUpdatePaymentMethodMessage = 'Internal Error';
        }

        this.isUpdatingPaymentMethod = false;
        this.isProcessing = false;
      });
  }

  close() {
    this.lineLIFFService.closeWindow();
  }

  clearLocalStroage() {
    this.localStorage.removeItem('route');
    this.localStorage.removeItem('id');
  }  

}
