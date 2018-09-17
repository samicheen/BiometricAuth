import { Component } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';

Kinvey.init({
    appKey: 'kid_Sys1m3XOX',
    appSecret: 'a4b02fe07d8b495195402e04cfc7ae6c'
});

Kinvey.ping()
    .then((response) => {
        console.log(`Kinvey Ping Success. Kinvey Service is alive, version: ${response.version}, response: ${response.kinvey}`);
    })
    .catch((error) => {
        console.log(`Kinvey Ping Failed. Response: ${error.description}`);
    });

const activeUser = Kinvey.User.getActiveUser();
if(activeUser != null)
    activeUser.logout();

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { }
