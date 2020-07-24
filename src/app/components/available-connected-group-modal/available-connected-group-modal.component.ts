import {
  Component,
  Optional,
  Inject,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GroupsService } from '../../services/groups.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-available-connected-group-modal',
  templateUrl: './available-connected-group-modal.component.html',
  styleUrls: ['./available-connected-group-modal.component.scss']
})
export class AvailableConnectedGroupModalComponent implements OnInit {
  public input;
  public groupId;
  public groupType;

  isLoading: boolean;

  form: FormGroup;
  connectedGroup: AbstractControl;

  availableGroups: any;
  //getLanguage: any = getLanguage;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private groupService: GroupsService,
    private user: UserService,) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      connectedGroup: new FormControl('', Validators.required)
    });
    this.connectedGroup = this.form.controls.connectedGroup;

    this.isLoading = true;

    //this.groupService.getAvailableConnectedGroups(this.groupId, this.user.userId, this.groupType)
    //  .subscribe(connectedGroups => {
    //    this.availableGroups = connectedGroups;

    //    let selectedGroup = connectedGroups.find(cg => cg.groupId === this.input.groupId);
    //    this.connectedGroup.setValue(selectedGroup);

    //    this.isLoading = false;
    //  });
  }

  onSubmit(value) {
    this.activeModal.close(value);
  }

  onCancel() {
    this.activeModal.dismiss();
  } 
}
