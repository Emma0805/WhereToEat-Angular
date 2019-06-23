import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonApiService } from '../../services/apis/common-api.service';
import { ConstantsService } from '../../utils/constants.service';
import { MatDialog } from '@angular/material';
import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userFormGroup: FormGroup;
  public errorMessage = '';

  constructor(private api: CommonApiService, private userSerivce: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }


  login() {
    this.errorMessage = '';
    this.api.login(ConstantsService.DATABASE + "/user", this.userFormGroup.value).subscribe(res => {
      if (res === null) {
        this.errorMessage = 'Username or password is invalid.';
      } else {
        this.userSerivce.updateUser(res);
        this.dialog.closeAll();
      }
    });
  }

  getErrorMessage(element: string) {
    return this[element].hasError('required') ? 'You must enter a value' :
      this[element].hasError('email') ? 'Not a valid email' :
        this[element].hasError('mismatch') ? 'Password dismatch' :
          '';
  }

  get email() {
    return this.userFormGroup.get('email');
  }

  get password() {
    return this.userFormGroup.get('password');
  }

  get passwordConfirm() {
    return this.userFormGroup.get('passwordConfirm');
  }

}
