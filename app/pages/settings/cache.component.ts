import { Component, ElementRef, NgZone, OnInit, ViewChild,  Input, ChangeDetectionStrategy } from "@angular/core";
import { TextField } from "ui/text-field";
import { Http, Headers, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Router} from "@angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";
let cache = require("nativescript-cache");
var Toast = require("nativescript-toast");
@Component({
  selector: "cache",
  moduleId: module.id,
  templateUrl: "./settings.html",
  styleUrls: ["./settings-common.css", "./settings.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CacheComponent  implements OnInit{
  isLoading = false;
  listLoaded = false;
    organisations: ObservableArray<string>;
  constructor(private router: Router,  private zone: NgZone, private http: Http) {
  }
   ngOnInit() {
       this.isLoading = true;
      this.organisations = new ObservableArray(["Google", "Microsoft", "Node.js"]);
           this.isLoading = false;
           this.listLoaded = true;

    }

    clear() {
        cache.clear();
        Toast.makeText("Cleared cache").show()
    }

    codeSite() {
        this.router.navigate(["/cache"]);
    }
     logout() {
        let dialogs = require("ui/dialogs");
        dialogs.confirm({
            title: "Logout",
            message: "Wollen Sie sich wirklich ausloggen?",
            okButtonText: "Ja",
            cancelButtonText: "Nein"
        }).then((result) => {
        if(result){
           this.router.navigate([""]);
           }
        });
        }
        public onItemTap(args) {
        this.router.navigate(["/repolist", args.index]);
      }
}

// Name und Html url
