import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DatePicker } from "tns-core-modules/ui/date-picker/date-picker";
import { TimePicker } from "tns-core-modules/ui/time-picker/time-picker";
import { action, confirm } from "ui/dialogs";
import { ContentService } from "~/models/content.service";
import { ServiceCompletionPartManager } from "~/models/serviceCompletionPartsManager";

@Component({
    selector: "Completion",
    providers: [ContentService, ServiceCompletionPartManager],
    moduleId: module.id,
    templateUrl: "./completion.component.html",
    styleUrls: ["./completion.component.scss"]
})
export class CompletionComponent {

    private hour: number = 0;
    private startHour: number = -1;
    private endHour: number = -1;
    private date: Date;
    private id: string;

    constructor(
        private route: ActivatedRoute,
        private contentService: ContentService,
        private manager: ServiceCompletionPartManager) {

        this.route.params.subscribe((params) => {
            this.id = params.id;
            this.manager.init(params.id);
        });
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
        action({
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
        action({
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
        action({
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

        confirm({
            title: "Sign Service Order",
            message: "Hereby you confirm that the service has been successfully completed. "
                + "Please approve the used time and parts. This step cannot be undone.",
            okButtonText: "Confirm",
            cancelButtonText: "Cancel"
        }).then((result) => {
            // this.serviceOrder.completed = result;
            // TODO: Firebase Call!!! (as soon as completed field is added to firebase)
        });
    }
}
