import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "nativescript-cardview";
import { compose } from "nativescript-email";
import { dial } from "nativescript-phone";
import { openUrl } from "utils/utils";
import { ContentService } from "~/models/content.service";
import { Customer } from "~/models/customer";

registerElement("CardView", () => CardView);

@Component({
    selector: "CustomerDetail",
    providers: [ContentService],
    moduleId: module.id,
    templateUrl: "./customer-detail.component.html",
    styleUrls: ["./customer-detail.component.scss"]
})
export class CustomerComponent implements OnInit {

    private id: string;
    private customer: Customer;

    constructor(private route: ActivatedRoute, private contentService: ContentService) {
        this.route.params.subscribe((params) => {
            this.id = params.id;
        });
        this.customer = new Customer();
    }

    openMaps() {
        console.log("Open company site");
    }

    gotoHomepage() {
        console.log("Open company homepage");
        openUrl(this.customer.web);
    }

    callNumber() {
        console.log("Call number of the company");
        dial(this.customer.phone, true);
    }

    sendEmail() {
        console.log("Send email to company");
        compose({
            to: [this.customer.email]
        }).then(() => {
            console.log("Email composer closed");
        }, (err) => {
            console.log("Error: " + err);
        });
    }

    ngOnInit(): void {
        this.contentService.get<Customer>(this.contentService.customers, this.id).then((data) => {
            this.customer = data;
        });
    }
}
