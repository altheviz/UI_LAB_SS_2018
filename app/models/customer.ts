import { Country, Location } from "~/models/location";
import { ServiceProduct } from "~/models/service-product";
import { Contact } from "./contact";
import { Site } from "./site";

/**
 * All top-level information about a company that is our customer.
 */
export class Customer {

    readonly type: string = "customer";
    id: string;

    // Name of the company
    name: string;

    // Company main telephone contact
    telephone: string;

    // Company main email address
    email: string;

    // Company homepage
    homepage: string;

    // Main address of the company
    address: Location;

    // Main responsible contact person of the company
    contact: Contact;

    // List of all contacts from that company
    contacts: Array<Contact>;

    // List of all sites
    sites: Array<Site>;

    // List of all service products that this company has bought
    serviceProducts: Array<ServiceProduct>;
}
