import { Component, Input, OnInit } from "@angular/core";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { isAndroid } from "platform";

@Component({
    selector: "ListComponent",
    moduleId: module.id,
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

    @Input()
    listItems: Array<any> = [];

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    templateSelector(item: any, index: number, items: Array<any>) {

        if (item.type) {
            return item.type;
        } else {
            /* TODO: Quick Hack (!)
             *********************************************
             * Since we introduced firebase, our local type definitions in the 'models' folder are
             * no longer useable and we have to determine the list type elsewhere.
             *********************************************/
            console.log("ERROR (due to firebase): Using", item.constructor.name, "instead of the real item type.");
            // throw new Error("Unrecognized template!");
            return (item.constructor.name as string).toLowerCase();
        }
    }
}
