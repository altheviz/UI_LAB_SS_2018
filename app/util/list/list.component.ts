import { Component, OnInit, Input } from "@angular/core";
import { isAndroid } from "platform";
import {SetupItemViewArgs} from "nativescript-angular/directives";

@Component({
    selector: "ListComponent",
    moduleId: module.id,
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

    Input() myItems:Array<any>;


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
