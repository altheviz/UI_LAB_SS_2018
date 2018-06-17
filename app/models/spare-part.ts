/**
 * A spare item for repairs that is stored in the warehouse.
 */
export class SparePart {

    readonly type: string = "sparePart";
    id: string;

    // Internal ID of a screw, sensor etc.
    partNumber: string;

    // A short description of the part for the technician
    description: string;

    // How many items are stored in the warehouse
    amount: number;

    clone(): SparePart {
        const clone: SparePart = new SparePart();
        clone.id = this.id;
        clone.partNumber = this.partNumber;
        clone.description = this.description;
        clone.amount = this.amount;
        return clone;
    }
}
