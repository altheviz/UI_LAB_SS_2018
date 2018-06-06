import { Country, Location } from "~/models/location";

export class ServiceProducts {
  readonly type: string = "service-products";
  id: string;
  name: string;
  status: string;
  location: Location;
}

