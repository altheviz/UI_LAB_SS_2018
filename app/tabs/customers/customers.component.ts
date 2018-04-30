import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Customers",
    moduleId: module.id,
    templateUrl: "./customers.component.html"
})
export class CustomersComponent implements OnInit {
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
