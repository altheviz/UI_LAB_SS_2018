import observable = require("data/observable");
import { Page } from "ui/page";
import view = require("ui/core/view");
import listView = require("ui/list-view");
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import label = require("ui/label");


import * as gridModule from "ui/layouts/grid-layout";
import * as utils from "utils/utils";

import {Color} from "color";

import { View } from "ui/core/view";
import * as tabViewModule from "ui/tab-view";

@Component({
    selector: "my-app",
    
    templateUrl: "./pages/login/login.html",
    styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
  })

  //let page: Page;

export class LoginComponent {
    //myItems: String[];
    page: Page

    constructor () {
        //this.page.bindingContext = { myItems: [{ name: "Name1" }, { name: "Name2" }, { name: "Name3" }] };
    }


    onLoaded(args: observable.EventData) {
        console.log("onLoaded")
        this.page = <Page>args.object
        this.page.bindingContext = observable.fromObject({
            selectedIndex: 0
        });
        this.selectedIndexChanged(null);
    }

    selectedIndexChanged(args) {
        if (this.page !== undefined) {
            let tabView = this.page.getViewById<tabViewModule.TabView>("tabView");
            let index = tabView.selectedIndex;
            console.log(index)
            let names = [ "btn-red", "btn-yellow", "btn-blue", "btn-lightblue", "btn-lightgreen" ];
            for (let name of names) {
                console.log(name)
                
                let view = this.page.getViewById<View>("" + index + name);
                if (view !== undefined) {
                    view.className = name;
                    view.className = name + "-animated";
                }
            }
        }
    }


    buttonTap(args: observable.EventData) {
        console.log("buttonTap")
        let button = <View>args.object;
        let className = button.className.replace("-animated", "").replace("2", "");
        button.className = className;
        button.className = className + "-animated2";
}

}