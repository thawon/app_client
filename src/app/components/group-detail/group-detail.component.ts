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
import { LanguageService } from '../../services/language.service';
import { LineLIFFService } from '../../services/line.liff.service';
import { Group } from '../../models/group.model';
import { Member } from '../../models/member.model';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLanguage } from '../../models/supported-language.model'

import { LanguageModalComponent } from '../common/language-modal/language-modal.component';
import { groupTypes, getGroupType} from '../../enums/groupType.enum'

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
  isSaveSuccessfully: boolean = false;
  isShowMultipleLanguageTranslation: boolean;
  maxMLTLanguage: number = 2;
  MLTchecked: boolean;
  selectedLanguage: string;

  turnOffLanguage: SupportedLanguage;
  groupTypes: any = groupTypes;
  
  isFromLiFF: boolean = false;
  form: FormGroup;
  name: AbstractControl;
  groupType: AbstractControl;
  languageCode: AbstractControl;
  member: AbstractControl;
  memberFromLanguage: AbstractControl;
  memberToLanguage: AbstractControl;
  languages = [];

  constructor(private service: GroupsService,
    public user: UserService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,    
    public lineLIFFService: LineLIFFService,
    private translate: TranslateService) {

    this.isLoading = true;
    this.turnOffLanguage = this.languageService.getLanguage('na');

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });  
    
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      groupType: new FormControl('', Validators.required),
      member: new FormControl('', Validators.required),
      memberFromLanguage: new FormControl(''),
      memberToLanguage: new FormControl('')
    });

    this.name = this.form.controls.name;
    this.groupType = this.form.controls.groupType;
    this.member = this.form.controls.member;
    this.memberFromLanguage = this.form.controls.memberFromLanguage;
    this.memberToLanguage = this.form.controls.memberToLanguage;

    this.retrieveGroup(this.id);
  }

  retrieveGroup(id: string) {
    //// when Ligo is invited to a group/room, group is created without member
    //// member is created when:
    //// (1) user joins the group/room
    //// (2) or tab on the group setting link sent when Ligo is invited.
    this.service.addMember(this.user.userId, id).toPromise()
      .then(() => {
        return this.service.getGroup(id, this.user.userId).toPromise();
      })
      .then((group) => {
        // after adding user as a member, then initialise the form.
        this.initialization(group);
      });

    //// when Ligo is invited to a group/room, group is created without member
    //// member is created when:
    //// (1) user joins the group/room
    //// (2) or tab on the group setting link sent when Ligo is invited.
    //if (this.lineLIFFService.isClientApp) {
    //  // isClientApp indicates that user tabs the group setting link
    //  this.service.addMember(this.user.userId, id).toPromise()
    //    .then(() => {
    //      return this.service.getGroup(id, this.user.userId).toPromise();
    //    })
    //    .then((group) => {
    //      // after adding user as a member, then initialise the form.
    //      this.initialization(group);
    //    });
    //} else {
    //  // form is accessed from website, no need to check and add user.
    //  this.service.getGroup(id, this.user.userId).subscribe(group => {
    //    this.initialization(group);
    //  });
    //}
  }
  
  initialization(group: Group) {
    this.name.setValue(group.name);
    this.groupType.setValue(getGroupType(group.groupType));
    this.member.setValue(group.member);
    this.memberFromLanguage.setValue(this.languageService.getLanguage(group.member.fromLanguageCode));
    this.memberToLanguage.setValue(this.languageService.getLanguage(group.member.toLanguageCode));
    this.languages = group.member.MLTLanguageCodes.map(mlt => this.languageService.getLanguage(mlt.toLanguageCode));

    this.isLoading = false;
    this.setShowMultipleLanguageTranslation();
    this.MLTchecked = (this.languages.length > 0) ? true: false;
  } 

  getSelectedLanguages() {
    let result = [];

    // get chosen toLanguage and MLT langauges
    result.push(this.memberToLanguage.value);
    this.languages.map(l => result.push(l));

    return result;
  }

  openLanguageModal(language: AbstractControl) {
    const modalRef = this.modalService.open(LanguageModalComponent);

    // filter out 'na' in case user want to turn off language.
    let alreadySelectedLanguages = this.getSelectedLanguages()
      .filter(lg => (lg.languageCode !== this.turnOffLanguage.languageCode && lg.languageCode !== language.value.languageCode));

    modalRef.componentInstance.alreadySelectedLanguages = alreadySelectedLanguages;
    modalRef.componentInstance.input = language.value;

    modalRef.result.then((result) => {
      if (result) {
        language.setValue(result);

        // clear MLT when translation is turned off.
        if (result.languageCode === this.turnOffLanguage.languageCode) this.clearMLTLanguage();
        this.setShowMultipleLanguageTranslation();
      }
    }, (reason) => {
      
    });
  }

  openLanguageModalForMultipleLanguageTranslation() {
    const modalRef = this.modalService.open(LanguageModalComponent);

    // 'na' is set to hide when select language for MLT
    modalRef.componentInstance.isNaAllowed = false;
    // tell language selection which languages user has chosen already so it will not show on the list.
    modalRef.componentInstance.alreadySelectedLanguages = this.getSelectedLanguages();
    // promt user to the first thing on the list which is 'na', but user must select a langauge
    modalRef.componentInstance.input = this.languageService.getLanguage(this.turnOffLanguage.languageCode);

    modalRef.result.then((result) => {
      if (result) {
        this.languages.push(result);
      }
    }, (reason) => {

    });
  }
  
  save(isClose: boolean) {
    // this update class on css
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    let data = {
      id: this.id,
      name: this.name.value,
      groupType: this.groupType.value.key,
      messengerUserId: this.user.userId,
      member: {
        id: this.member.value._id,
        userId: this.member.value.userId,
        messengerUserId: this.member.value.messengerUserId,
        fromLanguageCode: this.memberFromLanguage.value.languageCode,
        toLanguageCode: this.memberToLanguage.value.languageCode,
        MLTLanguageCodes: this.languages.map(lang => lang.languageCode)
      }
    };

    this.isSaving = true;
    this.isSaveSuccessfully = false;

    this.service.saveGroup(data).subscribe(
      data => {
        console.log('group has been saved successfully.', data);

        if (!this.lineLIFFService.isClientApp) {
          this.isSaveSuccessfully = true;
          return;
        }

        // display current language setup in user prefered language
        let message;
        switch (this.user.language) {
          case 'th':
            message = 'แสดงการตั้งค่าภาษาของฉัน';
            break;
          case 'zh':
            message = '告訴我我的語言設置';
            break;
          default:
            message = 'show me my language setup.';
            break;
        }

        if (isClose) this.lineLIFFService.sendMessageAndClose(message);
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

  changeLanguage(languageCode: string): void {
    this.translate.use(languageCode);
    this.user.language = languageCode;
  }

  onMLTcheckedChange(e) {
    if (!e.target.checked) this.clearMLTLanguage();
  }

  setShowMultipleLanguageTranslation() {    
    let isTurnOff = (this.memberToLanguage.value.languageCode === this.turnOffLanguage.languageCode);

    // MLT only is allowed to be setup after user turn on translation
    this.isShowMultipleLanguageTranslation = !(isTurnOff);
    if (isTurnOff) this.MLTchecked = false;
  }

  removeLanguage(index) {
    this.languages.splice(index, 1);
  }

  clearMLTLanguage() {
    this.languages = [];
  }
}
