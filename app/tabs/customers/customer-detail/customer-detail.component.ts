import { Component, OnInit } from "@angular/core";
import * as dialogs from "ui/dialogs";
import { DummyService } from "~/models/dummy.service";
import { ServiceCompletionPartManager } from "~/models/serviceCompletionPartsManager";
import { SparePart } from "~/models/spare-part";

@Component({
    selector: "CustomerDetail",
    providers: [DummyService],
    moduleId: module.id,
    templateUrl: "./customer-detail.component.html"
})
export class CustomerComponent implements OnInit {
    private manager: ServiceCompletionPartManager;

    constructor(private dummyService: DummyService) {
        this.manager = new ServiceCompletionPartManager(dummyService.getSpareParts());
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    addPart() {
        const unusedPartDescriptions: Array<string> = this.manager.getUnusedPartDescriptions();
        dialogs.action({
            message: "Choose a part to use",
            cancelButtonText: "Cancel",
            actions: unusedPartDescriptions
        }).then((result) => {
            // result is only the description String but not the dialog index
            // Therefore each description must be unique...
            if (result !== "Cancel") {
                const dialogIndex = unusedPartDescriptions.indexOf(result);
                console.log("Dialog result: " + result + " at index: " + dialogIndex);
                this.manager.addUsedPart(dialogIndex);
            }
        });
    }

    removePart(index: number) {
        this.manager.removeUsedPart(index);
    }

    usedPartClicked(index: number) {
        console.log("Used part clicked at: " + index);
        const unusedPartDescriptions: Array<string> = this.manager.getUnusedPartDescriptions();
        dialogs.action({
            message: "Choose a part",
            cancelButtonText: "Cancel",
            actions: unusedPartDescriptions
        }).then((result) => {
            // result is only the description String but not the dialog index
            // Therefore each description must be unique...
            if (result !== "Cancel") {
                const dialogIndex = unusedPartDescriptions.indexOf(result);
                console.log("Dialog result: " + result + " at index: " + dialogIndex);
                this.manager.replaceUsedPart(index, dialogIndex);
            }
        });
    }

    changeUsedPartAmount(index: number) {
        console.log("Selecting new amount at index: " + index);
        dialogs.action({
            message: "Amount of " + this.manager.usedParts[index].description,
            cancelButtonText: "Cancel",
            actions: this.manager.getAmountSequence(index)
        }).then((result) => {
            if (result !== "Cancel") {
                // result is only the description String but not the dialog index
                console.log("Dialog result: " + result);
                // tslint:disable-next-line:radix
                this.manager.setUsedPartAmount(index, parseInt(result));
            }
        });
    }

    signAppointment() {
        console.log("TODO: Signing appointment");
    }
}
