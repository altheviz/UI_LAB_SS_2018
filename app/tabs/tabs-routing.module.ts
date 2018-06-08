import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ServiceProductComponent } from "./../service-product/service-product.component";
import { AppointmentDetailComponent } from "./appointments/appointment-detail/appointment-detail.component";
import { CompletionComponent } from "./appointments/completion/completion.component";
import { ServiceRequestComponent } from "./appointments/servicerequest/servicerequest.component";
import { CustomerComponent } from "./customers/customer-detail/customer-detail.component";
import { NoteDetailComponent } from "./notes/note-detail/note-detail.component";
import { TabsComponent } from "./tabs.component";

const routes: Routes = [
    // { path: "", redirectTo: '/tabs/appointments', pathMatch: 'full'},
    { path: "", component: TabsComponent },
    { path: "/:tab", component: TabsComponent },
    { path: "appointment/:id", component: AppointmentDetailComponent },
    { path: "appointments-completion/:id", component: CompletionComponent },
    { path: "appointments-service-request", component: ServiceRequestComponent },
    { path: "customer/:id", component: CustomerComponent },
    { path: "note/:id", component: NoteDetailComponent }
    // { path: "service-product", component: ServiceProductComponent }
    // { path: "map/:type", component: TabsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TabsRoutingModule { }
