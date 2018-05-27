import { Component, OnInit } from "@angular/core";
import { Appointment } from "~/models/appointment";
import { ContentService } from "~/models/content.service";

@Component({
    selector: "Appointments",
    providers: [ContentService],
    moduleId: module.id,
    templateUrl: "./appointments.component.html"
})
export class AppointmentsComponent implements OnInit {

    appointments: Array<Appointment>;

    constructor(private contentService: ContentService) {
        contentService.getAll<Appointment>(contentService.appointments)
            .then((data) => {
                // this.appointments = data;
            });
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
