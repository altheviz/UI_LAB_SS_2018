import { Component, OnInit } from "@angular/core";
import { DummyService } from "~/models/dummy.service";
import { SparePart } from "~/models/spare-part";

@Component({
    selector: "Completion",
    providers: [DummyService],
    moduleId: module.id,
    templateUrl: "./completion.component.html"
})
export class CompletionComponent implements OnInit {
    private usedParts: Array<SparePart>;
    private allParts: Array<SparePart>;

    constructor(private dummyService: DummyService) {
        this.allParts = dummyService.getSpareParts();
        this.usedParts = dummyService.getSpareParts();
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    addPart() {
        console.log("Adding new warehouse part");
    }
}
