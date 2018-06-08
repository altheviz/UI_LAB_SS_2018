import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "nativescript-cardview";
import { compose } from "nativescript-email";
import { dial } from "nativescript-phone";
import { ActionBar } from "tns-core-modules/ui/action-bar/action-bar";
import { openUrl } from "utils/utils";
import { Customer } from "~/models/customer";
import { DummyService } from "~/models/dummy.service";

registerElement("CardView", () => CardView);

@Component({
    selector: "CustomerDetail",
    providers: [DummyService],
    moduleId: module.id,
    templateUrl: "./customer-detail.component.html",
    styleUrls: ["./customer-detail.component.scss"]
})
export class CustomerComponent implements OnInit {
    customers: Array<Customer>;
    private id: string;
    private active: Customer;

    constructor(private route: ActivatedRoute, private dummyService: DummyService) {
        this.route.params.subscribe((params) => {
            this.id = params.id;
        });
        this.customers = dummyService.getCustomers();
        this.active = this.customers.filter((c) => c.id === this.id)[0];
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
        // No implementation yet
    }
}
