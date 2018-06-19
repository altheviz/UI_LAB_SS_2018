import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef } from "@angular/core";
import { Label } from "ui/label";
import { DummyService } from "~/models/dummy.service";
import { Note, NoteStatus } from "~/models/note";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { NotesModalComponent } from "./notes.modal";

@Component({
    selector: "Notes",
    providers: [DummyService],
    moduleId: module.id,
    templateUrl: "./notes.component.html",
    styleUrls: ["./notes.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotesComponent implements OnInit {

    notes: Array<Note>;
    visibleNotes: Array<Note>;
    counter: number;
    appSettings = require("application-settings");
    directory;
    label: Label;

    constructor(private dummyService: DummyService,
                private modal: ModalDialogService,
                private vcRef: ViewContainerRef) {

        this.notes = dummyService.getNotes();
        this.visibleNotes = [];
        this.directory = {};

        for (let i = 0; i < this.notes.length; i++) {
            this.directory[this.notes[i].id] = i;
            this.notes[i].wrapText = false;
            if (this.notes[i].status !== NoteStatus.Done
                && this.notes[i].assignedTo === this.appSettings.getString("user")) {
                this.visibleNotes.push(this.notes[i]);
            }
        }
    }

    ngOnInit() {
        // Don't do anything
    }

    showModal() {
        const options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(NotesModalComponent, options).then((newNote) => {
            if (newNote instanceof Note) {
                console.log(newNote);
                this.notes.push(newNote);
                if (newNote.status !== NoteStatus.Done && newNote.assignedTo === this.appSettings.getString("user")) {
                    this.directory[newNote.id] = this.notes.length;
                    this.notes.push(newNote);
                    this.visibleNotes.push(newNote);
                }
            }
        });
    }

    onTap(args) {

        this.label = <Label>args.object;
        this.notes[this.directory[this.label.id]].status = NoteStatus.Done;
    }

    onItemTap(args) {
        console.log(Object.keys(args));
        console.log(args.object.nodeName[0]);
        this.visibleNotes[args.index].wrapText = !this.visibleNotes[args.index].wrapText;
    }
}
