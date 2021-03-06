import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "~/register/register.component";

const routes: Routes = [
    { path: "", redirectTo: "/authenticate", pathMatch: "full" },
    { path: "authenticate", loadChildren: "./authenticate/authenticate.module#AuthenticateModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
