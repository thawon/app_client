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
import { Router } from '@angular/router';

import { GroupsService } from '../../services/groups.service';
import { UserService } from '../../services/user.service';
import { LineLIFFService } from '../../services/line.liff.service';
import { SystemService } from '../../services/system.service';
import { Group } from '../../models/group.model';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-group-detail-member-selection',
  templateUrl: './group-detail-member-selection.component.html',
  styleUrls: ['./group-detail-member-selection.component.scss']
})
export class GroupDetailMemberSelectionComponent implements OnInit {
  id: string;
  isLoading: boolean;

  form: FormGroup;
  name: AbstractControl;
  members = [];

  group: any = null;

  constructor(
    private service: GroupsService,
    public user: UserService,
    private lineLIFFService: LineLIFFService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private system: SystemService,
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
        // get group with members who the user has permission to set up language for
        return this.service.getGroupMembersPermission(id, this.user.userId).toPromise();
      })
      .then((group) => {

        this.group = group;

        if (group.members.length === 1) {

          // single member means this user do not have permission to setup language for other members          
          
          // redirect to the language setup for the self language setup          
          this.redirectToGroupDetailComponent(group, this.user.userId);

        } else {

          // multiple members, this user have permission to setup language for other members
          // initialize page to let user select a member to setup language for.
          this.initialization(group);
        }
      });    
  }
  
  initialization(group) {
    // login user-member
    let member = group.members.find(m => m.messengerUserId === this.user.userId);

    this.name.setValue(member.name);

    this.members = [];
    group.members.forEach((m) => this.members.push({
      messengerUserId: m.messengerUserId,
      name: m.name,
      pictureUrl: m.pictureUrl
    }));    

    this.isLoading = false;
  }

  goTo(member) {  
    this.redirectToGroupDetailComponent(this.group, member.messengerUserId);
  }

  redirectToGroupDetailComponent(group, messengerUserId) {

    // build group object required by the group-detail
    this.system.group = {
      id: group.id,
      name: group.name,
      member: group.members.find(m => m.messengerUserId === messengerUserId),
      groupType: group.groupType,
      languageCode: group.languageCode,
      connectedGroup: {}
    };

    this.router.navigate([`/group-detail`, this.id]).then(() => { });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.lineLIFFService.closeWindow();
  }
}
