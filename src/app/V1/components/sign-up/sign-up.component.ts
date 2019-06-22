import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonApiService } from '../../services/apis/common-api.service';
import { ConstantsService } from '../../utils/constants.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userFormGroup: FormGroup;

  constructor(private api: CommonApiService, private router: Router, public dialog: MatDialog) { }

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
    this.api.registerNewUser(ConstantsService.DATABASE + "/user/register", this.userFormGroup.value).subscribe(res => {
      sessionStorage.setItem("currentUser", JSON.stringify(res));
      this.dialog.closeAll();
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
