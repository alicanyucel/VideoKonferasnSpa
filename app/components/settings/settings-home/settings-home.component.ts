import { Component, OnInit } from '@angular/core';
import { SignedUser } from '../../../models/user/signedUser';
import { Router } from '@angular/router';
import { SignedUserDetails } from '../../../models/user/signedUserDetails';
import { ChangePassword } from '../../../models/user/changePassword';
/* Rxjs */
import { Observable } from 'rxjs';
/* NgRx */
import * as fromUser from '../../../ngrx/selectors/user.selectors';
import * as fromUserAccount from '../../../ngrx/selectors/user-account.selector';
import * as userActions from '../../../ngrx/actions/user.actions';
import * as userAccountActions from '../../../ngrx/actions/user-account.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.css']
})
export class SettingsHomeComponent implements OnInit {

  constructor(
    private userStore: Store<fromUser.State>,
    private router: Router,
    private userAccountStore: Store<fromUserAccount.State>
  ) { }

  signedUser$: Observable<SignedUser>;
  isNewPhoto$: Observable<boolean>;
  isNewCover$: Observable<boolean>;
  isUpdatedData$: Observable<boolean>;
  activeUrl: string = "settings/information";
  signedUserDetail$: Observable<SignedUserDetails>;
  errorMessage$: Observable<string>;

  ngOnInit() {
    this.userAccountStore.dispatch(new userAccountActions.GetSignedUserDetail());
    this.activeUrl = this.router.url;
    this.signedUser$ = this.userStore.pipe(select(fromUser.getSignedUser)) as Observable<SignedUser>;
    this.isNewCover$ = this.userStore.pipe(select(fromUser.getIsNewCover));
    this.isNewPhoto$ = this.userStore.pipe(select(fromUser.getIsNewPhoto));
    this.isUpdatedData$ = this.userAccountStore.pipe(select(fromUserAccount.getLoading));
    this.signedUserDetail$ = this.userAccountStore.pipe(select(fromUserAccount.getSignedUserDetail)) as Observable<SignedUserDetails>;
    this.errorMessage$ = this.userAccountStore.pipe(select(fromUserAccount.getError));
  }

  updateBasicInformations(details: SignedUserDetails) {
    this.userAccountStore.dispatch(new userAccountActions.UpdateBasicInformations(details));
  }

  updateEducation(details: SignedUserDetails) {
    this.userAccountStore.dispatch(new userAccountActions.UpdateBasicInformations(details));
  }

  updateExperience(details: SignedUserDetails) {
    this.userAccountStore.dispatch(new userAccountActions.UpdateBasicInformations(details));
  }

  updateUserPassword(details: ChangePassword) {
    this.userAccountStore.dispatch(new userAccountActions.UpdatePassword(details));
  }

}
