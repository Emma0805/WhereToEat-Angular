import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Where To Eat';
  public authUser = null;

  constructor(public dialog: MatDialog, private userSerive: UserService) {
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  public openSignUpDialog(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    });
  }

  public openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.userSerive.updateList(this.authUser.places);
    });
  }

  public logout() {
    sessionStorage.clear();
    this.authUser = null;
    this.userSerive.updateList([]);
  }
}
