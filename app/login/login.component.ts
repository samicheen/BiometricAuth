import { Component } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { Login } from "~/login/Login";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent { 
    public input: Login;

    public constructor(private router: RouterExtensions) {
        this.input = Object();
    }

    public login() {
        const promise = Kinvey.User.login(this.input.username, this.input.password)
            .then((user: Kinvey.User) => {
                this.router.navigate(["/home"]);
            })
            .catch((error: Kinvey.BaseError) => {
              // ...
            });
    }
}