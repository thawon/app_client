import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SystemService } from '../../services/system.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private router: Router,
    public system: SystemService,
    public user: UserService,
  ) {
    if (!system.isPaymentSuccessful) this.router.navigate([`/`]).then(() => { });
  }

  ngOnInit(): void {
  }

}
