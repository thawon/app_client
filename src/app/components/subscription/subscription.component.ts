import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SubscriptionService } from '../../services/subscription.service';
import { UserService } from '../../services/user.service';
import { SystemService } from '../../services/system.service';
import { RenewConfirmationModalComponent } from '../renew-confirmation-modal/renew-confirmation-modal.component';

declare var OmiseCard: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  plans: any;
  card: any;

  isProcessing: boolean = false;
  isShowError: boolean = false;
  failedMessage: string;

  isProcessing_SUBSCRIBE_AND_RENEW_3_MONTH_PLAN_v0: boolean = false;
  isProcessing_ANOTHER_CARD_3_MONTH_PLAN_v0: boolean = false;
  isShowError_3_MONTH_PLAN_v0: boolean = false;

  isProcessing_SUBSCRIBE_AND_RENEW_MONTHLY_PLAN_v0: boolean = false;
  isProcessing_ANOTHER_CARD_MONTHLY_PLAN_v0: boolean = false;
  isShowError_MONTHLY_PLAN_v0: boolean = false;

  isShowErrors: string[] = ['isShowError_3_MONTH_PLAN_v0', 'isShowError_MONTHLY_PLAN_v0'];

  constructor(
    private router: Router,
    private modal: NgbModal,
    private subscription: SubscriptionService,
    private user: UserService,
    public system: SystemService,
  ) {

    this.subscription.getPlans(this.user.userId).subscribe(
      data => {
        this.plans = data.plans;
        this.card = data.card;
      });
  }

  ngOnInit(): void {
    OmiseCard.configure({
      publicKey: this.system.omisePublicKey
    });
  }

  openPaymentGateway(plan, trigger: string, error: string, f) {
    OmiseCard.open({
      frameLabel: this.system.companyName,
      image: `${this.system.domain}/assets/images/logo.png`,
      locale: this.user.language,
      amount: parseInt(plan.amount),
      currency: plan.currency,
      defaultPaymentMethod: 'credit_card',
      onCreateTokenSuccess: (nonce) => {

        this.isProcessing = true;
        this[trigger] = true;

        this.isShowErrors.forEach(e => this[e] = false);
        //this[error] = false;

        if (nonce.startsWith('tokn_')) {
          f(nonce);
        } else {

        };
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    });
  }

  getPlan(key) {
    return this.plans.find(p => p.key === key);
  }

  process(key: string, trigger: string, error: string) {
    const isShowCard = (this.card) ? true : false,
      modalRef = this.getRenewConfirmationModal(key, isShowCard);
    
    modalRef.result.then((result) => {
      if (!result) return 

      if (!this.card) {
        this.subscribe(key, trigger, error);
      } else {
        this.renew(key, trigger, error);
      }
      
    }, (reason) => {

    });    
  }

  useAnotherCard(key: string, trigger: string, error: string) {
    const modalRef = this.getRenewConfirmationModal(key, false);

    modalRef.result.then((result) => {
      if (!result) return

      this.subscribe(key, trigger, error);

    }, (reason) => {

    });    
  }

  getRenewConfirmationModal(key: string, isShowCard: boolean) {
    const modal = this.modal.open(RenewConfirmationModalComponent);

    modal.componentInstance.key = key;
    if (isShowCard) {
      modal.componentInstance.brand = this.card.brand;
      modal.componentInstance.lastDigits = this.card.lastDigits;
    }    
    modal.componentInstance.isShowCard = isShowCard;

    return modal;
  }

  subscribe(key: string, trigger: string, error: string) {
    let plan = this.getPlan(key);

    this.openPaymentGateway(plan, trigger, error, (tokenId) => {
      this.subscription.subscribe(this.user.userId, plan.priceId, tokenId).subscribe(
        data => {

          this.isShowErrors.forEach(e => this[e] = false);

          this.isProcessing = false;
          this[trigger] = false;

          this.paymentSuccesss();          
        },
        data => {
          
          this[error] = true;

          if (data.error.failedCode) {

            this.failedMessage = data.error.failedMessage;

            // remove the just added credit card
            this.subscription.removePaymentMethod(data.error.custId, data.error.cardId).subscribe(
              data => { });
          } else {
            this.failedMessage = 'Internal Error';
          }

          this.isProcessing = false;
          this[trigger] = false;
        });
    });
  }

  renew(key: string, trigger: string, error: string) {
    let plan = this.getPlan(key);

    this.isProcessing = true;
    this[trigger] = true;

    this.isShowErrors.forEach(e => this[e] = false);

    this.subscription.renew(this.user.userId, plan.priceId).subscribe(
      data => {

        this.isShowErrors.forEach(e => this[e] = false);

        this.isProcessing = false;
        this[trigger] = false;
        
        this.paymentSuccesss();
      },
      data => {

        this[error] = true;

        if (data.error.failedCode) {

          this.failedMessage = data.error.failedMessage;

        } else {
          this.failedMessage = 'Internal Error';
        }

        this.isProcessing = false;
        this[trigger] = false;
      });
  }
  
  goToMyAccount() {
    // redirect to the successfully page, replaceUrl helps clear router history
    this.router.navigate([`/home`], { replaceUrl: true }).then(() => { });
  }

  paymentSuccesss() {
    // redirect to the successfully page, replaceUrl helps clear router history
    this.system.isPaymentSuccessful = true;
    this.router.navigate([`/payment-success`], { replaceUrl: true }).then(() => { });
  }
  
}
