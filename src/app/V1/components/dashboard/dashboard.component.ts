import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../utils/user.service';

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

    constructor(private userSerive: UserService) { }

    ngOnInit() {
        this.restaurantForm = new FormGroup({
            name: new FormControl('', Validators.required),
            location: new FormControl('')
        });
        this.getRestaurantList();
    }

    getRestaurantList() {
        const authUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (authUser) {
            this.restaurantList = authUser.places || [];
        } else {
            this.userSerive.restaurantList$.subscribe(list => {
                //TODO: if the user input some place then login, it should combine two list.
                this.restaurantList = list;
                this.result = '';
            });
        }
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
