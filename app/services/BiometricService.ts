import { Injectable } from '@angular/core';
import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class BiometricService {
    private fingerprintAuth: FingerprintAuth;
    public isTouch: Boolean;
    public isFace: Boolean;

    constructor(private router: RouterExtensions) {
        this.fingerprintAuth = new FingerprintAuth();
    }

    biometric(){
        this.fingerprintAuth.verifyFingerprintWithCustomFallback({
            // message: 'Scan your finger', // optional, shown in the fingerprint dialog (default: 'Scan your finger').
            // fallbackMessage: 'Password', // optional, the button label when scanning fails (default: 'Enter password').
            authenticationValidityDuration: 10 // optional (used on Android, default 5)
        }).then(
            () => {
                this.router.navigate(["/home"], { clearHistory: true });
            },
            error => {
                // when error.code === -3, the user pressed the button labeled with your fallbackMessage
                if(error.code === -3){
                    this.router.navigate(["/login"], { clearHistory: true });
                }
                else{
                    this.router.navigate(["/authenticate"], { clearHistory: true });
                }
            }
        );
    }
  }