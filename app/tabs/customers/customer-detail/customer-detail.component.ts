import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "nativescript-cardview";
import { compose } from "nativescript-email";
import { dial } from "nativescript-phone";
import { ActionBar } from "tns-core-modules/ui/action-bar/action-bar";
import { GestureEventData } from "ui/gestures";
import { openUrl } from "utils/utils";
import { Customer } from "~/models/customer";
import { DummyService } from "~/models/dummy.service";

// registerElement("CardView", () => CardView);

@Component({
  selector: "CustomerDetail",
  providers: [DummyService],
  moduleId: module.id,
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.scss"]
})
export class CustomerComponent implements OnInit {
  customers: Array<Customer>;
  private id: string;
  private active: Customer;

  constructor(private route: ActivatedRoute, private dummyService: DummyService) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.customers = dummyService.getCustomers();
    this.active = this.customers.filter((c) => c.id === this.id)[0];
  }

  openMaps() {
    console.log("Open company site");
  }

  goToHomepage(args: GestureEventData) {
    console.log("Open company homepage");
    console.log("Tap!");
    console.log("Object that triggered the event: " + args.object);
    console.log("View that triggered the event: " + args.view);
    console.log("Event name: " + args.eventName);
    // openUrl(homepage);
  }

  callAddressNumber(args: GestureEventData) {
    console.log("Call number of the company");
    console.log("Tap!");
    console.log("Object that triggered the event: " + args.object);
    console.log("View that triggered the event: " + args.view);
    console.log("Event name: " + args.eventName);
    //dial(telephone, true);
  }

  sendAddressMail(args: GestureEventData) {
    console.log("Send email to company");
    console.log("Tap!");
    console.log("Object that triggered the event: " + args.object);
    console.log("View that triggered the event: " + args.view);
    console.log("Event name: " + args.eventName);
    /*
    compose({
      to: [ email ]
    }).then(() => {
      console.log("Email composer closed");
    }, (err) => {
      console.log("Error: " + err);
    });
    */
  }

  ngOnInit(): void {}
}
