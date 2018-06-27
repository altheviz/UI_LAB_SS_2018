import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DummyService } from "~/models/dummy.service";
import { Note } from "~/models/note";

@Component({
    selector: "notes-modal",
    templateUrl: "tabs/notes/notes.modal.html",
    providers: [DummyService]
})
export class NotesModalComponent {

    newNote: Note;
    selectedIndex = 1;
    items: Array<string>;
    error: string;
    technicianMail: string;
    myDummyService: DummyService;
    appSettings = require("application-settings");

    constructor(private dummyService: DummyService, private params: ModalDialogParams) {

        this.items = ["NOTE", "TASK"];
        this.error = "";
        this.technicianMail = "";
        this.myDummyService = dummyService;

        this.newNote = new Note(Math.floor(Math.random() * 100000), 0, "TASK", "", "", new Date() + "", "OPEN");
        this.newNote.wrapText = false;
    }

    onTap(res) {

        if (this.newNote.title === "") {
            this.error = "Please provide a title.";
        } else if (this.technicianMail === "") {
            this.error = "Please assign this to a technician.";
        } else if (this.newNote.description === "") {
            this.error = "Please provide a description.";
        } else {
            this.newNote.technician = this.myDummyService.getCurrentUser(this.technicianMail);
            this.newNote.type = this.items[this.selectedIndex];
            this.params.closeCallback(this.newNote);
        }
    }

}
