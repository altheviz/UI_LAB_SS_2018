import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContentService } from "~/models/content.service";
import { ServiceOrder } from "~/models/service-order";

@Component({
    selector: "AppointmentDetail",
    moduleId: module.id,
    providers: [ContentService],
    templateUrl: "./appointment-detail.component.html",
    styleUrls: ["./appointment-detail.component.scss"]
})
export class AppointmentDetailComponent implements OnInit {

    serviceOrder: ServiceOrder;
    private id: string;

    constructor(private route: ActivatedRoute, private contentService: ContentService) {
        this.route.params.subscribe((params) => {
            this.id = params.id;
        });
        this.serviceOrder = new ServiceOrder();
    }
    ngOnInit(): void {
        this.contentService.get<ServiceOrder>(this.contentService.serviceOrders, this.id).then((data) => {
            console.log(data);
            this.serviceOrder = data;
        });
    }
}
