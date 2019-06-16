import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RowArgs } from '@progress/kendo-angular-grid';
import { Restaurant } from '../../utils/restaurant.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public restaurantForm: FormGroup;
    public restaurantList = [];
    public mySelection: string[] = [];
    public result = '';

    constructor() { }

    ngOnInit() {

        //For debugger
        this.restaurantList = [
            { name: 'bjgfvhbjnkml', location: 'dfgyuvcfytuio' },
            { name: 'ghfdterhrg', location: '456786fdgbh54r' },
            { name: 'rfedcvfghyu654', location: 'e3456yhgbfd' },
        ];
        //For debugger

        this.restaurantForm = new FormGroup({
            name: new FormControl('', Validators.required),
            location: new FormControl('')
        });
    }

    add() {
        if (!this.restaurantForm.value.name) {
            return;
        }
        if (this.restaurantList.find(restaurant => {
            return this.restaurantForm.value.name === restaurant.name;
        })) {
            alert('This name is already exist!');
        } else {
            this.restaurantList.push(this.restaurantForm.value);
            this.restaurantForm = new FormGroup({
                name: new FormControl(''),
                location: new FormControl('')
            });
        }
    }

    random() {
        this.result = '';
        var randomNumber = Math.floor(Math.random() * (this.mySelection.length));
        var item = this.restaurantList.find(restaurant => {
            return restaurant.name === this.mySelection[randomNumber]
        });
        this.result = 'Restaurant Name: ' + item.name + ', Restaurant Location: ' + item.location;
    }
}
