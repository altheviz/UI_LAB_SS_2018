// Angular imports
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
// NativeScript imports
import { Color } from "color";
import { isAndroid } from "platform";
import { View } from "ui/core/view";
import { Page } from "ui/page";

// App imports
import { User } from "./user/user";
import { UserService } from "./user/user.service";
import { ActivityIndicator } from "ui/activity-indicator";

@Component({
    selector: "LoginComponent",
    moduleId: module.id,
    providers: [UserService],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})



export class LoginComponent implements OnInit {

    user: User;
    appSettings = require("application-settings");

    @ViewChild("container") container: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("password") password: ElementRef;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = "nils@holgersson.se";
        this.user.password = "Selma Lagerlöf";
    }

    ngOnInit() {
        console.log("Init login screen");
        const isAlreadyLoggedIn = this.appSettings.getBoolean("login", false);
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_uilab";
        if (isAlreadyLoggedIn) {
            this.routerExtensions.navigate(["/tabs"], { clearHistory: true });
        }
    }

    submit() {
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }
        this.appSettings.setBoolean("login", true);
        this.appSettings.setString("user", this.user.email)
        this.login();
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
                () => this.routerExtensions.navigate(["/tabs"], { clearHistory: true }),
                (error) => alert("Unfortunately we could not find your account.")
            );
    }
}
