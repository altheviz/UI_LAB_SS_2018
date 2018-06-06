import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AppointmentsComponent } from "~/tabs/appointments/appointments.component";
import { CustomersComponent } from "~/tabs/customers/customers.component";
import { MapComponent } from "~/tabs/map/map.component";
import { NotesComponent } from "~/tabs/notes/notes.component";
import { TabsRoutingModule } from "~/tabs/tabs-routing.module";
import { TabsComponent } from "~/tabs/tabs.component";
import { WarehouseComponent } from "~/tabs/warehouse/warehouse.component";
import { ListComponent } from "~/utils/list/list.component";

import { AppointmentDetailComponent } from "~/tabs/appointments/appointment-detail/appointment-detail.component";
import { CompletionComponent } from "~/tabs/appointments/completion/completion.component";
import { ServiceRequestComponent } from "~/tabs/appointments/servicerequest/servicerequest.component";
import { CustomerComponent } from "~/tabs/customers/customer-detail/customer-detail.component";
import { NoteDetailComponent } from "~/tabs/notes/note-detail/note-detail.component";
// import { ServiceProductComponent } from "~/service-product/service-product.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TabsRoutingModule
    ],
    declarations: [
        TabsComponent,
        AppointmentsComponent,
        CustomersComponent,
        NotesComponent,
        MapComponent,
        WarehouseComponent,
        ListComponent,
        AppointmentDetailComponent,
        CompletionComponent,
        ServiceRequestComponent,
        CustomerComponent,
        NoteDetailComponent
        // ServiceProductComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
