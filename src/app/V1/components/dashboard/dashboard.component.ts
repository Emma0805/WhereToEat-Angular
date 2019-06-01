import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public restaurantForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.restaurantForm = new FormGroup({
      restaurant: new FormControl('')
    });
  }

}
