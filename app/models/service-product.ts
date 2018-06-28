import { Country, Location } from "~/models/location";

/**
 * All availabel service product stati:
 * ------------------------------------
 * OK: This product is working fine
 * Warning: This product is might break soon
 * Broken: This product isn't working anymore
 */
export enum ServiceProductStatus {
    OK = "OK",
    Warning = "Warning",
    Broken = "Broken"
}

/**
 * A service product
 */
export class ServiceProduct {

    readonly type: string = "service-product";
    id: string;

    // A short description of the service product
    name: string;

    // Current status of this service product
    status: ServiceProductStatus;

    // Concrete location of this service product within a company's site
    location: Location;

    serialNumber: string;
}
