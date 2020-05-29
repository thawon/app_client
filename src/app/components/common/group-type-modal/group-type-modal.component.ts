import {
  Component,
  OnInit,
  Optional,
  Inject,
  Input
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { groupTypes } from '../../../enums/groupType.enum'

@Component({
  selector: 'app-group-type-modal',
  templateUrl: './group-type-modal.component.html',
  styleUrls: ['./group-type-modal.component.scss']
})
export class GroupTypeModalComponent implements OnInit {
  public input;

  groupTypes: any = groupTypes;

  form: FormGroup;
  groupType: AbstractControl;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      groupType: new FormControl(this.input, Validators.required)
    });
    this.groupType = this.form.controls.groupType;    
  }

  onSelect() {
    this.activeModal.close(this.form.value.groupType);
  }

  onCancel() {
    this.activeModal.close();
  } 
}
