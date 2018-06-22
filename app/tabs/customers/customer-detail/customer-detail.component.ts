import { Component, OnInit } from "@angular/core";
import { DatePicker } from "tns-core-modules/ui/date-picker/date-picker";
import { TimePicker } from "tns-core-modules/ui/time-picker/time-picker";
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
    private hour: number = 0;
    private startHour: number = -1;
    private endHour: number = -1;
    private date: Date;

    constructor(private dummyService: DummyService) {
        // TODO: Get list of all warehouse parts
        this.manager = new ServiceCompletionPartManager(
            dummyService.getSpareParts()
        );
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    onDatePickerLoaded(args): void {
        const datePicker = <DatePicker>args.object;
        const today = new Date();
        datePicker.year = today.getFullYear();
        datePicker.month = today.getMonth() + 1;
        datePicker.day = today.getDate();
    }

    onTimePickerLoaded(args): void {
        const timePicker = <TimePicker>args.object;
        const today = new Date();
        timePicker.hour = today.getHours();
        timePicker.minute = 0;
    }

    onStartTimeChanged(args) {
        const timePicker = <TimePicker>args.object;
        this.startHour = timePicker.hour;
        if (this.endHour !== -1) {
            this.hour = this.endHour - this.startHour;
        }
    }

    onEndTimeChanged(args) {
        const timePicker = <TimePicker>args.object;
        this.endHour = timePicker.hour;
        if (this.startHour !== -1) {
            this.hour = this.endHour - this.startHour;
        }
    }
    onDateChanged(args) {
        console.log("Date changed");
        this.date = args.value;
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
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
        dialogs
            .action({
                message:
                    "Amount of " + this.manager.usedParts[index].description,
                cancelButtonText: "Cancel",
                actions: this.manager.getAmountSequence(index)
            })
            .then((result) => {
                if (result !== "Cancel") {
                    // result is only the description String but not the dialog index
                    console.log("Dialog result: " + result);
                    // tslint:disable-next-line:radix
                    this.manager.setUsedPartAmount(index, parseInt(result));
                }
            });
    }

    signAppointment() {
        // TODO: save all items in the list manager.usedParts
        console.log("TODO: Signing appointment");
    }
}
