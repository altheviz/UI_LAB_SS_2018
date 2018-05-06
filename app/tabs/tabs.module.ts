import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TabsComponent } from "./tabs.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { CustomersComponent } from "./customers/customers.component";
import { MapComponent } from "./map/map.component";
import { NotesComponent } from "./notes/notes.component";
import { WarehouseComponent } from "./warehouse/warehouse.component";
import { ListComponent } from "../utils/list/list.component";

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
        ListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
