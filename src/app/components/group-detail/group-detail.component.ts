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
import { Group } from '../../models/group.model';
import { Member } from '../../models/member.model';

import { GroupTypeModalComponent } from '../common/group-type-modal/group-type-modal.component';
import { LanguageModalComponent } from '../common/language-modal/language-modal.component';

import { LineLIFFService } from '../../services/line.liff.service';
import { LocalStroageService } from '../../services/local-stroage.service';

import { groupTypes, getGroupType} from '../../enums/groupType.enum'
import { supportedLanguages, getLanguage } from '../../enums/supportedLanguages.enum'

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent {
  id: string;

  groupTypes: any = groupTypes;
  supportedLanguages: any = supportedLanguages;
  isShowRegularGroupControl: boolean;

  isFromLiFF: boolean = false;

  form: FormGroup;
  name: AbstractControl;
  groupType: AbstractControl;
  languageCode: AbstractControl;
  members: FormArray;
  
  constructor(private service: GroupsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,    
    private lineLIFFService: LineLIFFService,
    @Inject('LIFF_ID_GROUP_DETAIL') private liffId: string,
    private localStorage : LocalStroageService) {

    this.route.params.subscribe(params => { this.id = params['id']; });  

    this.form = this.fb.group({
      name: new FormControl(''),
      groupType: new FormControl('', Validators.required),
      languageCode: new FormControl(''),
      members: new FormArray([])
    });

    this.name = this.form.controls.name;
    this.groupType = this.form.controls.groupType;
    this.languageCode = this.form.controls.languageCode;
    this.members = this.form.controls.members as FormArray;    

    this.initialize(); 
  }

  retrieveGroup(id) {
    this.service.getGroup(id).subscribe(group => {
      this.name.setValue(group.name);
      this.groupType.setValue(getGroupType(group.groupType));
      this.languageCode.setValue(group.languageCode);

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
    });

    this.setShowRegularGroupControl();
  }

  initialize() {
    // parsing query string
    const queryString = decodeURIComponent(window.location.search).replace('?liff.state=', '');
    const params = new URLSearchParams(queryString);

    // isLiff indicate whather the traffic is from Line LIFF
    const isLIFF: boolean = JSON.parse(params.get('isLIFF'));

    // liff must be initated prior the call, with paramter (groupid) it causes the page to redirect to the root    
    if (isLIFF) {
      // caches groupid from liff query string and use it after the redirect with no parameter

      this.localStorage.setItem('groupid', params.get('groupid'));

      // intented redirect without parameter
      window.location.href = `https://liff.line.me/${this.liffId}`;

      //this.storage.set('groupid', params.get('groupid')).subscribe(() => { });
    }
    else {
      // usable for both nornal link and from line liff

      this.route.params.subscribe(params => { this.id = params['id']; });        

      // '0' indicate traffic from LIFF, otherwise id is a objectId
      if (this.id === '0') {
        this.isFromLiFF = true;        
      }      
    }

    if (this.isFromLiFF) {
      this.id = this.localStorage.getItem('groupid');

      // clear local storage
      this.localStorage.removeItem('groupid')

      // initiates liff without paramter
      this.lineLIFFService.init(this.liffId)
        .then(() => {
          this.retrieveGroup(this.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.retrieveGroup(this.id);
    }
  }

  openGroupTypeModal() {
    const modalRef = this.modalService.open(GroupTypeModalComponent);
    modalRef.componentInstance.input = this.groupType.value;

    modalRef.result.then((result) => {
      if (result) {
        this.groupType.setValue(result)
        this.setShowRegularGroupControl();
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

  setShowRegularGroupControl() {
    this.isShowRegularGroupControl = (this.groupType.value === this.groupTypes.regular);
  }

  onSubmit(): void {
    // this update class on css
    this.form.markAllAsTouched();     
    if (this.form.invalid) return;

    let group = new Group();
    group.id = this.id;
    group.name = this.name.value;
    group.members = [];

    this.members.controls.forEach(m => {
      let member = new Member(),
          memberFormGroup = (<FormGroup>m);

      member.id = memberFormGroup.controls.id.value;
      member.userId = memberFormGroup.controls.userId.value;
      member.messengerUserId = memberFormGroup.controls.messengerUserId.value;

      member.fromLanguageCode = memberFormGroup.controls.fromLanguageCode.value.key;
      member.toLanguageCode = memberFormGroup.controls.toLanguageCode.value.key;

      group.members.push(member)
    })

    this.service.saveGroup(group).subscribe(
      data => {
        console.log("group has been successfully.", data);
        this.lineLIFFService.closeWindow();
        if (this.isFromLiFF) {
          this.lineLIFFService.closeWindow();
        } else {

        }
      },
      error => {
        console.log("Error", error);
      }
    );    
  }
}

//first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
//function memberLanguageValidator(fromLanguage: AbstractControl, toLanguage: AbstractControl, isLanguageSettingValid: AbstractControl): ValidatorFn {
//  return (control: AbstractControl): { [key: string]: boolean } | null => {
//    if (fromLanguage.value.key === toLanguage.value.key) {
//      isLanguageSettingValid.setValue(false);
//    } else {
//      isLanguageSettingValid.setValue(true);
//    }
//    return null;
//  };
//}
//member.controls.fromLanguageCode.setValidators(
//  memberLanguageValidator(member.controls.fromLanguageCode, member.controls.toLanguageCode, member.controls.isLanguageSettingValid));
//<!--< p * ngIf="!member.controls['isLanguageSettingValid'].value" class="text-danger animated fadeInRight" > From / To Language can not be the same.< /p>-->
