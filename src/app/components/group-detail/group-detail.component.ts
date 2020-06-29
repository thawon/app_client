import {
  Component,
  Inject
} from '@angular/core';

import {
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GroupsService } from '../../services/groups.service';
import { UserService } from '../../services/user.service';
import { Group } from '../../models/group.model';
import { Member } from '../../models/member.model';
import { ConnectedGroup } from '../../models/connected-group.model';

import { GroupTypeModalComponent } from '../common/group-type-modal/group-type-modal.component';
import { LanguageModalComponent } from '../common/language-modal/language-modal.component';
import { AvailableConnectedGroupModalComponent } from '../available-connected-group-modal/available-connected-group-modal.component';

import { LineLIFFService } from '../../services/line.liff.service';

import { groupTypes, getGroupType} from '../../enums/groupType.enum'
import { supportedLanguages, getLanguage } from '../../enums/supportedLanguages.enum'

//declare var $: any;
//declare var Tour: any;

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent {
  id: string;
  sourceType: string;
  sourceId: string;

  isLoading: boolean;
  isSaving: boolean;

  groupTypes: any = groupTypes;
  supportedLanguages: any = supportedLanguages;
  isShowRegularGroupControl: boolean;
  isShowConnectedGroupLanguage: boolean;

  isFromLiFF: boolean = false;

  form: FormGroup;
  name: AbstractControl;
  groupType: AbstractControl;
  languageCode: AbstractControl;
  members: FormArray;

  connectedGroup: AbstractControl;
  getLanguage: any = getLanguage;
  connectedGroupLanguageCode: AbstractControl;

  constructor(private service: GroupsService,
    private user: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,    
    private lineLIFFService: LineLIFFService) {

    this.isLoading = true;

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });  

    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      groupType: new FormControl('', Validators.required),
      languageCode: new FormControl(''),
      members: new FormArray([]),
      connectedGroup: new FormControl(''),
      connectedGroupLanguageCode: new FormControl('')
    });

    this.name = this.form.controls.name;
    this.groupType = this.form.controls.groupType;
    this.languageCode = this.form.controls.languageCode;
    this.members = this.form.controls.members as FormArray;
    this.connectedGroup = this.form.controls.connectedGroup;
    this.connectedGroupLanguageCode = this.form.controls.connectedGroupLanguageCode;

    this.retrieveGroup(this.id);
  }
  
  //startTour() {
  //  // Instance the tour
  //  var tour = new Tour({
  //    framework: "bootstrap4",
  //    steps: [
  //      {
  //        element: "#nameA",
  //        title: "Title of my step",
  //        content: "Introduce new users to your product by walking them through it step by step. 1",
  //        placement: "top",
  //        backdrop: true,
  //      }
  //    ]
  //  });

  //  tour.restart();
  //}

  retrieveGroup(id: string) {
    // when Ligo is invited to a group/room, group is created without member
    // member is created when:
    // (1) user joins the group/room
    // (2) or tab on the group setting link sent when Ligo is invited.
    if (this.lineLIFFService.isClientApp) {
      // isClientApp indicates that user tabs the group setting link
      this.service.addMember(this.user.userId, id).toPromise()
        .then(() => {
          return this.service.getGroup(id, this.user.userId).toPromise();
        })
        .then((group) => {
          // after adding user as a member, then initialise the form.
          this.initialization(group);
        });
    } else {
      // form is accessed from website, no need to check and add user.
      this.service.getGroup(id, this.user.userId).subscribe(group => {
        this.initialization(group);
      });
    }
  }
  
  initialization(group: Group) {
    this.name.setValue(group.name);
    this.groupType.setValue(getGroupType(group.groupType));
    this.languageCode.setValue(getLanguage(group.languageCode));

    group.connectedGroup = new ConnectedGroup(group.connectedGroup);
    
    this.connectedGroup.setValue(group.connectedGroup);
    this.connectedGroupLanguageCode.setValue(getLanguage(group.connectedGroup.languageCode));

    group.members.forEach(m => {
      this.members.push(new FormGroup({
        id: new FormControl(m.id),
        userId: new FormControl(m.userId),
        messengerUserId: new FormControl(m.messengerUserId),
        name: new FormControl(m.name),
        pictureUrl: new FormControl(m.pictureUrl),
        fromLanguageCode: new FormControl(getLanguage(m.fromLanguageCode)),
        toLanguageCode: new FormControl(getLanguage(m.toLanguageCode))
      }));
    });

    this.setShowRegularGroupControl();
    this.setShowConnectedGroupLanguage();

    this.isLoading = false;
  }

  openGroupTypeModal() {
    const modalRef = this.modalService.open(GroupTypeModalComponent);
    modalRef.componentInstance.input = this.groupType.value;

    modalRef.result.then((result) => {
      if (result) {

        if (result !== this.groupType.value) {
          // clear connected group when group type changes
          let unspecifedConnectedGroup: ConnectedGroup = new ConnectedGroup();

          this.connectedGroup.setValue(unspecifedConnectedGroup);
          this.connectedGroupLanguageCode.setValue(getLanguage(unspecifedConnectedGroup.languageCode));
        }

        this.groupType.setValue(result)
        this.setShowRegularGroupControl();
        this.setShowConnectedGroupLanguage();

        this.save(false);
      }
    }, (reason) => {

    });
  }

  openLanguageModal(language: AbstractControl, alreadySelectedLanguage: AbstractControl) {
    const modalRef = this.modalService.open(LanguageModalComponent);
    modalRef.componentInstance.input = language.value;
    modalRef.componentInstance.alreadySelectedLanguage = alreadySelectedLanguage.value;

    modalRef.result.then((result) => {
      if (result) {
        language.setValue(result)
      }
    }, (reason) => {
      
    });
  }

  openAvailableGroupsModal() {
    const modalRef = this.modalService.open(AvailableConnectedGroupModalComponent);
    modalRef.componentInstance.input = this.connectedGroup.value;
    modalRef.componentInstance.groupId = this.id;
    modalRef.componentInstance.groupType = this.groupType.value.key;

    modalRef.result.then((result) => {
      if (result) {
        this.connectedGroup.setValue(result);
        this.connectedGroupLanguageCode.setValue(getLanguage(result.languageCode));
        this.setShowConnectedGroupLanguage();

        this.save(false);
      }
    }, (reason) => {

    });
  }

  setShowRegularGroupControl() {
    this.isShowRegularGroupControl = (this.groupType.value === this.groupTypes.regular);
  }

  setShowConnectedGroupLanguage() {
    this.isShowConnectedGroupLanguage = (this.connectedGroup.value.groupId !== null);
  }

  save(isClose: boolean) {
    // this update class on css
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    let data = {
      id: this.id,
      name: this.name.value,
      groupType: this.groupType.value.key,
      languageCode: this.languageCode.value.key,
      messengerUserId: this.user.userId,
      newConnectedGroupId: this.connectedGroup.value.groupId,
      members: []
    };

    this.members.controls.forEach(m => {
      let member = new Member(),
        memberFormGroup = (<FormGroup>m);

      member.id = memberFormGroup.controls.id.value;
      member.userId = memberFormGroup.controls.userId.value;
      member.messengerUserId = memberFormGroup.controls.messengerUserId.value;

      member.fromLanguageCode = memberFormGroup.controls.fromLanguageCode.value.key;
      member.toLanguageCode = memberFormGroup.controls.toLanguageCode.value.key;

      data.members.push(member)
    })

    this.isSaving = true;

    this.service.saveGroup(data).subscribe(
      data => {
        console.log("group has been successfully.", data);

        if (isClose) this.lineLIFFService.closeWindow();

        //if (this.isFromLiFF) {
        //  //this.lineLIFFService.closeWindow();
        //} else {

        //}
      },
      error => { console.log("Error", error); },
      () => {
        this.isSaving = false;
      }
    );
  }

  onSubmit(): void {
    this.save(true);
  }

  onCancel() {
    this.lineLIFFService.closeWindow();
  }
}
