import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { UnlessDirective } from "./unless-directive";

@NgModule({
    declarations: [
        UnlessDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [
        UnlessDirective
    ]
})
export class UnlessModule { }