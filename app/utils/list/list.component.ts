import { Component, Input, OnInit } from "@angular/core";
import {SetupItemViewArgs} from "nativescript-angular/directives";
import { isAndroid } from "platform";

@Component({
    selector: "ListComponent",
    moduleId: module.id,
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

    @Input("items")
    listItems: Array<any> = [];

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.third = (args.index % 3 === 0);
    }
}
