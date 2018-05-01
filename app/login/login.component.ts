// Angular imports
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

// NativeScript imports
import { Color } from "color";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import { isAndroid } from "platform";

// App imports
import { User } from "./user/user";
import { UserService } from "./user/user.service";

@Component({
    selector: "LoginComponent",
    moduleId: module.id,
    providers: [UserService],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    user: User;

    @ViewChild("container") container: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("password") password: ElementRef;

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = "nils@holgersson.se";
        this.user.password = "Selma Lagerlöf";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_uilab";
    }

    submit() {
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }
        this.login();
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(["/tabs"]),
                (error) => alert("Unfortunately we could not find your account.")
            );
    }
}