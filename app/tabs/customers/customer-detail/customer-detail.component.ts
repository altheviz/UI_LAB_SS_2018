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
        if (this.allParts.length > 0) {
            console.log("Adding new warehouse part");
            const temp: SparePart = this.allParts.splice(0, 1)[0];
            this.usedParts.push(temp);
        } else {
            console.log("Warehouse is empty. No more items to add!");
        }
    }

    removePart(index: number) {
        console.log("Removing part at index: " + index);
        // delete doesn't remove the item or reduces the array length. Splice does that
        const temp: SparePart = this.usedParts.splice(index, 1)[0];
        temp.usedAmount = 0;
        this.allParts.push(temp);
    }

    usedPartClicked(index: number) {
        console.log("Used part clicked at: " + index);
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
            // Therefore each description must be unique...
            if (result !== "Cancel") {
                const dialogIndex = usedPartDescriptions.indexOf(result);
                console.log("Dialog result: " + result + " at index: " + dialogIndex);
                const temp: SparePart = this.usedParts[index];
                this.usedParts[index] = this.allParts[dialogIndex];
                temp.usedAmount = 0;
                this.allParts[dialogIndex] = temp;
            }
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
            if (result !== "Cancel") {
                // result is only the description String but not the dialog index
                console.log("Dialog result: " + result);
                // tslint:disable-next-line:radix
                this.usedParts[index].usedAmount = parseInt(result);
            }
        });
    }

    signAppointment() {
        console.log("TODO: Signing appointment");
    }
}
