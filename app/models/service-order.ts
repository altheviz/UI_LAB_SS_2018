/**
 * All top-level information about a Service Order.
 */
export class ServiceOrder {
    id: string;

    technician: any;
    customer: any;
    serviceProduct: string;
    creationDate: Date;
    serviceDate: Date;
    plannedTime: number;
    plannedParts: Array<any>;
    description: string;
    completed: boolean;

    constructor() {
        this.technician = {};
        this.customer = {};
        this.serviceProduct = "";
        this.creationDate = new Date();
        this.serviceDate = new Date();
        this.plannedTime = 0;
        this.plannedParts = [{}];
        this.description = "";
        this.completed = false;
    }
}
