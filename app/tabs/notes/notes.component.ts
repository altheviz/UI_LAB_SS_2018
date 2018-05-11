import { Component, OnInit } from "@angular/core";
import { DummyService } from "~/models/dummy.service";
import { Note } from "~/models/note";

@Component({
    selector: "Notes",
    providers: [DummyService],
    moduleId: module.id,
    templateUrl: "./notes.component.html"
})
export class NotesComponent implements OnInit {

    notes: Array<Note>;

    constructor(private dummyService: DummyService) {
        this.notes = dummyService.getNotes();
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
