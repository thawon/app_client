import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { GroupsService } from '../../services/groups.service';
import { UserService } from '../../services/user.service';
import { LineLIFFService } from '../../services/line.liff.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {
  id: string;

  isLoading: boolean;
  isSaving: boolean;
  isSaveSuccessfully: boolean = false;
  isShowPermissions: boolean;

  form: FormGroup;
  name: AbstractControl;
  permissions = [];

  constructor(
    private service: GroupsService,
    public user: UserService,
    private lineLIFFService: LineLIFFService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.form = this.fb.group({
      name: new FormControl('', Validators.required)
    });
    this.name = this.form.controls.name;

    this.retrieve(this.id);
  }

  retrieve(id: string) {
    this.service.addMember(this.user.userId, id).toPromise()
      .then(() => {
        return this.service.getMemberPermissions(id, this.user.userId).toPromise();
      })
      .then((data) => {
        // after adding user as a member, then initialise the form.
        this.initialization(data);
      });
  }

  initialization(data) {
    this.name.setValue(data.name);
        
    data.permissions.forEach((p) => {
      p.isRemoved = false;
      p.pictureUrl = (p.pictureUrl) ? p.pictureUrl : '/assets/images/person-placeholder.png';
    });
    this.permissions = data.permissions;

    this.isLoading = false;
    this.setShowPermissions();
  } 

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.save(true);
  }

  onCancel() {
    this.lineLIFFService.closeWindow();
  }  

  save(isClose: boolean) {
    // this update class on css
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    
    let data = {
      id: this.id,
      messengerUserId: this.user.userId,
      permissions: this.permissions.map((p) => {
        return {
          messengerUserId: p.messengerUserId,
          isRemoved: p.isRemoved
        }
      })
    };

    this.isSaving = true;
    this.isSaveSuccessfully = false;

    this.service.saveMemberPermissions(data).subscribe(
      data => {
        this.isSaveSuccessfully = true;

        let message = '^show me who has my permission.';
        message = `${message} ~${this.user.language}`;

        if (isClose) this.lineLIFFService.sendMessageAndClose(message);
      },
      error => { console.log("Error", error); },
      () => {
        this.isSaving = false;
      }
    );
  }

  removeLanguage(index) {
    this.permissions[index].isRemoved = true;
    this.setShowPermissions();
  }

  setShowPermissions() {
    this.isShowPermissions = !(this.permissions.length === 0 || this.permissions.filter(p => p.isRemoved === false).length === 0);
  }
}
