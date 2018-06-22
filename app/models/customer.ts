import { Geolocation } from "./geolocation";

/**
 * All top-level information about a company that is our customer.
 */
export class Customer {

    readonly type: string = "customer";
    id: string;

    address: string;
    geolocation: Geolocation;
    country: string;
    zipCode: number;
    city: string;
    phone: string;
    name: string;
    email: string;
    web: string;

    constructor() {
        this.address = "";
        this.geolocation = new Geolocation(0, 0);
        this.country = "";
        this.zipCode = 0;
        this.city = "";
        this.phone = "";
        this.name = "";
        this.email = "";
        this.web = "";
    }
}
