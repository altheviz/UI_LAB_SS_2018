import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Appointments",
    moduleId: module.id,
    templateUrl: "./appointments.component.html"
})
export class AppointmentsComponent implements OnInit {

    appointments: Array<string> = [
        "teamJAG", "Pappnase", "Die Lappenhaften", "Dungeonkeepers", "Aviator",
        "3null3", "SexyMachine4001", "Anime Gurl 96", "Die Ritter der Zärtlichkeit"
    ];

    constructor() {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
