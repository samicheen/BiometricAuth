import { Component, OnInit } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent { 
    private fingerprintAuth: FingerprintAuth;

    constructor(private router: RouterExtensions) {
        this.fingerprintAuth = new FingerprintAuth();
    }

    public logout() {
        const promise = Kinvey.User.logout()
        .then(() => {
            this.fingerprintAuth.available().then((result: BiometricIDAvailableResult) => {
                if(!result.any){
                    this.router.navigate(["/login"], { clearHistory: true });
                } else {
                    this.router.navigate(["/authenticate"], { clearHistory: true });
                }
            });   
        }).catch((error: Kinvey.BaseError) => {
            // ...
        });
    }
}
