import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonApiService } from '../../services/apis/common-api.service';
import { ConstantsService } from '../../utils/constants.service';
import { MatDialog } from '@angular/material';
import { UserService } from '../../utils/user.service';
import { Token } from '../../utils/token.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userFormGroup: FormGroup;
  public errorMessage = '';

  constructor(private api: CommonApiService, private userSerivce: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required)
    });
  }

  passwordMatchValidator() {
    if (this.password.value !== this.passwordConfirm.value) {
      this.passwordConfirm.setErrors({ "mismatch": true });
    }
  }

  register() {
    this.errorMessage = '';
    this.api.sendPostNoAuth(ConstantsService.DATABASE + "/register", this.userFormGroup.value).then((token: Token) => {
      if (token.userId) {
        this.api.updateToken(token);
        this.api.sendGetWithAuth(ConstantsService.DATABASE + "/user/" + token.userId).then((user) => {
          this.userSerivce.updateUser(user);
          this.dialog.closeAll();
        });
      }
    }, error => {
      this.errorMessage = error.error.message;
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
