import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-renew-confirmation-modal',
  templateUrl: './renew-confirmation-modal.component.html',
  styleUrls: ['./renew-confirmation-modal.component.scss']
})
export class RenewConfirmationModalComponent implements OnInit {
  public key: string;
  public brand: string;
  public lastDigits: string;
  public isShowCard = false;

  isAcceptedTerm: boolean = false;
  isShowError: boolean = false;

  form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
    });
  }

  onSubmit(): void {
    this.isShowError = false;
    if (!this.isAcceptedTerm) {
      this.isShowError = true;
      return;
    }

    this.activeModal.close(true);
  }

  onCancel() {
    this.activeModal.close(false);
  }
}
