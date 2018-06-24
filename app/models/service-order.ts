import { Customer } from "../../platforms/android/app/src/main/assets/app/models/customer";
/**
 * All top-level information about a Service Order.
 */
export class ServiceOrder {

    readonly type: string = "customer";
    id: string;

    technician: string;
    customer: string;
    serviceProduct: string;
    creationDate: Date;
    serviceDate: Date;
    plannedTime: number;
    plannedParts: number;
    description: string;

    constructor() {
        this.technician = "";
        this.customer = "";
        this.serviceProduct = "";
        this.creationDate = new Date();
        this.serviceDate = new Date();
        this.plannedTime = 0;
        this.plannedParts = 0;
        this.description = "";
    }
}
