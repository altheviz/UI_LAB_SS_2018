import { Component, OnInit } from "@angular/core";
import * as dialogs from "ui/dialogs";
import { DummyService } from "~/models/dummy.service";
import { SparePart } from "~/models/spare-part";

@Component({
    selector: "CustomerDetail",
    providers: [DummyService],
    moduleId: module.id,
    templateUrl: "./customer-detail.component.html"
})
export class CustomerComponent implements OnInit {
    private usedParts: Array<SparePart>;
    private allParts: Array<SparePart>;

    constructor(private dummyService: DummyService) {
        this.allParts = dummyService.getSpareParts();
        this.usedParts = new Array();
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    addPart() {
        console.log("Adding new warehouse part");
        this.usedParts.push(this.allParts[0].clone());
    }

    removePart(index: number) {
        console.log("Removing part at index: " + index);
        // delete doesn't remove the item or reduces the array length. Splice does that
        this.usedParts.splice(index, 1);
    }

    usedPartClicked(index: number) {
        console.log("Clicked: " + index);
        const usedPartDescriptions: Array<string> = new Array();
        this.allParts.forEach((part) => {
            usedPartDescriptions.push(part.description);
        });
        dialogs.action({
            message: "Choose a part",
            cancelButtonText: "Cancel",
            actions: usedPartDescriptions
        }).then((result) => {
            // result is only the description String but not the dialog index
            const dialogIndex = usedPartDescriptions.indexOf(result);
            console.log("Dialog result: " + result + " at index: " + dialogIndex);
            // Create a copy
            this.usedParts[index] = this.allParts[dialogIndex].clone();
        });
    }

    changeUsedPartAmount(index: number) {
        console.log("Selecting new amount at index: " + index);
        const amountSequence: Array<string> = new Array();
        // Creating sequence of incremented numbers.
        Array.from(Array(this.usedParts[index].amount).keys()).map((amount) => {
            amountSequence.push((amount + 1) + "");
        });
        dialogs.action({
            message: "Amount of " + this.usedParts[index].description,
            cancelButtonText: "Cancel",
            actions: amountSequence
        }).then((result) => {
            // result is only the description String but not the dialog index
            console.log("Dialog result: " + result);
            // tslint:disable-next-line:radix
            this.usedParts[index].amount = parseInt(result);
        });
    }

    signAppointment() {
        console.log("TODO: Signing appointment");
    }
}
