import { Injectable } from "@angular/core";
import { ContentService } from "~/models/content.service";
import { Part } from "~/models/part";
import { ServiceOrder } from "~/models/service-order";
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

    // List with the parts used for a service completion.
    usedParts: Array<Part> = new Array();

    constructor(public contentService: ContentService) { }

    init(serviceOrderId: string): void {

        let serviceOrder: ServiceOrder;
        let warehouse: Warehouse;

        this.contentService.get<ServiceOrder>(this.contentService.serviceOrders, serviceOrderId)
            .then((serviceOrderData) => {

                serviceOrder = serviceOrderData;

                // Request planned parts
                /*
                serviceOrder.plannedParts.forEach((plannedPart) => {
                    this.contentService.get<Part>(this.contentService.parts, plannedPart.id.id).then((receivedPart) => {
                        this.usedParts.push(receivedPart);
                    });
                });
                */

                // Request all parts in the local warehouse
                this.contentService.getAll<Warehouse>(this.contentService.warehouses)
                    .then((warehouses) => {
                        warehouses.forEach((warehouseElement) => {
                            if (warehouseElement.technician.id === serviceOrder.technician.id) {
                                console.log("Using warehouse from", warehouseElement.name, "for service completion.");
                                warehouse = warehouseElement;

                                warehouse.parts.forEach((part) => {
                                    const partQuantity = part.quantiy;
                                    this.contentService.get<Part>(this.contentService.parts, part.id)
                                        .then((p) => {
                                            p.amount = partQuantity;
                                            this.unusedParts.push(p);
                                        });
                                });
                            }
                        });
                    });

                /*
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
                */
            });

        this.contentService.getAll<Part>(this.contentService.parts).then((partsData) => {
            partsData.forEach((partElement) => {
                this.unusedParts.unshift(partElement);
            });
        });
    }

    addUsedPart(indexOfUnusedPart: number) {
        if (this.unusedParts.length > 0) {
            console.log("Adding warehouse item to the list of currently used items.");
            const temp: Part = this.unusedParts.splice(indexOfUnusedPart, 1)[0];
            this.usedParts.push(temp);
        } else {
            console.log("Warehouse is empty. No more items to add!");
        }
    }

    removeUsedPart(index: number) {
        console.log("Removing part at index: " + index);
        // delete doesn't remove the item or reduces the array length. Splice does that.
        const temp: Part = this.usedParts.splice(index, 1)[0];
        temp.usedAmount = Math.min(1, temp.amount);
        this.unusedParts.push(temp);
    }

    replaceUsedPart(indexOfOldUsedPart: number, indexOfNewPart: number) {
        const temp: Part = this.usedParts[indexOfOldUsedPart];
        this.usedParts[indexOfOldUsedPart] = this.unusedParts[indexOfNewPart];
        temp.usedAmount = Math.min(1, temp.amount);
        this.unusedParts[indexOfNewPart] = temp;
    }

    setUsedPartAmount(index: number, newAmount: number) {
        this.usedParts[index].usedAmount = newAmount;
    }

    getAmountSequence(index: number): Array<string> {
        const amountSequence: Array<string> = new Array();
        // Creating sequence of incremented numbers.
        Array.from(Array(this.usedParts[index].amount).keys()).map((amount) => {
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
}
