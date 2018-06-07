import { Component, OnInit } from "@angular/core";
import { DummyService } from "~/models/dummy.service";
import { Order } from "~/models/order";
import { SparePart } from "~/models/spare-part";

@Component({
    selector: "Warehouse",
    providers: [DummyService],
    moduleId: module.id,
    templateUrl: "./warehouse.component.html",
    styleUrls: ["./warehouse.component.scss"]
})
export class WarehouseComponent implements OnInit {

    spareParts: Array<SparePart>;
    orders: Array<Order>;

    constructor(private dummyService: DummyService) {
        this.spareParts = dummyService.getSpareParts();
        this.orders = dummyService.getOrders();
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
