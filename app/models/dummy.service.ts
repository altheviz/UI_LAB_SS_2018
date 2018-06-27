import { Injectable } from "@angular/core";

import { Appointment } from "~/models/appointment";
import { Contact } from "~/models/contact";
import { Customer } from "~/models/customer";
import { Country, Location } from "~/models/location";
import { Note } from "~/models/note";
import { Order } from "~/models/order";
import { ServiceProduct, ServiceProductStatus } from "~/models/service-product";
import { Site } from "~/models/site";
import { SparePart } from "~/models/spare-part";

const location = new Location();
location.id = "location01";
location.street = "Moltkestraße";
location.number = "30";
location.zipCode = 76133;
location.city = "Karlsruhe";
location.country = Country.DE;
location.latitude = 49.015666;
location.longitude = 8.389606;

const site = new Site();
site.id = "site01";
site.name = "HSKA Main Campus";
site.location = location;

const contact = new Contact();
contact.id = "contact01";
contact.firstName = "John";
contact.lastName = "Doe";
contact.position = "Site Manager";
contact.email = "john.doe@company.com";
contact.phone = "+49 1234 56 78 90 12";

@Injectable()
export class DummyService {

    getAppointments(): Array<Appointment> {

        const appointment1 = new Appointment();
        appointment1.id = "appointment01";
        appointment1.description = "Repair smart coffee machine @HsKA";
        appointment1.date = new Date("2018-05-25T08:30:00");
        appointment1.site = site;

        const appointment2 = new Appointment();
        appointment2.id = "appointment02";
        appointment2.description = "Repair smart coffee machine @HsKA again";
        appointment2.date = new Date("2018-06-15T10:30:00");
        appointment2.site = site;

        const appointment3 = new Appointment();
        appointment3.id = "appointment03";
        appointment3.description = "Throw smart coffee machine in the trash @HsKA";
        appointment3.date = new Date("2018-07-20T16:00:00");
        appointment3.site = site;
        const appointment4 = new Appointment();
        appointment4.id = "appointment03";
        appointment4.description = "Throw smart coffee machine in the trash @HsKA";
        appointment4.date = new Date("2018-07-20T16:00:00");
        appointment4.site = site;
        const appointment5 = new Appointment();
        appointment5.id = "appointment03";
        appointment5.description = "Throw smart coffee machine in the trash @HsKA";
        appointment5.date = new Date("2018-07-20T16:00:00");
        appointment5.site = site;
        const appointment6 = new Appointment();
        appointment6.id = "appointment03";
        appointment6.description = "Throw smart coffee machine in the trash @HsKA";
        appointment6.date = new Date("2018-07-20T16:00:00");
        appointment6.site = site;
        const appointment7 = new Appointment();
        appointment7.id = "appointment03";
        appointment7.description = "Throw smart coffee machine in the trash @HsKA";
        appointment7.date = new Date("2018-07-20T16:00:00");
        appointment7.site = site;
        const appointment8 = new Appointment();
        appointment8.id = "appointment03";
        appointment8.description = "Throw smart coffee machine in the trash @HsKA";
        appointment8.date = new Date("2018-07-20T16:00:00");
        appointment8.site = site;
        const appointment9 = new Appointment();
        appointment9.id = "appointment03";
        appointment9.description = "Throw smart coffee machine in the trash @HsKA";
        appointment9.date = new Date("2018-07-20T16:00:00");
        appointment9.site = site;
        const appointment10 = new Appointment();
        appointment10.id = "appointment03";
        appointment10.description = "Throw smart coffee machine in the trash @HsKA";
        appointment10.date = new Date("2018-07-20T16:00:00");
        appointment10.site = site;

        const appointments = [];
        appointments.push(appointment1);
        appointments.push(appointment2);
        appointments.push(appointment3);
        appointments.push(appointment4);
        appointments.push(appointment5);
        appointments.push(appointment6);
        appointments.push(appointment7);
        appointments.push(appointment8);
        appointments.push(appointment9);
        appointments.push(appointment10);

        return appointments;
    }

    getContacts(): Array<Contact> {

        const contacts = [];

        contacts.push(contact);
        contacts.push(contact);

        return contacts;
    }

    getServiceProducts(): Array<ServiceProduct> {

        const serviceProducts = [];

        const product1 = new ServiceProduct();
        product1.id = "serviceproduct01";
        product1.location = location;
        product1.name = "Server 01";
        product1.status = ServiceProductStatus.OK;
        serviceProducts.push(product1);

        const product2 = new ServiceProduct();
        product2.id = "serviceproduct02";
        product2.name = "USV Modul";
        product2.status = ServiceProductStatus.Broken;
        product2.location = location;
        serviceProducts.push(product2);

        return serviceProducts;
    }

    getNotes(): Array<Note> {

        const notes: Array<Note> = [];
        notes[0] = new Note(6001, 1001, "TASK", "Call Mr. President",
            "We mean the company president, not the state president", "2018-04-01 10:30:00 UTC", "OPEN");
        notes[1] = new Note(6002, 1001, "TASK", "Repair the Atlas carefully",
            "This robot may grab and throw you. Really!", "2018-04-01 10:30:00 UTC", "OPEN");
        notes[2] = new Note(6003, 1001, "TASK", "Order temperature sensors",
            "Need more for the next weeks", "2018-04-01 10:30:00 UTC", "DONE");
        notes[3] = new Note(6004, 1001, "TASK", "Call Jan Itor",
            "He has got some parts to share with me", "2018-04-01 10:30:00 UTC", "DONE");
        notes[4] = new Note(6005, 1001, "NOTE", "Atlas papers",
            "Tech papers for the robor are in our new Wiki", "2018-04-01 10:30:00 UTC", "OPEN");
        notes[5] = new Note(6006, 1001, "NOTE", "Other stuff",
            "Won't need these things anymore", "2018-04-01 10:30:00 UTC", "DONE");
        notes[6] = new Note(6007, 1001, "TASK", "Buy more cable",
            "The cables are needed in most of the appointments", "2018-04-01 10:30:00 UTC", "OPEN");
        notes[7] = new Note(6008, 1001, "TASK", "Talk to Nick",
            "He has got some valuable tech papers", "2018-04-01 10:30:00 UTC", "OPEN");
        notes[8] = new Note(6009, 1001, "TASK", "Buy cable",
            "10m cable needed", "2018-04-01 10:30:00 UTC", "DONE");
        notes[9] = new Note(6010, 1001, "TASK", "Buy cable",
            "More cable needed", "2018-04-01 10:30:00 UTC", "DONE");
        notes[10] = new Note(6011, 1001, "TASK", "Model numbers",
            "The numbers are behind the robot. In the box where it says 'do not open'",
            "2018-04-01 10:30:00 UTC", "OPEN");
        notes[11] = new Note(6012, 1001, "TASK", "Sensors",
            "New PDFs are available - data sheet", "2018-04-01 10:30:00 UTC", "OPEN");

        return notes;
    }

    getEmail(id: number): string {
        return "h@w.com";
    }

    getCurrentUser(email: string): number {
        return 1001;
    }

    getSpareParts(): Array<SparePart> {

        const spareParts = [];

        const part1 = new SparePart();
        part1.id = "part01";
        part1.partNumber = "ASIN_B01IH803FI";
        part1.description = "Screw Assortment Kit";
        part1.amount = 2;
        spareParts.push(part1);

        const part2 = new SparePart();
        part2.id = "part02";
        part2.partNumber = "ASIN_B00MG2PETW";
        part2.description = "Temperature Sensor";
        part2.amount = 5;
        spareParts.push(part2);

        const part3 = new SparePart();
        part3.id = "part03";
        part3.partNumber = "ASIN_B073F472JL";
        part3.description = "Humidity Sensor Module";
        part3.amount = 2;
        spareParts.push(part3);

        const part4 = new SparePart();
        part4.id = "part04";
        part4.partNumber = "ASIN_B00QZLV03O";
        part4.description = "Precision Repair Tool Ki";
        part4.amount = 1;
        spareParts.push(part4);

        const part5 = new SparePart();
        part5.id = "part05";
        part5.partNumber = "ASIN_B00JJTPWII";
        part5.description = "Wire 50 ft Solid Copper Cable";
        part5.amount = 2;
        spareParts.push(part5);

        return spareParts;
    }

    getOrders(): Array<Order> {

        const orderedParts = [];

        const part1 = new Order();
        part1.id = "order1";
        part1.partNumber = "ASIN_B01IH803FI";
        part1.description = "Screw Assortment Kit";
        part1.amount = 2;
        part1.status = "ordered";
        orderedParts.push(part1);

        const part2 = new Order();
        part2.id = "order2";
        part2.partNumber = "ASIN_B00MG2PETW";
        part2.description = "Temperature Sensor";
        part2.amount = 5;
        part2.status = "ready";
        orderedParts.push(part2);

        return orderedParts;
    }
}
