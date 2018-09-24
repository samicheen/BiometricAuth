import { Component, OnInit } from "@angular/core";
import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth";
import { RouterExtensions } from "nativescript-angular/router";
import { BiometricService } from "~/services/BiometricService";


@Component({
    selector: "Authenticate",
    moduleId: module.id,
    templateUrl: "./authenticate.component.html"
})
export class AuthenticateComponent implements OnInit { 
    private fingerprintAuth: FingerprintAuth;
    private result: BiometricIDAvailableResult;

    constructor(private router: RouterExtensions, private biometricService: BiometricService) {
        this.fingerprintAuth = new FingerprintAuth();
        this.fingerprintAuth.available().then((result: BiometricIDAvailableResult) => {
            this.result = result;
        });
    }

    ngOnInit(){
        if(!this.result.any){
            this.router.navigate(["/login"], { clearHistory: true });
        }
    }

    login(){
        this.router.navigate(["/login"], { clearHistory: true });
    }

    biometric(){
        this.biometricService.biometric();
        }
}