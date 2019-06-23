import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new BehaviorSubject(null);
  public user$ = this.user.asObservable();

  constructor() { }

  updateUser(user: any) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    this.user.next(user);
  }
}
