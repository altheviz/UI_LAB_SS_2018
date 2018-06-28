
export class SparePart {

    readonly type: string = "part";
    id: string;

    // Internal ID of a screw, sensor etc.
    partNumber: string;

    // A short description of the part for the technician
    description: string;

    // How many items are stored in the warehouse
    amount: number;

    // How many times has the item been used
    usedAmount: number = 0; // TODO: Add constructor, so this can be set to minimum
}
