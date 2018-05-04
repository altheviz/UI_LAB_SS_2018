import { Component, OnInit } from "@angular/core";

@Component({
  selector: "Appointments",
  moduleId: module.id,
  templateUrl: "./appointments.component.html"
})
export class AppointmentsComponent implements OnInit {

  private myItems: Array<any> = [
    {
      name: 'Item 1'
    },
    {
      name: 'ItemItemItem2'
    },
    {
      name: 'Item 1'
    },
    {
      name: 'Item 1'
    },
  ];

  constructor() {
    // Use the constructor to inject services.
  }

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
  }
}
