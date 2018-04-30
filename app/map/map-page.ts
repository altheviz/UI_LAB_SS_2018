import { NavigatedData, Page } from "ui/page";
import { BrowseViewModel } from "./map-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new BrowseViewModel();
}
