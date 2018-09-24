import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AuthenticateRoutingModule } from "./authenticate-routing.module";
import { AuthenticateComponent } from "./authenticate.component";
import { UnlessModule } from "~/directives/unless.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthenticateRoutingModule,
        UnlessModule
    ],
    declarations: [
        AuthenticateComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthenticateModule { }