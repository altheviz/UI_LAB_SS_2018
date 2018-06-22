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
}
