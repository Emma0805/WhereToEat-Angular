import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../utils/user.service';
import { CommonApiService } from '../../services/apis/common-api.service';
import { ConstantsService } from '../../utils/constants.service';

const createFormGroup = dataItem => new FormGroup({
    name: new FormControl(dataItem.name, Validators.required),
    location: new FormControl(dataItem.location)
});

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
    public authUser: any;
    private editedRowIndex: number;
    public formGroup: FormGroup;

    constructor(private userSerive: UserService, private api: CommonApiService) { }


    ngOnInit() {
        this.restaurantForm = new FormGroup({
            name: new FormControl('', Validators.required),
            location: new FormControl('')
        });
        this.getRestaurantList();
    }

    getRestaurantList() {
        this.userSerive.user$.subscribe(user => {
            if (user) {
                this.combineTwoList(user.places);
            }
            this.authUser = user;
        });
    }

    combineTwoList(newList: any[]) {
        newList.forEach(item => {
            if (!this.restaurantList.find(restaurant => {
                return item.name === restaurant.name && item.location === restaurant.location;
            })) {
                this.restaurantList.push(item);
            }
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

    saveList() {
        this.result = '';
        this.api.registerNewUser(ConstantsService.DATABASE + "/user/add/place/" + this.authUser.id, this.restaurantList).subscribe(res => {
            this.result = 'List saved';
            this.authUser.places = this.restaurantList;
            this.userSerive.updateUser(this.authUser);
        });
    }

    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);
        this.formGroup = createFormGroup(dataItem);
        this.editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.formGroup);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
        const restaurant = formGroup.value;
        Object.assign(
            this.restaurantList.find(({ name }) => name === restaurant.name),
            restaurant
        );
        sender.closeRow(rowIndex);
    }

    public removeHandler({ dataItem }): void {
        //TODO: delete confirm dialog
        const index = this.restaurantList.findIndex(({ name }) => name === dataItem.name);
        this.restaurantList.splice(index, 1);
    }
}
