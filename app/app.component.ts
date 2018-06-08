import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getBoolean, setBoolean, setString } from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { init } from "nativescript-plugin-firebase";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    constructor(routerExtensions: RouterExtensions) {
        if (!getBoolean("remember", false)) {
            setBoolean("login", false);
            setString("user", "");
        }
        const isAlreadyLoggedIn = getBoolean("login", false);
        if (isAlreadyLoggedIn) {
            routerExtensions.navigate(["/tabs"], { clearHistory: true });
        }
    }

    ngOnInit() {
        init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
        }).then(
            (instance) => {
                console.log("firebase.init done");
            },
            (error) => {
                console.log(`firebase.init error: ${error}`);
            }
            );
    }
}
