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
import { UserService } from '../../services/user.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-start-trial-modal',
  templateUrl: './start-trial-modal.component.html',
  styleUrls: ['./start-trial-modal.component.scss']
})
export class StartTrialModalComponent implements OnInit {
  public input;

  isSaving: boolean;

  form: FormGroup;

  constructor(
    private subscription: SubscriptionService,
    public user: UserService,
    public system: SystemService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {

  }  

  ngOnInit(): void {
    this.form = this.fb.group({
      
    });
  }

  onSubmit(): void {
    this.isSaving = true;
    this.subscription.trial(this.user.userId).subscribe(
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
