/**
 * All top-level information about a Service Technician.
 */
export class Technician {
    id: string;

    fullName: string;
    email: string;
    password: string;
    image: string;
    autoLogin: boolean;
    lastLogin: Date;

    constructor() {
        this.fullName = "";
        this.email = "";
        this.password = "";
        this.image = "";
        this.autoLogin = false;
        this.lastLogin = new Date();
    }
}
