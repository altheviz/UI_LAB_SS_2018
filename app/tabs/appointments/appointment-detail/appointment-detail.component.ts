import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { confirm } from "ui/dialogs";
import { ContentService } from "~/models/content.service";
import { Customer } from "~/models/customer";
import { Part } from "~/models/part";
import { ServiceOrder } from "~/models/service-order";
import { Technician } from "~/models/technician";

@Component({
    selector: "AppointmentDetail",
    moduleId: module.id,
    providers: [ContentService],
    templateUrl: "./appointment-detail.component.html",
    styleUrls: ["./appointment-detail.component.scss"]
})
export class AppointmentDetailComponent implements OnInit {

    serviceOrder: ServiceOrder;
    parts: Array<Part> = [];
    technician: Technician = new Technician();
    customer: Customer = new Customer();
    private id: string;

    constructor(private route: ActivatedRoute, private contentService: ContentService) {
        this.route.params.subscribe((params) => {
            this.id = params.id;
        });
        this.serviceOrder = new ServiceOrder();
    }
    ngOnInit(): void {
        this.contentService.get<ServiceOrder>(this.contentService.serviceOrders, this.id).then((serviceOrderData) => {
            this.serviceOrder = serviceOrderData;
            // console.log(serviceOrderData);
            this.contentService.get<Technician>(this.contentService.technicians, serviceOrderData.technician.id)
                .then((technicianData) => {
                    this.technician = technicianData;
                });
            this.contentService.get<Customer>(this.contentService.customers, serviceOrderData.customer.id)
                .then((customerData) => {
                    this.customer = customerData;
                });
            for (const orderPart of this.serviceOrder.plannedParts) {
                this.contentService.get<Part>(this.contentService.parts, orderPart.id.id).then((partData) => {
                    this.parts.push(partData);
                });
            }
        });
    }

    confirmServiceOrder() {
        console.log("ConfirmDialog!");
        confirm({
            title: "Complete Service Order",
            message: "Confirm the completion of the service order here.",
            okButtonText: "Confirm Completion",
            cancelButtonText: "Cancel"
        }).then((result) => {
            this.serviceOrder.completed = result;
            // TODO: Firebase Call!!! (as soon as completed field is added to firebase)
        });
    }
}
