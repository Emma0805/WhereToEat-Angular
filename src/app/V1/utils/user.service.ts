import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private restaurantList = new BehaviorSubject([]);
  public restaurantList$ = this.restaurantList.asObservable();

  constructor() { }

  updateList(newList: any[]) {
    this.restaurantList.next(newList);
  }
}
