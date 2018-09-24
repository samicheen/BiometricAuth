import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { Register } from "~/register/Register";
import * as appSettings from 'tns-core-modules/application-settings';
import { AppSettingKeys } from '../app-settings-keys';
import { UserInfo } from "~/home/UserInfo";

@Component({
    selector: "Register",
    moduleId: module.id,
    templateUrl: "./register.component.html"
})
export class RegisterComponent { 
    public input: Register;
    public user_info: UserInfo;
    public new_user_info: UserInfo;

    public constructor(private location: Location, private router: RouterExtensions) {
        this.input = Object();
        this.user_info = JSON.parse(appSettings.getString(AppSettingKeys.user_info, null));
    }

    public register() {
        Kinvey.User.signup({
            firstname: this.input.firstname,
            lastname: this.input.lastname,
            email: this.input.email,
            username: this.input.username,
            password: this.input.password
          })
            .then((user: Kinvey.User) => {
                let user_info: UserInfo = Object();
                user_info.username =  this.input.username;
                user_info.password = this.input.password;
                user_info.useBiometric = false;
                // if user is not saved in the application
                if(this.user_info === null){
                    this.user_info = user_info;
                    appSettings.setString(AppSettingKeys.user_info, JSON.stringify(this.user_info));
                }
                // if user is new
                if(this.input.username !== this.user_info.username){
                    this.new_user_info = user_info;
                    appSettings.setString(AppSettingKeys.new_user_info, JSON.stringify(this.new_user_info));
                }
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