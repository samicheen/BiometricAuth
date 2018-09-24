import { Component } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { BackendService } from "~/services/BackendService";
import * as appSettings from 'tns-core-modules/application-settings';
import { RouterExtensions } from "nativescript-angular/router";
import { BiometricService } from "~/services/BiometricService";
import { AppSettingKeys } from "~/app-settings-keys";
import { UserInfo } from "~/home/UserInfo";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    useBiometric = false;
    user_info: UserInfo;

    constructor(private router: RouterExtensions, private biometricService: BiometricService){
        // Initialize Kinvey
        BackendService.setup();
        // Logout user, if user is aleady logged in
        Kinvey.User.logout();
        // Remove saved entry for new user
        appSettings.remove(AppSettingKeys.new_user_info);

        this.user_info = JSON.parse(appSettings.getString(AppSettingKeys.user_info, null));
        
        if(this.user_info !== null)
            this.useBiometric = this.user_info.useBiometric;

        if(this.useBiometric){
            this.biometricService.biometric();
        }
        else{
            this.router.navigate(["/login"], { clearHistory: true });
        }
        
    }
}
