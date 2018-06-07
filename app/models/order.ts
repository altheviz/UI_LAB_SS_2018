/**
 * A spare item for repairs that is stored in the warehouse.
 */
export class Order {

    readonly type: string = "order";
    id: string;

    // Internal ID of a screw, sensor etc.
    partNumber: string;

    // A short description of the part for the technician
    description: string;

    // How many items are stored in the warehouse
    amount: number;

    // Status of the order (ordered, ready, done)
    status: string;
}
