import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Note, NoteStatus } from "~/models/note";

@Component({
    selector: "notes-modal",
    templateUrl: "tabs/notes/notes.modal.html"
})
export class NotesModalComponent {

    newNote: Note;
    selectedIndex = 1;
    items: Array<string>;
    error: string;
    appSettings = require("application-settings");

    constructor(private params: ModalDialogParams) {

        this.items = ["Note", "TODO"];
        this.error = "";

        this.newNote = new Note();
        this.newNote.wrapText = false;
        this.newNote.assignedFrom = this.appSettings.getString("user");
        this.newNote.status = NoteStatus.ToDo;
    }

    onchange(args) {
        this.newNote.status = this.items[args.newIndex] === "TODO" ? NoteStatus.ToDo : NoteStatus.Note;
    }

    onTap(res) {

        if (typeof this.newNote.id === "undefined") {
            this.error = "Please provide an ID.";
        } else if (typeof this.newNote.assignedTo === "undefined") {
            this.error = "Please assign this to an E-Mail address.";
        } else if (typeof this.newNote.text === "undefined") {
            this.error = "Please provide a description.";
        } else {
            this.params.closeCallback(this.newNote);
        }
    }

}
