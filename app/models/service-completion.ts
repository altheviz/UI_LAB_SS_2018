import { firestore } from "nativescript-plugin-firebase";

export class ServiceCompletion {

    actualTime: number;
    creationDate: Date;
    customer: firestore.DocumentReference;
    description: string;
    id: string;
    serviceDate: Date;
    serviceOrder: firestore.DocumentReference;
    serviceProduct: firestore.DocumentReference;
    status: string;
    technician: firestore.DocumentReference;
    usedParts: Array<any>;

    constructor(
        actualTime: number,
        customer: any,
        description: string,
        serviceDate: Date,
        serviceOrder: any,
        serviceProduct: any,
        technician: any,
        usedParts: Array<any>
    ) {
        this.creationDate = new Date();
        this.status = "DONE";
        this.actualTime = actualTime;
        this.customer = customer;
        this.description = description;
        this.serviceDate = serviceDate;
        this.serviceOrder = serviceOrder;
        this.serviceProduct = serviceProduct;
        this.technician = technician;
        this.usedParts = usedParts;
    }
}
