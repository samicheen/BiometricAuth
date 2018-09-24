import { Component, OnInit } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth";
import * as appSettings from 'tns-core-modules/application-settings';
import { AppSettingKeys } from '../app-settings-keys';
import { Switch } from "ui/switch";
import { UserInfo } from "~/home/UserInfo";
import { confirm } from 'tns-core-modules/ui/dialogs';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent { 
    private fingerprintAuth: FingerprintAuth;
    private user_info: UserInfo;
    private new_user_info: UserInfo;
    private result: BiometricIDAvailableResult;
    private useBiometric: boolean;
    private username: string;

    constructor(private router: RouterExtensions) {
        this.fingerprintAuth = new FingerprintAuth();
        this.user_info = JSON.parse(appSettings.getString(AppSettingKeys.user_info));
        this.new_user_info = JSON.parse(appSettings.getString(AppSettingKeys.new_user_info, null));
        this.useBiometric = this.user_info.useBiometric;
        this.username = this.user_info.username;
        if(this.new_user_info !== null)
        {
            this.useBiometric = this.new_user_info.useBiometric;
            this.username = this.new_user_info.username;
        }
        
        this.fingerprintAuth.available().then((result: BiometricIDAvailableResult) => {
            this.result = result;
        });
        
    }

    public logout() {
        Kinvey.User.logout();
        appSettings.remove(AppSettingKeys.new_user_info);
        if(!this.result.any || !this.useBiometric){
            this.router.navigate(["/login"], { clearHistory: true });
        } else {
            this.router.navigate(["/authenticate"], { clearHistory: true });
        }
    }

    onToggle(args) {
        let biometricSwitch = <Switch>args.object;
        let useBiometric = biometricSwitch.checked;
        let biometricString = this.result.touch ? 'Touch ID': 'Face ID';
        let model = this;
        this.useBiometric = useBiometric;
        if(this.new_user_info !== null)
        {
            if(useBiometric)
            {
                // If new user and want to use Biometric Auth
                confirm({
                    title: 'Change '+biometricString+' user',
                    message: 'Your '+ biometricString +' will be enabled on this device and any '+ biometricString + ' saved on this device will have access to "BioAuth". Would you like to continue?',
                    okButtonText: 'Ok',
                    cancelButtonText: 'Cancel'
                })
                .then(function(result) {
                    if(result)
                    {
                        model.new_user_info.useBiometric = useBiometric;
                        appSettings.setString(AppSettingKeys.user_info, JSON.stringify(model.new_user_info));
                    }
                    else{
                        biometricSwitch.checked = false;
                    }
                });
            }
        }
        else {
            // This will run when new user is not there
            this.user_info = JSON.parse(appSettings.getString(AppSettingKeys.user_info));
            this.user_info.useBiometric = useBiometric;
            appSettings.setString(AppSettingKeys.user_info, JSON.stringify(this.user_info));
        }
    }
}
