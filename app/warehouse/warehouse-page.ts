import { View } from "ui/core/view";
import { ItemEventData } from "ui/list-view";
import { NavigatedData, Page } from "ui/page";

import { HomeViewModel } from "./warehouse-view-model";
import { Item } from "./shared/part";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HomeViewModel();
}

export function onItemTap(args: ItemEventData) {
    const view = <View>args.view;
    const page = <Page>view.page;
    const tappedItem = <Item>view.bindingContext;

    page.frame.navigate({
        moduleName: "warehouse/warehouse-detail/warehouse-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}