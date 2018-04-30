import { NavigatedData, Page } from "ui/page";
import { BrowseViewModel } from "./customer-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new BrowseViewModel();
}
