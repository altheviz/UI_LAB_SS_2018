import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DropDownModule } from "nativescript-drop-down/angular";
import { ContentService } from "~/models/content.service";
import { ServiceCompletionPartManager } from "~/models/serviceCompletionPartsManager";
import { AppointmentDetailComponent } from "~/tabs/appointments/appointment-detail/appointment-detail.component";
import { AppointmentsComponent } from "~/tabs/appointments/appointments.component";
import { CompletionComponent } from "~/tabs/appointments/completion/completion.component";
import { ServiceRequestComponent } from "~/tabs/appointments/servicerequest/servicerequest.component";
import { CustomerComponent } from "~/tabs/customers/customer-detail/customer-detail.component";
import { CustomersComponent } from "~/tabs/customers/customers.component";
import { MapComponent } from "~/tabs/map/map.component";
import { NoteDetailComponent } from "~/tabs/notes/note-detail/note-detail.component";
import { NotesComponent } from "~/tabs/notes/notes.component";
import { TabsRoutingModule } from "~/tabs/tabs-routing.module";
import { TabsComponent } from "~/tabs/tabs.component";
import { WarehouseComponent } from "~/tabs/warehouse/warehouse.component";
import { ListComponent } from "~/utils/list/list.component";
import { NotesModalComponent } from "./notes/notes.modal";
// import { ServiceProductComponent } from "~/service-product/service-product.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TabsRoutingModule,
        NativeScriptFormsModule,
        DropDownModule
    ],
    entryComponents: [
        NotesModalComponent
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
        NoteDetailComponent,
        NotesModalComponent
        // ServiceProductComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        ModalDialogService,
        ContentService,
        ServiceCompletionPartManager
    ]
})
export class TabsModule { }
