import { Contact } from "./contact";
import { Site } from "./site";
import { Country, Location } from "~/models/location";
import {ServiceProducts} from "~/models/service-products"


/**
 * All top-level information about a company that is our customer.
 */
export class Customer {

    readonly type: string = "customer";
    id: string;

    // Name of the company
    name: string;

    // Main responsible contact person of the company
    contact: Contact;
    contacts: Array<Contact>;
    address: Location;
    // List of all sites
    sites: Array<Site>;
    serviceProducts: Array<ServiceProducts>
    telephone: string;
    email: string;
    homepage: string;

}
