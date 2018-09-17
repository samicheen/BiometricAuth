import { Component, OnInit } from "@angular/core";
import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "Authenticate",
    moduleId: module.id,
    templateUrl: "./authenticate.component.html"
})
export class AuthenticateComponent implements OnInit { 
    private fingerprintAuth: FingerprintAuth;
    public isTouch: Boolean;
    public isFace: Boolean;

    constructor(private router: RouterExtensions) {
        this.fingerprintAuth = new FingerprintAuth();
    }

    ngOnInit(){
        this.fingerprintAuth.available().then((result: BiometricIDAvailableResult) => {
            if(!result.any){
                this.router.navigate(["/login"], { clearHistory: true });
            }
            this.isTouch = result.touch;
            this.isFace =  result.face;
        });
    }

    login(){
        this.router.navigate(["/login"], { clearHistory: true });
    }

    biometric(){
            this.fingerprintAuth.verifyFingerprintWithCustomFallback({
                // message: 'Scan your finger', // optional, shown in the fingerprint dialog (default: 'Scan your finger').
                // fallbackMessage: 'Password', // optional, the button label when scanning fails (default: 'Enter password').
                authenticationValidityDuration: 10 // optional (used on Android, default 5)
            }).then(
                () => {
                    console.log("Fingerprint was OK");
                    this.router.navigate(["/home"], { clearHistory: true });
                },
                error => {
                    // when error.code === -3, the user pressed the button labeled with your fallbackMessage
                    if(error.code === -3){
                        this.login();
                    }
                    console.log("Fingerprint NOT OK. Error code: " + error.code + ". Error message: " + error.message);
                    
                }
            );
        }
}