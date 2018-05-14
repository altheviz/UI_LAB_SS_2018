import { Component, OnInit } from "@angular/core";
import { PageRoute } from "nativescript-angular/router";
import { isAndroid } from "platform";
import { switchMap } from "rxjs/operators";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";

@Component({
    selector: "TabsComponent",
    moduleId: module.id,
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {

    private _title: string;

    constructor(private pageRoute: PageRoute) {
        // Use the component constructor to inject providers.

        // use switchMap to get the latest activatedRoute instance

        this.pageRoute.activatedRoute.pipe(
            switchMap((activatedRoute) => activatedRoute.params)
        ).forEach((params) => {
            console.log(params.tab);
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onNewServiceRequest() {
        console.log("TODO: Call ServiceRequestComponent");
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
        }
    }

    getIconSource(icon: string): string {
        return isAndroid ? "" : "res://tabIcons/" + icon;
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        const tabView = <TabView>args.object;
        const selectedTabViewItem = tabView.items[args.newIndex];

        this.title = selectedTabViewItem.title;
    }
}
