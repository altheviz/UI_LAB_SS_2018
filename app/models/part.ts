/**
 * All top-level information about a Service Order.
 */
export class Part {

    readonly type: string = "part";
    id: string;

    name: string;
    description: string;
    price: number;
    currency: string;
    unit: string;

    constructor() {
        this.description = "";
        this.name = "";
        this.price = 0;
        this.currency = "";
        this.unit = "";
    }
}
