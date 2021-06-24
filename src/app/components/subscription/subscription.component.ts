import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SubscriptionService } from '../../services/subscription.service';
import { UserService } from '../../services/user.service';
import { SystemService } from '../../services/system.service';

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
      publicKey: "pkey_test_5nx72dp5oynl9rt54ye"
    });
  }

  openPaymentGateway(plan, trigger: string, error: string, f) {
    OmiseCard.open({
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
    if (!this.card) {
      this.subscribe(key, trigger, error);
    } else {
      this.renew(key, trigger, error)
    }
  }

  subscribe(key: string, trigger: string, error: string) {
    let plan = this.getPlan(key);

    this.openPaymentGateway(plan, trigger, error, (tokenId) => {
      this.subscription.subscribe(this.user.userId, plan.priceId, tokenId).subscribe(
        data => {

          this.isShowErrors.forEach(e => this[e] = false);
          //this[error] = false;

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
    //this[error] = false;

    this.subscription.renew(this.user.userId, plan.priceId).subscribe(
      data => {

        this.isShowErrors.forEach(e => this[e] = false);
        //this[error] = false;

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
    this.router.navigate([`/payment-success`], { replaceUrl: true }).then(() => { });
  }
  
}
