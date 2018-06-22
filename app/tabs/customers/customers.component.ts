import { Component, OnInit } from "@angular/core";
import { ContentService } from "~/models/content.service";
import { Customer } from "~/models/customer";

@Component({
    selector: "Customers",
    providers: [ContentService],
    moduleId: module.id,
    templateUrl: "./customers.component.html"
})
export class CustomersComponent implements OnInit {

    customers: Array<Customer> = [];

    constructor(private contentService: ContentService) { }

    ngOnInit(): void {
        this.contentService.getAll<Customer>(this.contentService.customers).then((customersData) => {
            customersData.forEach((customerElement) => {
                this.customers.unshift(customerElement);
            });
        });
    }
}
