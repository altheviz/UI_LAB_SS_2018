import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "nativescript-cardview";
import { compose } from "nativescript-email";
import { dial } from "nativescript-phone";
import { openUrl } from "utils/utils";
import { ContentService } from "~/models/content.service";
import { Customer } from "~/models/customer";
import { DummyService } from "~/models/dummy.service";

registerElement("CardView", () => CardView);

@Component({
    selector: "CustomerDetail",
    providers: [ContentService],
    moduleId: module.id,
    templateUrl: "./customer-detail.component.html",
    styleUrls: ["./customer-detail.component.scss"]
})
export class CustomerComponent implements OnInit {

    customers: Array<Customer>;
    private id: string;
    private active: Customer;

    constructor(private route: ActivatedRoute, private contentService: ContentService) {
        this.route.params.subscribe((params) => {
            this.id = params.id;
        });

        // this.active = this.customers.filter((c) => c.id === this.id)[0];
    }

    openMaps() {
        console.log("Open company site");
    }

    goToHomepage() {
        console.log("Open company homepage");
        openUrl(this.active.homepage);
    }

    callAddressNumber() {
        console.log("Call number of the company");
        dial(this.active.telephone, true);
    }

    sendAddressMail() {
        console.log("Send email to company");
        compose({
            to: [this.active.email]
        }).then(() => {
            console.log("Email composer closed");
        }, (err) => {
            console.log("Error: " + err);
        });
    }

    ngOnInit(): void {
        this.contentService.getAll(this.contentService.customers).then((data) => {
            console.log(data);
            this.customers = data as Array<Customer>;
            console.log("---------------------------------------------------");
            console.log(this.customers);
        });
    }
}
