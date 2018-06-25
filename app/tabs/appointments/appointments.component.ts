import { Component, OnInit } from "@angular/core";
import { ContentService } from "~/models/content.service";
import { Customer } from "~/models/customer";
import { ServiceOrder } from "~/models/service-order";

@Component({
    selector: "Appointments",
    providers: [ContentService],
    moduleId: module.id,
    templateUrl: "./appointments.component.html"
})
export class AppointmentsComponent implements OnInit {

    serviceOrders: Array<ServiceOrder> = [];

    constructor(private contentService: ContentService) {
        this.contentService.getAll<ServiceOrder>(this.contentService.serviceOrders).then((serviceOrdersData) => {
            serviceOrdersData.forEach((serviceOrderElement) => {
                this.serviceOrders.unshift(serviceOrderElement);
                this.contentService.get<Customer>(this.contentService.customers, serviceOrderElement.customer.id)
                    .then((customerData) => {
                        serviceOrderElement.customer = customerData;
                    });
            });
        });
    }
    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
