import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DummyService } from "~/models/dummy.service";
import { Customer } from "~/models/customer";
import { ActionBar } from "tns-core-modules/ui/action-bar/action-bar";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "nativescript-cardview";
import * as utils from "utils/utils";

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

  constructor(
    private route: ActivatedRoute,
    private dummyService: DummyService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.customers = dummyService.getCustomers();
    this.active = this.customers.filter((c) => c.id === this.id)[0];
  }

  callAddressNumber() {
    console.log("call number of the company");
  }

  openMaps() {
    console.log("open map");
  }
  goToHomepage() {
    utils.openUrl(this.active.homepage);
  }
  sendAddressMail() {
    console.log("send mail");
  }

  ngOnInit(): void {}
}
