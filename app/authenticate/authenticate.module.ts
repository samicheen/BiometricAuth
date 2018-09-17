import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AuthenticateRoutingModule } from "./authenticate-routing.module";
import { AuthenticateComponent } from "./authenticate.component";
import { UnlessDirective } from "~/directives/unless-directive";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthenticateRoutingModule
    ],
    declarations: [
        AuthenticateComponent,
        UnlessDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthenticateModule { }