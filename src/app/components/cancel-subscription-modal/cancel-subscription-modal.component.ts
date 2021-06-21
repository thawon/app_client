import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-cancel-subscription-modal',
  templateUrl: './cancel-subscription-modal.component.html',
  styleUrls: ['./cancel-subscription-modal.component.scss']
})
export class CancelSubscriptionModalComponent implements OnInit {
  public custId;

  isSaving: boolean = false;

  form: FormGroup;

  constructor(
    private subscription: SubscriptionService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
    });
  }

  onSubmit(): void {
    this.isSaving = true;
    this.subscription.cancel(this.custId).subscribe(
      status => {
        this.activeModal.close(true);
      },
      () => {
        this.isSaving = false;
      });
  }

  onCancel() {
    this.activeModal.close(false);
  }
}
