import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/core/data.service';
import { DataRequestService } from 'src/app/core/data-request.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    password: string;
    email: string;

    password1: string;
    password2: string;
    emailNew: string;

    errorMessage: string;

    showlogin: boolean = true;
    invalidLogin: boolean = false;
    invalidCreate: boolean = false;

    accountCreated: boolean = false;

    allowLogin: boolean = false;
    allowCreate: boolean = false;

    constructor(
        private dataService: DataService,
        private dataRequestService: DataRequestService,
        private router: Router,
    ) { }

    loginSwitch() {
        this.showlogin = !this.showlogin;
    }

    createNewAccount() {
        if (this.password1 === this.password2) {
            this.dataRequestService.getTest(this.emailNew, this.password1).subscribe(
                data => {
                    console.log(data);
                    if (data[0] === "account already exists") {
                          this.invalidCreate = true;
                          this.errorMessage = "Account already exists";
                          console.log(this.errorMessage)
                          console.log(this.invalidCreate)
                    } else {
                        this.invalidCreate = false;
                        this.accountCreated = true;
                    }
                }
            );
        } else {
            this.invalidCreate = true;
            this.errorMessage = "Passwords must be matching";
        }
    }

    login() {
        this.dataRequestService.login(this.email, this.password).subscribe(
            data => {
                console.log(data)
                if (data[0] === "invalid_details") {
                    this.invalidLogin = true;
                    this.errorMessage = "Wrong email and/or password, please try again";
                } else {
                    this.invalidLogin = false;
                    this.dataService.user_id = data[0].id;
                    this.dataService.email = data[0].email;
                    localStorage.setItem('versoAuthToken', this.dataService.user_id)
                    this.router.navigate(['/contents']);
                }
            }
        )
    }

    checkLogin() {
        this.allowLogin = (
          this.checkValidString(this.email) &&
          this.checkValidString(this.password)
        );
    }

    checkCreate() {
        this.allowCreate = (
            this.checkValidString(this.emailNew) &&
            this.checkValidString(this.password1) &&
            this.checkValidString(this.password2) &&
            this.password1 === this.password2
        );
    }

    checkValidString(string) {
        return (
            typeof string !== 'undefined' &&
            string.length > 0
        )
    }

    displayLoginErrorMessage() {
        this.invalidLogin = true;
        if (!this.checkValidString(this.password)) {
            this.errorMessage = "Please enter a valid password";
        } else if (!this.checkValidString(this.email)) {
            this.errorMessage = "Please enter a valid email";
        } else {
            this.errorMessage = "";
            this.invalidLogin = false;
        }
    }

    displayCreateErrorMessage() {
        this.invalidCreate = true;
        if (
            !this.checkValidString(this.password1) || !this.checkValidString(this.password2)
        ) {
            this.errorMessage = "Please enter a valid password";
        } else if (!this.checkValidString(this.password1)) {
            this.errorMessage = "Please enter a valid email";
        } else if (this.password1 !== this.password2) {
            this.errorMessage = "Please make sure passwords are matching";
        }
    }

    ngOnInit() {
        localStorage.removeItem('versoAuthToken');
    }

}
