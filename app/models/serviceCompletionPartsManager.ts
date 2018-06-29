import { Injectable } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase";
import { ContentService } from "~/models/content.service";
import { Customer } from "~/models/customer";
import { Part } from "~/models/part";
import { ServiceCompletion } from "~/models/service-completion";
import { ServiceOrder } from "~/models/service-order";
import { ServiceProduct } from "~/models/service-product";
import { Technician } from "~/models/technician";
import { Warehouse } from "~/models/warehouse";

/**
 * A container that manages the parts from the warehouse, while being
 * used in a service completion. It manages two lists: One that holds all
 * unused parts of the warehouse, and one that stores all currently used parts.
 * If a part is used it will be moved from the first to
 * the second mentioned list and vice versa if it is no longer used.
 */
@Injectable()
export class ServiceCompletionPartManager {

    // List with all parts of a warehouse that are not used for the current service completion.
    unusedParts: Array<Part> = new Array();
    unusedAmounts: { [key: string]: number; } = {};

    // List with the parts used for a service completion.
    usedParts: Array<Part> = new Array();
    usedAmounts: { [key: string]: number; } = {};

    warehouseId: string;

    constructor(public contentService: ContentService) { }

    init(serviceOrderId: string): void {

        // Reset
        this.unusedParts = new Array();
        this.unusedAmounts = {};
        this.usedParts = new Array();
        this.usedAmounts = {};

        let serviceOrder: ServiceOrder;
        let warehouse: Warehouse;

        this.contentService.get<ServiceOrder>(this.contentService.serviceOrders, serviceOrderId)
            .then((serviceOrderData) => {

                serviceOrder = serviceOrderData;

                // Request planned parts
                serviceOrder.plannedParts.forEach((plannedPart) => {
                    const plannedQuantity = plannedPart.quantity;
                    this.contentService.get<Part>(this.contentService.parts, plannedPart.id.id).then((receivedPart) => {
                        this.usedAmounts[receivedPart.id] = plannedQuantity;
                        receivedPart.amount = plannedQuantity;
                        this.usedParts.push(receivedPart);
                    });
                });

                // Request all parts in the local warehouse
                this.contentService.getAll<Warehouse>(this.contentService.warehouses)
                    .then((warehouses) => {
                        warehouses.forEach((warehouseElement) => {
                            if (warehouseElement.technician.id === serviceOrder.technician.id) {
                                console.log("Using warehouse from", warehouseElement.name, "for service completion.");
                                console.log("Warehouse ID:", warehouseElement.id);

                                this.warehouseId = warehouseElement.id;
                                warehouse = warehouseElement;

                                // console.log(warehouse.parts);
                                warehouse.parts.forEach((part) => {
                                    const partQuantity = part.quantity;
                                    this.contentService.get<Part>(this.contentService.parts, part.id.id)
                                        .then((p) => {
                                            this.unusedAmounts[p.id] = partQuantity;

                                            // console.log(p);
                                            this.unusedParts.push(p);
                                        });
                                });
                            }
                        });
                    });
            });
    }

    addUsedPart(indexOfUnusedPart: number) {
        if (this.unusedParts.length > 0) {
            console.log("Adding warehouse item to the list of currently used items.");
            const temp: Part = this.unusedParts.splice(indexOfUnusedPart, 1)[0];

            temp.amount = 1;
            this.usedAmounts[temp.id] = 1;

            this.usedParts.push(temp);
        } else {
            console.log("Warehouse is empty. No more items to add!");
        }
    }

    removeUsedPart(index: number) {
        console.log("Removing part at index: " + index);
        // delete doesn't remove the item or reduces the array length. Splice does that.
        const temp: Part = this.usedParts.splice(index, 1)[0];

        // temp.usedAmount = Math.min(1, temp.amount);
        this.usedAmounts[temp.id] = Math.min(1, this.unusedAmounts[temp.id]);

        // TODO Amounts anpassen

        this.unusedParts.push(temp);
    }

    replaceUsedPart(indexOfOldUsedPart: number, indexOfNewPart: number) {
        const temp: Part = this.usedParts[indexOfOldUsedPart];
        this.usedParts[indexOfOldUsedPart] = this.unusedParts[indexOfNewPart];

        // temp.usedAmount = Math.min(1, temp.amount);
        this.usedAmounts[temp.id] = Math.min(1, this.unusedAmounts[temp.id]);

        // TODO Amounts anpassen

        this.unusedParts[indexOfNewPart] = temp;
    }

    setUsedPartAmount(index: number, newAmount: number) {
        const part: Part = this.usedParts[index];
        part.amount = newAmount;
        this.usedAmounts[part.id] = newAmount;
    }

    getAmountSequence(index: number): Array<string> {
        const amountSequence: Array<string> = new Array();

        // Creating sequence of incremented numbers.
        const unusedAmount: number = this.unusedAmounts[this.usedParts[index].id];

        Array.from(Array(unusedAmount).keys()).map((amount) => {
            amountSequence.push((amount + 1) + "");
        });
        return amountSequence;
    }

    getUnusedPartDescriptions(): Array<string> {
        const unusedPartDescriptions: Array<string> = new Array();
        this.unusedParts.forEach((part) => {
            unusedPartDescriptions.push(part.description);
        });
        return unusedPartDescriptions;
    }

    saveCompletion(
        hour: number,
        date: Date,
        customerId: string,
        serviceOrderId: string,
        serviceProductId: string,
        technicianId: string): void {

        const customer = this.contentService.customers.doc(customerId);
        const serviceOrder = this.contentService.serviceOrders.doc(serviceOrderId);
        const serviceProduct = this.contentService.serviceProducts.doc(serviceProductId);
        const technician = this.contentService.technicians.doc(technicianId);

        const parts = [];

        this.usedParts.forEach((usedPart) => {
            const part = this.contentService.parts.doc(usedPart.id);
            parts.push({
                id: part,
                quantity: usedPart.amount
            });
        });

        const serviceCompletion: ServiceCompletion = new ServiceCompletion(
            hour,
            customer,
            "Service successfully completed",
            date,
            serviceOrder,
            serviceProduct,
            technician,
            parts
        );

        this.contentService.add(this.contentService.serviceCompletions, serviceCompletion
            /* {
            actualTime: hour,
            creationDate: new Date(),
            customer: {customer},
            description:  "Service successfully completed",
            serviceDate: date,
            serviceOrder: {serviceOrder},
            serviceProduct: {serviceProduct},
            status: "DONE",
            technician: {technician},
            usedParts: this.usedParts
                }
            */
        )
            .then((completionId) => {
                console.log("Saved service completion with ID", completionId);
            }).catch((err) => {
                console.log("Error during save of a service completion");
                console.log(err);
            });
    }

    updateWarehouse(): void {

        const warehouse: Warehouse = new Warehouse();

        // this.contentService.update(this.contentService.warehouses, this.warehouseId, warehouse)
        this.contentService.get<Warehouse>(this.contentService.warehouses, this.warehouseId)
            .then((warehouseData) => {
                const warehouseParts = warehouseData.parts;
                const updatedParts: Array<any> = [];

                warehouseParts.forEach((warehousePart) => {

                    const newAmount = this.usedAmounts[warehousePart.id.id];
                    const difference = warehousePart.quantity - newAmount;

                    if (newAmount) {
                        console.log("Updating warehouse part", warehousePart.id.id);
                        console.log("Old quantity", warehousePart.quantity);
                        console.log("New quantity", difference);

                        // Don't save totally used parts
                        if (difference > 0) {
                            updatedParts.push({
                                id: this.contentService.parts.doc(warehousePart.id.id),
                                quantity: difference
                            });
                        }

                    } else {
                        updatedParts.push({
                            id: this.contentService.parts.doc(warehousePart.id.id),
                            quantity: warehousePart.quantity
                        });
                    }

                });

                warehouseData.parts = updatedParts;
                this.contentService.add(this.contentService.warehouses, warehouseData)
                    .then((newID) => {
                        console.log("Successfully updated warehouse", newID);
                        // console.log("Successfully updated warehouse", this.warehouseId);
                    }).catch((err) => {
                        console.log("Error during update of warehouse", this.warehouseId);
                        console.log(err);
                    });
            });

    }

    setCompletionFlag(serviceOrderId: string): void {
        this.contentService.get<ServiceOrder>(this.contentService.serviceOrders, serviceOrderId)
            .then((appointment) => {
                appointment.completed = true;

                this.contentService.update(this.contentService.serviceOrders, serviceOrderId, appointment)
                    .then(() => {
                        console.log("Successfully updated appointment", serviceOrderId);
                    }).catch((err) => {
                        console.log("Error during update of appointment", serviceOrderId);
                        console.log(err);
                    });
            });
    }
}
