import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { Register } from "~/register/RegisterInput";

@Component({
    selector: "Register",
    moduleId: module.id,
    templateUrl: "./register.component.html"
})
export class RegisterComponent { 
    public input: Register;

    public constructor(private location: Location, private router: RouterExtensions) {
        this.input = Object();
    }

    public register() {
        const promise = Kinvey.User.signup({
            firstname: this.input.firstname,
            lastname: this.input.lastname,
            email: this.input.email,
            username: this.input.username,
            password: this.input.password,
          })
            .then((user: Kinvey.User) => {
                this.router.navigate(["/home"]);
            })
            .catch((error: Kinvey.BaseError) => {
              // ...
            });
    }

    public goBack() {
        this.location.back();
    }
}